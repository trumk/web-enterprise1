import React from 'react'
import { NavLogo } from './nav-logo'
import { NavItem } from './nav-items'

export const Navbar = () => {
  return (
    <div className='shadow-md w-full fixed top-0 left-0 z-10'>
      <div className='md:px-10 py-4 px-7 md:flex justify-between items-center bg=white'>
        <NavLogo/>
        <NavItem/>
      </div>
    </div>
  )
}
