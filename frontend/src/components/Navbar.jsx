// import React from 'react';
// import logo from '/logo.svg'
// import {Link} from 'react-router-dom'
// function Navbar() {
//     return (
//         <>
//             <div className=' flex items-center justify-between mt-9'>
//                 <Link to='/' className='cursor-pointer'>
//                     <img src={logo} alt="Logo" width={200} />
//                 </Link>
//                 <div className=' flex items-center justify-between'>
//                     <Link to='/login' className='mx-5 font-semibold px-5 p-2 border-[1px] border-gray-400 rounded-xl cursor-pointer z-10'>
//                         Log In
//                     </Link>
//                     <Link to='signup' className='mx-5 font-semibold bg-black text-white px-5 p-2 rounded-xl cursor-pointer z-10'>Sign Up</Link>
//                 </div>
//             </div>
//         </>

//     );
// }

// export default Navbar;


import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '/logo.svg';
import { Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import { Logout } from '@mui/icons-material';
import WorkIcon from '@mui/icons-material/Work';
import { useSelector } from 'react-redux'

function Navbar() {
    const navigate=useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const {user } = useSelector(store => store.auth);

    useEffect(() => {
        const isLoggedInToken = localStorage.getItem('LoggedIn'); // Replace with your token key
        if (isLoggedInToken) {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <div className="flex items-center justify-between mt-9 ">
            {/* // <div className="flex items-center justify-between mt-9 bg-white fixed top-0 bg-transparent z-50"> */}
            <Link to="/" className="cursor-pointer">
                <img src={logo} alt="Logo" width={200} />
            </Link>
            <div className="flex items-center justify-between">
                {user ? (
                    <>
                        <Link to='/home' className="mx-1 font-semibold text-black px-1 p-2 rounded-2xl cursor-pointer z-10 hover:underline">Home</Link>
                        <Link to='/jobs' className="mx-1 mr-3 font-semibold text-black px-1 p-2 rounded-2xl cursor-pointer z-10 hover:underline">Jobs</Link>
                        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                            <Tooltip title="Account settings">
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    sx={{ ml: 2 }}
                                    aria-controls={open ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                >
                                    <Avatar src="/broken-image.jpg" sx={{ width: 42, height: 42 }} />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            slotProps={{
                                paper: {
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        '&::before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <div className="flex items-center mx-4 w-auto">
                                <Avatar sx={{ width: 42, height: 42 }} />
                                <div className=' mx-2'>
                                <p>{user.fullname}</p>
                                <p>{user.email}</p>
                                </div>
                            </div>
                            <div className=' ml-7 mt-3'>
                            <MenuItem onClick={()=>navigate('/profile')}>
                                <Avatar /> View Profile
                            </MenuItem>
                            <MenuItem onClick={()=>navigate('/appliedjobs')}>
                                <WorkIcon className=' mr-2' /> Applied Jobs
                            </MenuItem>
                            </div>
                            <Divider />
                            <MenuItem onClick={handleClose}>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>

                    </>
                ) : (
                    <>
                        <Link
                            to="/login"
                            className="mx-5 font-semibold px-5 p-2 border-[1px] border-gray-400 rounded-xl cursor-pointer z-10"
                        >
                            Log In
                        </Link>
                        <Link
                            to="/signup"
                            className="mx-5 font-semibold bg-black text-white px-5 p-2 rounded-xl cursor-pointer z-10"
                        >
                            Sign Up
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}

export default Navbar;
