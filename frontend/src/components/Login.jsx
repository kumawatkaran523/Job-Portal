import React, { useEffect, useState } from 'react'
import logo from '/logo.svg'
import { useForm } from "react-hook-form"
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import loginbg from '/loginbg.webp'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '/redux/authSlice';

function Login() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const [serverError, setServerError] = useState("");

    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const Submit = async (data) => {
        try {
            dispatch(setLoading(true));
            const res = await axios.post('http://localhost:8000/app/v1/user/login', data, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            if (res.data.success) {
                dispatch(setUser(res.data.data));
                navigate("/home");
            }
            reset();
            console.log(res);
        } catch (error) {
            console.log(error);
            setServerError(error.response?.data?.message || "Something went wrong. Please try again.");
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (user) {
            navigate('/home');
        }
    }, []);

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => event.preventDefault();

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-10 px-4 md:px-20'>
            <div className='flex flex-col items-center md:items-start'>
                <Link to='/' className='cursor-pointer'>
                    <img src={logo} alt="Logo" width={200} />
                </Link>
                <p className='text-4xl font-extrabold mt-5'>Login</p>
                <p className='text-[18px] mt-3 text-gray-500'>Find the job made for you!</p>

                <form onSubmit={handleSubmit(Submit)} className='flex flex-col bg-slate-950 bg-opacity-10 px-8 py-10 w-full max-w-md mt-8 rounded-lg'>
                    <FormControl>
                        <FormLabel id="role-label"><span className='text-black'>I am a...</span></FormLabel>
                        <RadioGroup aria-labelledby="role-label" {...register("role", { required: "Choose your role" })}>
                            <FormControlLabel value="candidate" control={<Radio />} label="Candidate" />
                            <FormControlLabel value="recruiter" control={<Radio />} label="Recruiter" />
                        </RadioGroup>
                    </FormControl>
                    {errors.role && <span className=' text-red-500 text-xs m-2'>{errors.role.message}</span>}

                    <FormControl sx={{ mt: 3, width: '100%', background: 'white' }} variant="outlined">
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <OutlinedInput
                            id="email"
                            type='text'
                            {...register("email", { required: "Email Address is required" })}
                            label="Email"
                        />
                    </FormControl>
                    {errors.email && <span className=' text-red-500 text-xs m-2'>{errors.email.message}</span>}

                    <FormControl sx={{ mt: 3, width: '100%', background: 'white' }} variant="outlined">
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <OutlinedInput
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            {...register("password", { required: "Password is required", minLength: { value: 8, message: "Password must be at least 8 characters" } })}
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
                    {errors.password && <span className=' text-red-500 text-xs m-2'>{errors.password.message}</span>}

                    {serverError && <span className='text-red-500 text-xs m-2'>{serverError}</span>}

                    <input type="submit" className='bg-black text-white mt-4 py-3 w-full cursor-pointer' />

                    <p className='text-center mt-1'>
                        Not registered yet?
                        <Link to='/signup' className='text-blue-600 underline px-1'>
                            Create an account
                        </Link>
                    </p>
                </form>
            </div>

            <div className='flex flex-col w-screen'>
                {/* <img src={loginbg} alt="" width={900} /> */}
                <img src={loginbg} alt="Background" className='w-full sm:w-3/4 lg:w-1/2' />
                <p className=' text-4xl mx-40'> <span className='font-bold'>Find the job <br />made for <br />you.<br /></span>
                    <span className='text-lg'>Browse over 130K jobs at top companies and fast-growing startups.</span></p>
            </div>

            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={loading}
                // onClick={()=>open=loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}

export default Login
