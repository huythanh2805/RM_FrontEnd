import Footer from '@/components/layouts/Footer'
import Header from '@/components/layouts/Header'
import Brush from '@/components/siteColor/brush'
import { useThemeContext } from '@/contexts/ThemeProvider'
import React from 'react'
import { Outlet } from 'react-router-dom'

const HomeLayout = () => {
    const {isBoxed}= useThemeContext()
    console.log(isBoxed)
  return (
    <>
    <div className={`${isBoxed ? 'max-w-[1536px]' : 'w-screen'} transition-all duration-500 ease-in-out mx-auto overflow-hidden relative z-10 bg-white`}>
      <Header />
      <main className="">
      <Brush/>
        <Outlet />
      </main>
      <Footer />
    </div>
    {/* <div className='fixed top-0 left-0 w-full min-h-screen -z-50 bg-orange-1'>

    </div> */}
    </>
  )
}

export default HomeLayout