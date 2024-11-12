import React from 'react';
import logo from '/logo.svg'

function Navbar() {
    return (
        <>
            <div className=' flex items-center justify-between mt-9'>
                <img src={logo} alt="logo" width={200}  className='cursor-pointer'/>
                <div className=' flex items-center justify-between'>
                    <div className='mx-5 font-semibold px-5 p-2 border-[1px] border-gray-400 rounded-xl cursor-pointer z-10'>
                        Log In
                    </div>
                    <div className='mx-5 font-semibold bg-black text-white px-5 p-2 rounded-xl cursor-pointer z-10'>Sign Up</div>
                </div>
            </div>
        </>

    );
}

export default Navbar;
