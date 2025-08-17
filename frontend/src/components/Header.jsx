import React from 'react'
import Navbar from './Navbar'
const Header = ({ profileImage, loggedUser }) => {
  return (
    <div className='relative z-30'>
        <div className="flex  w-full justify-between  items-center  px-8 pt-5">
            <div className="flex justify-between w-full max-w-screen-xl mx-auto items-center 
  bg-white/10 backdrop-blur-md rounded-full px-6 h-20 shadow-lg border border-white/20">
  <div className="logo font-bold text-3xl text-white">AIQ</div>
  <Navbar profileImage={profileImage} loggedUser={loggedUser} />
</div>

        </div>
        
    </div>
  )
}

export default Header