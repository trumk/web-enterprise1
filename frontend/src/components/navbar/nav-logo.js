import React from 'react'
import logo from '../assets/logo.jpg'

export const NavLogo = () => {
  return (
    <a href='/'>
      <div className='flex text-2xl cursor-pointer items-center gap-2'>
          <img src={logo} className='w-10 h-10 text-blue-600' />
          <span className='font-bold'>Web Enterprise</span>
        </div>
    </a>
  )
}
