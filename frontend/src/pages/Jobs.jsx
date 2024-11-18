import Navbar from '@/components/Navbar'
import React from 'react'
import AdsClickTwoToneIcon from '@mui/icons-material/AdsClickTwoTone';
import TextField from '@mui/material/TextField';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Jobcard from '@/components/Jobcard';


function Jobs() {
    return (
        <>
            <Navbar />
            <p className=' text-5xl mt-10 font-extrabold text-center '>You are just a click away.<AdsClickTwoToneIcon style={{ fontSize: '80px', color: '#dc2626' }} /></p>
            <div className='flex mt-10'>
                <TextField fullWidth placeholder='Search Job by title...' id="fullWidth" className='bg-white' />
                <Button type='submit' className='py-7 px-10 mx-3 text-xl'>Search</Button>
            </div>
            <div className='flex mt-4 w-full'>
                <Select>
                    <SelectTrigger className="w-full mr-3">
                        <SelectValue placeholder="Filter by location" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="delhi">Delhi</SelectItem>
                        <SelectItem value="mumbai">Mumbai</SelectItem>
                        <SelectItem value="bangalore">Bangalore</SelectItem>
                        <SelectItem value="hyderabad">Hyderabad</SelectItem>
                        <SelectItem value="chennai">Chennai</SelectItem>
                        <SelectItem value="kolkata">Kolkata</SelectItem>
                        <SelectItem value="pune">Pune</SelectItem>
                        <SelectItem value="jaipur">Jaipur</SelectItem>
                        <SelectItem value="ahmedabad">Ahmedabad</SelectItem>
                        <SelectItem value="kochi">Kochi</SelectItem>
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger className="w-full mr-3">
                        <SelectValue placeholder="Work Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="remote">Remote</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                        <SelectItem value="on-site">On-Site</SelectItem>
                        <SelectItem value="out-of-india">Out of India</SelectItem>
                        <SelectItem value="freelance">Freelance</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                        <SelectItem value="full-time">Full-Time</SelectItem>
                        <SelectItem value="part-time">Part-Time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="temporary">Temporary</SelectItem>
                    </SelectContent>
                </Select>

                <Select>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Company" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="google">Google</SelectItem>
                        <SelectItem value="microsoft">Microsoft</SelectItem>
                        <SelectItem value="amazon">Amazon</SelectItem>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="facebook">Facebook</SelectItem>
                        <SelectItem value="tesla">Tesla</SelectItem>
                        <SelectItem value="netflix">Netflix</SelectItem>
                        <SelectItem value="adobe">Adobe</SelectItem>
                        <SelectItem value="ibm">IBM</SelectItem>
                        <SelectItem value="salesforce">Salesforce</SelectItem>
                    </SelectContent>
                </Select>

                <Button type='submit' className='py-4 px-20 mx-3 text-sm bg-red-800'>Clear Filters</Button>
            </div>
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
        </>
    )
}

export default Jobs