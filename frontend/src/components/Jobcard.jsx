import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from './ui/button'
import RoomIcon from '@mui/icons-material/Room';
import { BookmarkBorderOutlined } from '@mui/icons-material';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import { Link } from 'react-router-dom';

function Jobcard({jobId}) {
    return (
        <>
        <Card className="w-[460px] m-4">
      <CardHeader>
        <CardTitle>Backend Developer</CardTitle>
        <div className='flex justify-between items-center'>
        <CardDescription className=' mt-4'><img src='/companies/google.webp' width={80} height={80}/></CardDescription>
        <p className='mt-4'><RoomIcon/>Hydrabad</p>
        </div>
      </CardHeader>
      <hr className=' mx-5'/>
      <CardContent className='mt-2'>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas animi quibusdam veritatis culpa inventore explicabo?</p>
      </CardContent>
      <CardFooter className=" w-full flex">
        <Link to={`/job/:${jobId}`} className=' w-full'>
        <Button className=" w-full">More Details</Button>
        </Link>
        <BookmarkBorderOutlined  className='mx-3' style={{fontSize:'30px'}}/>
        <TurnedInIcon style={{fontSize:'30px',color:'red'}}/>
      </CardFooter>
    </Card>
        </>
    )
}

export default Jobcard