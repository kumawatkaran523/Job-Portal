import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='text-center mt-10'>
            <div className='flex flex-col gap-5 '>
                <div>
                    <p className='text-center text-5xl mt-10 font-extrabold'>Search, Apply & <br />Get your <span className='text-red-600'>Dream job.</span></p>
                    <p className="text-center text-lg mt-4 text-gray-600">
                        Explore thousands of opportunities tailored just for you. <br />
                        Your next career move is just a click away!
                    </p>
                </div>
                <div className="flex w-[60%] mt-5 shadow-lg border border-gray-200 rounded-full items-center gap-0 mx-auto overflow-hidden">
                    <input
                        type="text"
                        placeholder="Find your dream jobs"
                        onChange={(e) => setQuery(e.target.value)}
                        className="outline-none border-none w-full bg-white h-14 px-4"
                    />
                    <Button onClick={searchJobHandler} className="h-14 bg-red-600 w-32 text-white flex items-center justify-center">
                        <Search className="h-8 w-8" />
                    </Button>
                </div>


            </div>
        </div>
    )
}

export default HeroSection