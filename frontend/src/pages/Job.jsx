import Navbar from '@/components/Navbar'
import React from 'react'
import RoomIcon from '@mui/icons-material/Room';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import { Button } from '@/components/ui/button';

function Job() {
  return (
    <>
      <Navbar />
      <div className=' bg-white mx-40 shadow-md px-6 rounded-md mt-10'>
        <div className='flex justify-between items-center'>
          <p className='text-4xl font-bold text-center pt-10'>Software Engineer (Multiple Levels) Job </p>
          <img src="/companies/google.webp" alt="" width={100} height={100} />
        </div>
        <div className='mt-10 flex justify-between'>
          <p><RoomIcon />Hydrabad</p>
          <p><SupervisorAccountIcon /> 0 Applicant</p>
          <p className=' text-green-600'><MeetingRoomIcon /> Open</p>
          <p><HourglassBottomIcon />Apply By- 16 Dec' 24</p>
        </div>

        <hr className='my-5' />
        <div>
          <h3 className='text-2xl font-bold'>About the Job</h3>
          <p className=' my-2'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam accusantium architecto voluptates fugiat commodi quod tempore id laudantium quos voluptate doloribus delectus nemo omnis quaerat inventore ratione minima et nam repudiandae libero quam, minus error quas eveniet. Iure, labore animi?</p>
          <h3 className='text-2xl font-bold'>What we are looking for ?</h3>
          <p className=' my-2'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam accusantium architecto voluptates fugiat commodi quod tempore id laudantium quos voluptate doloribus delectus nemo omnis quaerat inventore ratione minima et nam repudiandae libero quam, minus error quas eveniet. Iure, labore animi?</p>
        </div>

        <div>
          <h3 className='text-xl font-bold'>Key Skill</h3>
          <ol className="flex flex-wrap">
            <li className="border-[1px] rounded-full px-3 m-3">React.js</li>
            <li className="border-[1px] rounded-full px-3 m-3">Redux</li>
            <li className="border-[1px] rounded-full px-3 m-3">Node.js</li>
            <li className="border-[1px] rounded-full px-3 m-3">Express.js</li>
            <li className="border-[1px] rounded-full px-3 m-3">MongoDB</li>
            <li className="border-[1px] rounded-full px-3 m-3">Material-UI</li>
            <li className="border-[1px] rounded-full px-3 m-3">Tailwind CSS</li>
            <li className="border-[1px] rounded-full px-3 m-3">TypeScript</li>
            <li className="border-[1px] rounded-full px-3 m-3">Vite</li>
            <li className="border-[1px] rounded-full px-3 m-3">REST APIs</li>
          </ol>
        </div>
        <Button className=' text-white bg-black mx-auto w-full text-lg my-6'>Apply</Button>
      </div>
    </>
  )
}

export default Job