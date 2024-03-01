import React, { useState } from 'react'
import logo from '../components/assets/logo.jpg';
import { AlignJustify, X } from 'lucide-react';
import { useSelector } from 'react-redux';

export const Homepage = () => {
  let Links = [
    {
      name: "Home",
      link: '/',
    },
    {
      name: "Service",
      link: '/',
    },
    {
      name: "About",
      link: '/',
    },
    {
      name: "Contact",
      link: '/',
    }
  ]
  const user = useSelector((state) => state.auth.login.currentUser)
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='shadow-md w-full fixed top-0 left-0'>
      <div className='md:px-10 py-4 px-7 md:flex justify-between items-center bg=white'>
        <div className='flex text-2xl cursor-pointer items-center gap-2'>
          <img src={logo} className='w-7 h-7 text-blue-600' />
          <span className='font-bold'>Web Enterprise</span>
        </div>
        <div onClick={() => setIsOpen(!isOpen)} className='w-7 h-7 absolute right-8 top-6 cursor-pointer md:hidden'>
          {
            isOpen ? <X/> : <AlignJustify/>
          }
        </div>
        <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${isOpen ? 'top-12' : 'top-[-490px]'}`}>
          {
            Links.map(link =>
              <li className='font-semibold my-7 md:my-0 md:ml-8'>
                <a href='/'>{link.name}</a>
              </li>)
          }
          <div className='sm:flex sm:gap-2'>
            {!user ? (
              <>
              <button className='btn bg-blue-600 text-white py-1 px-3 md:ml-8 rounded md:static'>Login</button>
            <button className='btn bg-gray-600 text-white py-1 px-3 md:ml-1 rounded md:static'>Register</button>
            </>
            ) : (
              <>
              <button className='btn  text-black py-1 px-3 md:ml-8 rounded md:static'>Hi, {user.userName}</button>
            <button className='btn bg-gray-600 text-white py-1 px-3 md:ml-1 rounded md:static'>Logout</button>
              </>
            )

            }
          </div>
        </ul>

      </div>
    </div>
  )
}
