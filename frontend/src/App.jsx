import { useState } from 'react'
import './App.css'
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './pages/Home'
import Landing from './pages/Landing'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Jobs from './pages/Jobs'
import Job from './pages/Job'
import Appliedjobs from './pages/Appliedjobs'
import Profile from './pages/Profile'

function App() {  
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Landing />,
    },
    {
      path: '/login',
      element: <Login/>
    },
    {
      path: '/signup',
      element: <Signup />
    },
    {
      path:'/home',
      element:<Home/>,
    },
    {
      path:'/jobs',
      element:<Jobs/>,
      children:[{
        path:'job/:jobId',
        element:<Job/>
      }]
    },
    {
      path:'/job/:jobId',
      element:<Job/>
    },
    {
      path:'/appliedjobs',
      element:<Appliedjobs/>
    },
    {
      path:'/profile',
      element:<Profile/>
    }
  ])

  return (
    <>
      <div className='grid-background px-52 font-monosans'>
        <RouterProvider router={router} />
      </div>
    </>
  )
}

export default App
