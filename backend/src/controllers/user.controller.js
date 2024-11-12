import asyncHandler from 'express-async-handler'
import bcrypt from "bcrypt";
import { User } from '../models/user.model.js';
import jwt from 'jsonwebtoken';

const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Secure only in production
    sameSite: 'Strict',
    maxAge: 1 * 24 * 60 * 60 * 1000,
};

const registerUser = asyncHandler(async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, confirm_password, role } = req.body;

        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        if (password != confirm_password) {
            return res.status(400).json({
                message: "Password is not matching",
                success: false
            });
        }
        // check for already exit account
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: 'User already exist with this email.',
                success: false,
                data: existingUser
            });
        }

        // encrypting the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // creating user in user schema

        const user = await User.create({
            fullname,
            email,
            phoneNumber,
            role,
            password: hashedPassword
        });

        if (!user) {
            console.log("Error while registering the user");
        }

        res.status(200).json({
            message: "Registered User Successfully",
            success: true,
            data: user
        });
    } catch (error) {
        console.log("Error while registering the user : internal error",error);
    }
});

const loginUser = asyncHandler(async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        // find user with above given id in the database
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(400).json({
                message: "Password do not match",
                success: false
            });
        }
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false
            })
        };

        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });

        return res
            .status(200)
            .cookie("Token", token, options)
            .json({
                message: `Welcome back ${user.fullname}`,
                data: user,
                success: true
            });
    } catch (error) {
        console.log("Error while logging in the user");
    }
})

const logoutUser = asyncHandler(async (req, res) => {
    try {
        return res
            .status(200)
            .cookie("Token", "", {
                httpOnly: true,
                secure: true,
                sameSite: 'Strict',
                maxAge: 0,
            })
            .json({
                message: `Logged out user successfully`,
                success: false
            });
    } catch (error) {
        console.log("Error while logging out the user");
    }
})

const getProfile=asyncHandler(async (req,res)=>{
    const user=await User.findOne(req.user._id);
    if(!user){
        return res.status(400).json({
            message: "User not found",
            success: false
        });
    }
    return res.status(200).json({
        message: "Profile fetched",
        success: true,
        data:user
    });
});

const updateUserProfile = asyncHandler(async (req, res) => {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    if (!fullname || !email || !phoneNumber || !bio || !skills) {
        return res.status(400).json({
            message: "All compulsory field are required",
            success: false
        });
    }
    let skillsArray;
    if (skills) {
        skillsArray = skills.split(",");
    }
    const data = await User.findOneAndUpdate(
        req.user._id,
        {
            $set: {
                fullname,
                email,
                phoneNumber,
                bio,
                skillsArray
            }
        },
        {
            new:true
        }
    )
    if(!data){
        return res.status(200).json({
            message:"Error while updating",
            success:true
        })    
    }
    return res.status(200).json({
        message:"Profile updated successfully.",
        data,
        success:true
    });
})

export {
    registerUser,
    loginUser,
    logoutUser,
    getProfile,
    updateUserProfile,
}

