import asyncHandler from 'express-async-handler'
import bcrypt from "bcrypt";
import { User } from '../models/user.model.js';
import jwt from 'jsonwebtoken';

import multer from 'multer';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();


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
                fileUrimessage: "Something is missing",
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

// const updateUserProfile = asyncHandler(async (req, res) => {
//     const { fullname, email, phoneNumber, bio, skills } = req.body;
//     if (!fullname || !email || !phoneNumber || !bio || !skills) {
//         return res.status(400).json({
//             message: "All compulsory field are required",
//             success: false
//         });
//     }
//     let skillsArray;
//     if (skills) {
//         skillsArray = skills.split(",");
//     }
//     const data = await User.findOneAndUpdate(
//         req.user._id,
//         {
//             $set: {
//                 fullname,
//                 email,
//                 phoneNumber,
//                 bio,
//                 skillsArray
//             }
//         },
//         {
//             new:true
//         }
//     )
//     if(!data){
//         return res.status(200).json({
//             message:"Error while updating",
//             success:true
//         })    
//     }
//     return res.status(200).json({
//         message:"Profile updated successfully.",
//         data,
//         success:true
//     });
// })


const upload = multer({ dest: 'uploads/' });
// Cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});


// Profile update handler
const updateUserProfile = asyncHandler(async (req, res) => {
    const { fullname, email, phoneNumber, bio, skills } = req.body;

    console.log(fullname)
    // Check for required fields
    if (!fullname || !email || !phoneNumber || !bio || !skills) {
        return res.status(400).json({
            message: "All compulsory fields are required",
            success: false
        });
    }

    // Convert skills to an array
    let skillsArray = skills.split(",");
    let profilePictureUrl = "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"; // Default image URL
    let resumeUrl = "";

    // Handle profile photo upload if provided
    if (req.files?.profilePhoto) {
        const profileFile = req.files.profilePhoto[0];
        const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!allowedMimeTypes.includes(profileFile.mimetype)) {
            return res.status(400).json({
                message: "Invalid file type for profile picture. Only JPEG and PNG are allowed.",
                success: false
            });
        }

        // Upload to Cloudinary
        try {
            const cloudResponse = await cloudinary.uploader.upload(profileFile.path, {
                resource_type: 'image',
            });
            profilePictureUrl = cloudResponse.secure_url;
        } catch (error) {
            return res.status(500).json({ message: 'Error uploading profile image to Cloudinary', success: false });
        }
    }

    // Handle resume upload if provided
    if (req.files?.resume) {
        const resumeFile = req.files.resume[0];
        if (resumeFile.mimetype !== "application/pdf") {
            return res.status(400).json({
                message: "Invalid file type for resume. Only PDF is allowed.",
                success: false
            });
        }

        // Upload to Cloudinary
        try {
            const resumeCloudResponse = await cloudinary.uploader.upload(resumeFile.path, {
                resource_type: 'auto',
            });
            resumeUrl = resumeCloudResponse.secure_url;
        } catch (error) {
            return res.status(500).json({ message: 'Error uploading resume to Cloudinary', success: false });
        }
    }

    // Update the user profile in the database
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            {
                $set: {
                    fullname,
                    email,
                    phoneNumber,
                    profile: {
                        bio,
                        skills: skillsArray,
                        profilePhoto: profilePictureUrl,
                        resume: resumeUrl,
                    },
                },
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(500).json({
                message: "Error while updating user profile.",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Profile updated successfully.",
            data: updatedUser,
            success: true,
        });
    } catch (error) {
        return res.status(500).json({ message: "Error updating profile", success: false });
    }
});

export {
    registerUser,
    loginUser,
    logoutUser,
    getProfile,
    updateUserProfile,
}

