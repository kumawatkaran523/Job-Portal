// import React, { useState } from 'react'
// import logo from '/logo.svg'
// import { useForm } from "react-hook-form"
// import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material'
// import { Visibility, VisibilityOff } from '@mui/icons-material';
// import loginbg from '/loginbg.webp'
// import { Link } from 'react-router-dom'
// import axios from 'axios'

// function Signup() {
//     const { register, handleSubmit, formState: { errors } } = useForm()
//     const Submit = async(data)=>{
//         try {
//             const res = await axios.post('http://localhost:8000/api/v1/user',data,{
//                 headers:{
//                     'Content-Type':'application/json'
//                 },
//                 withCredentials:true
//             });
//             console.log(res);
//         } catch (error) {
//             console.log(error)
//         }
//     }


//     const [showPassword, setShowPassword] = useState(false);

//     const handleClickShowPassword = () => setShowPassword((show) => !show);
//     const handleMouseDownPassword = (event) => event.preventDefault();

//     return (
//         <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-10 px-4 md:px-20'>
//             <div className='flex flex-col items-center md:items-start'>
//                 <Link to='/'>
//                     <img src={logo} alt="Logo" width={200} />
//                 </Link>
//                 <p className='text-4xl font-extrabold mt-5'>Sign Up</p>
//                 <p className='text-[18px] mt-3 text-gray-500'>Find the job made for you!</p>

//                 <form onSubmit={handleSubmit(Submit)} className='flex flex-col bg-slate-950 bg-opacity-10 px-8 py-10 w-full max-w-md mt-8 rounded-lg'>
//                     <FormControl>
//                         <FormLabel id="role-label"><span className='text-black'>I am a...</span></FormLabel>
//                         <RadioGroup aria-labelledby="role-label" {...register("Role", { required: "Choose your role" })}>
//                             <FormControlLabel value="candidate" control={<Radio />} label="Candidate" />
//                             <FormControlLabel value="recruiter" control={<Radio />} label="Recruiter" />
//                         </RadioGroup>
//                     </FormControl>
//                     {errors.Role && <span className=' text-red-500 text-xs m-2'>{errors.Role.message}</span>}

//                     <FormControl sx={{ mt: 3, width: '100%', background: 'white' }} variant="outlined">
//                         <InputLabel htmlFor="fullname">Fullname</InputLabel>
//                         <OutlinedInput
//                             id="fullname"
//                             type='text'
//                             {...register("fullname", { required: "FullName is required" })}
//                             label="Fullname"
//                         />
//                     </FormControl>
//                     {errors.fullname && <span className=' text-red-500 text-xs m-2'>{errors.fullname.message}</span>}

//                     <FormControl sx={{ mt: 3, width: '100%', background: 'white' }} variant="outlined">
//                         <InputLabel htmlFor="email">Email</InputLabel>
//                         <OutlinedInput
//                             id="email"
//                             type='text'
//                             {...register("mail", { required: "Email Address is required" })}
//                             label="Email"
//                         />
//                     </FormControl>
//                     {errors.mail && <span className=' text-red-500 text-xs m-2'>{errors.mail.message}</span>}


//                     <FormControl sx={{ mt: 3, width: '100%', background: 'white' }} variant="outlined">
//                         <InputLabel htmlFor="phonenumber">Phone Number</InputLabel>
//                         <OutlinedInput
//                             id="phonenumber"
//                             type='text'
//                             {...register("phonenumber", { required: "Phone number Address is required" })}
//                             label="PhoneNumber"
//                         />
//                     </FormControl>
//                     {errors.mail && <span className=' text-red-500 text-xs m-2'>{errors.mail.message}</span>}

