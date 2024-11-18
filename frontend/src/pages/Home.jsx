import React from 'react'
import Navbar from '../components/Navbar'
import { CarouselPlugin } from '@/components/Carousel_component'
import Jobcard from '@/components/Jobcard'


function Home() {
    return (
        <div className='h-screen fadeInDown animated'>
            <Navbar />
            <div>
                <p className='text-center text-4xl mt-10 font-extrabold'>Search, Apply & <br />Get your <span className='text-red-600'>Dream job.</span></p>
                <p className="text-center text-lg mt-4 text-gray-600">
                    Explore thousands of opportunities tailored just for you. <br />
                    Your next career move is just a click away!
                </p>
            </div>
            <CarouselPlugin />
            <p className='text-3xl font-extrabold text-center'>Latest and Top <span className='text-red-500'>Job Opening</span></p>
            <div className=' grid grid-cols-3 mt-10 w-full'>
                <Jobcard jobId="1" />
                <Jobcard jobId="2" />
                <Jobcard jobId="3" />
                <Jobcard jobId="4" />
                <Jobcard jobId="5" />
                <Jobcard jobId="6" />
                <Jobcard jobId="7" />
                <Jobcard jobId="8" />
            </div>

        </div>
    )
}

export default Home