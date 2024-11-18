import React, { useState } from 'react';
import Navbar from '../components/Navbar';

function Landing() {
    const [isLoggedin,setIsLoggedin]=useState(false);

    return (
        <div className='font-monosans zoomIn animated'>
            <Navbar />
            <div className='flex flex-col justify-center items-center mt-60'>
                <p className=' font-monosans font-extrabold text-8xl'><span className='text-red-500'>job</span>folio <span className='text-red-500'>:</span>
                    <span className=' border-dashed font-bold border-4 border-red-500 p-4 m-2 rounded-3xl'>Find what's next</span></p>
            </div>
            <div className='flex flex-col justify-center items-center mt-32'>
                <p className=' font-bold text-4xl'>Where startups and job seekers connect</p>
            </div>
            <div className=' flex justify-around m-10'>
                <button className=' text-2xl px-6 py-2 font-bold rounded-xl m-6 border-2 border-red-500 border-dashed shadow-[0_35px_60px_-15px_rgba(0,0,0,0.4)] '>find your next hire</button>
                <button className=' text-2xl px-6 py-2 font-bold rounded-xl m-6 border-2 border-red-500 border-dashed shadow-[0_35px_60px_-15px_rgba(0,0,0,0.4)]'>find your next job</button>
                <button className=' text-2xl px-6 py-2 font-bold rounded-xl m-6 border-2 border-red-500 border-dashed shadow-[0_35px_60px_-15px_rgba(0,0,0,0.4)]'>remote job</button>
                <button className=' text-2xl px-6 py-2 font-bold rounded-xl m-6 border-2 border-red-500 border-dashed shadow-[0_35px_60px_-15px_rgba(0,0,0,0.4)]'>internship</button>
                <button className=' text-2xl px-6 py-2 font-bold rounded-xl m-6 border-2 border-red-500 border-dashed shadow-[0_35px_60px_-15px_rgba(0,0,0,0.4)]'>virtual internship</button>
            </div>
        </div>
    );
}

export default Landing;