//                     <FormControl sx={{ mt: 3, width: '100%', background: 'white' }} variant="outlined">
//                         <InputLabel htmlFor="password">Password</InputLabel>
//                         <OutlinedInput
//                             id="password"
//                             type={showPassword ? 'text' : 'password'}
//                             {...register("password", { required: "Password is required", minLength: { value: 8, message: "Password must be at least 8 characters" } })}
//                             endAdornment={
//                                 <InputAdornment position="end">
//                                     <IconButton
//                                         aria-label="toggle password visibility"
//                                         onClick={handleClickShowPassword}
//                                         onMouseDown={handleMouseDownPassword}
//                                         edge="end"
//                                     >
//                                         {showPassword ? <Visibility /> : <VisibilityOff />}
//                                     </IconButton>
//                                 </InputAdornment>
//                             }
//                             label="Password"
//                         />
//                     </FormControl>
//                     {errors.password && <span className=' text-red-500 text-xs m-2'>{errors.password.message}</span>}

//                     <FormControl sx={{ mt: 3, width: '100%', background: 'white' }} variant="outlined">
//                         <InputLabel htmlFor="password">Confirm Password</InputLabel>
//                         <OutlinedInput
//                             id="password"
//                             type='password'
//                             {...register("confirm-password", { required: "Confirm Password is required" })}
//                             label="Password"
//                         />
//                     </FormControl>
//                     {/* {errors.password && <span className=' text-red-500 text-xs m-2'>{errors.password.message}</span>} */}
//                     <input type="submit" className='bg-black text-white mt-4 py-3 w-full cursor-pointer' />

//                     <p className='text-center mt-1'>
//                         Already have an account?
//                         <Link to='/login' className='text-blue-600 underline px-1'>
//                             Login
//                         </Link>
//                     </p>
//                 </form>
//             </div>

//             <div className='flex flex-col w-screen'>
//                 {/* <img src={loginbg} alt="" width={900} /> */}
//                 <img src={loginbg} alt="Background" className='w-full sm:w-3/4 lg:w-1/2' />
//                 <p className=' text-4xl mx-40'> <span className='font-bold'>Find the job <br />made for <br />you.<br /></span>
//                     <span className='text-lg'>Browse over 130K jobs at top companies and fast-growing startups.</span></p>
//             </div>
//         </div>
//     )
// }

// export default Signup



