import Navbar from '@/components/Navbar'
import React from 'react'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
function Appliedjobs() {
    return (
        <>
            <Navbar />
            <p className=' text-5xl font-bold text-center my-14'>My Application</p>
            <div className=' mx-20 shadow-md bg-white px-4 rounded-lg'>
                <div className='flex justify-between items-center'>
                    <p className='text-xl font-bold'>UI/UX Designer at Netflix</p>
                    <OpenInNewIcon />
                </div>
                <hr className='my-4' />
                <div className=' py-2 flex justify-between'>
                    <div className=' flex items-center'>
                        <AccessTimeIcon />
                        <p className='ml-1'>Applied on - 12 Dec' 2024</p>
                    </div>
                    <div>
                        <p>Status - Applied</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Appliedjobs