import React from 'react'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <p className='rubik-glitch-pop-regular'>Home</p>
        <Outlet/>
    </div>
  )
}

export default Home