import React, { useState } from 'react';
import logo from '/logo.svg';
import loginbg from '/loginbg.webp';
import { useForm } from 'react-hook-form';
import {
    FormControl, FormLabel, RadioGroup,
    FormControlLabel, Radio, InputLabel,
    OutlinedInput, InputAdornment, IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Grow from '@mui/material/Grow';

function GrowTransition(props) {
    return <Grow {...props} />;
}

function Signup() {
    const { register, handleSubmit, formState: { errors }, watch, reset, clearErrors } = useForm();

    const [serverError, setServerError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showSignupAlert, setShowSignupAlert] = useState(false);
    const navigate = useNavigate();
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event) => event.preventDefault();

    const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    const Submit = async (data) => {
        try {
            console.log(data)
            const res = await axios.post('http://localhost:8000/app/v1/user/register', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            setShowSignupAlert(true);
            setTimeout(() => navigate('/login'), 2000);
            console.log(res);
        } catch (error) {
            console.error(error);
            navigate('/signup');
            setServerError(error.response?.data?.message || "Something went wrong. Please try again.");
        } finally {
            setTimeout(() => reset(), 2000);
            clearErrors();
        }
    };

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-10 px-4 md:px-20'>
            {/* Left Section */}
            <div className='flex flex-col items-center md:items-start'>
                <Link to='/'>
                    <img src={logo} alt="Logo" width={200} />
                </Link>
                <p className='text-4xl font-extrabold mt-5'>Sign Up</p>
                <p className='text-[18px] mt-3 text-gray-500'>Find the job made for you!</p>

                <form
                    onSubmit={handleSubmit(Submit)}
                    className='flex flex-col bg-slate-950 bg-opacity-10 px-8 py-10 w-full max-w-md mt-8 rounded-lg'
                >
                    {/* Role Selection */}
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">I am ....</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel value="candidate" {...register("role", { required: "Choose your role" })} control={<Radio />} label="Candicate" />
                            <FormControlLabel value="recruiter" {...register("role", { required: "Choose your role" })} control={<Radio />} label="Recruiter" />
                        </RadioGroup>
                    </FormControl>
                    {errors.role && <span className='text-red-500 text-xs m-2'>{errors.role.message}</span>}

                    {/* Fullname */}
                    <FormControl sx={{ mt: 3, width: '100%', background: 'white' }} variant="outlined">
                        <InputLabel htmlFor="fullname">Fullname</InputLabel>
                        <OutlinedInput
                            id="fullname"
                            type="text"
                            {...register("fullname", { required: "FullName is required" })}
                            label="Fullname"
                        />
                    </FormControl>
                    {errors.fullname && <span className='text-red-500 text-xs m-2'>{errors.fullname.message}</span>}

                    {/* Email */}
                    <FormControl sx={{ mt: 3, width: '100%', background: 'white' }} variant="outlined">
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <OutlinedInput
                            id="email"
                            type="text"
                            {...register("email", { required: "Email Address is required" })}
                            label="Email"
                        />
                    </FormControl>
                    {errors.email && <span className='text-red-500 text-xs m-2'>{errors.email.message}</span>}

                    {/* Phone Number */}
                    <FormControl sx={{ mt: 3, width: '100%', background: 'white' }} variant="outlined">
                        <InputLabel htmlFor="phoneNumber">Phone Number</InputLabel>
                        <OutlinedInput
                            id="phoneNumber"
                            type="text"
                            {...register("phoneNumber", { required: "Phone number is required" })}
                            label="Phone Number"
                        />
                    </FormControl>
                    {errors.phoneNumber && <span className='text-red-500 text-xs m-2'>{errors.phoneNumber.message}</span>}

                    {/* Password */}
                    <FormControl sx={{ mt: 3, width: '100%', background: 'white' }} variant="outlined">
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <OutlinedInput
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 8, message: "Password must be at least 8 characters" },
                            })}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                    {errors.password && <span className='text-red-500 text-xs m-2'>{errors.password.message}</span>}

                    {/* Confirm Password */}
                    <FormControl sx={{ mt: 3, width: '100%', background: 'white' }} variant="outlined">
                        <InputLabel htmlFor="confirm_password">Confirm Password</InputLabel>
                        <OutlinedInput
                            id="confirm_password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            {...register("confirm_password", {
                                required: "Confirm Password is required",
                                validate: (value) =>
                                    value === watch("password") || "Passwords do not match",
                            })}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle confirm password visibility"
                                        onClick={handleClickShowConfirmPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Confirm Password"
                        />
                    </FormControl>
                    {errors["confirm_password"] && <span className='text-red-500 text-xs m-2'>{errors["confirm_password"].message}</span>}

                    {/* Submit Button */}
                    <input
                        type="submit"
                        className='bg-black text-white mt-4 py-3 w-full cursor-pointer'
                        value="Sign Up"
                    />

                    {/* Server Error */}
                    {serverError && <span className='text-red-500 text-xs m-2'>{serverError}</span>}

                    <p className='text-center mt-1'>
                        Already have an account?
                        <Link to='/login' className='text-blue-600 underline px-1'>Login</Link>
                    </p>
                </form>

                {showSignupAlert && (
                    <Snackbar
                        open={true}
                        TransitionComponent={GrowTransition}
                        message="Registered Successfully"
                        autoHideDuration={2000}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        ContentProps={{
                            sx: {
                                backgroundColor: 'white',
                                color: 'green',
                                fontWeight: 'bold',
                            },
                        }}
                    />
                )}
            </div>

            {/* Right Section */}
            <div className='flex flex-col w-screen'>
                <img src={loginbg} alt="Background" className='w-full sm:w-3/4 lg:w-1/2' />
                <p className='text-4xl mx-40'>
                    <span className='font-bold'>Find the job <br />made for <br />you.<br /></span>
                    <span className='text-lg'>
                        Browse over 130K jobs at top companies and fast-growing startups.
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Signup;
