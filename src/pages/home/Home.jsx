import Header from '@/components/layouts/Header'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <Header/>
        <Outlet/>
    </div>
  )
}

export default Home