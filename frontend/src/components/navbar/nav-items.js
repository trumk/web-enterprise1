import { AlignJustify, LogOut, Settings, UserRound, X } from 'lucide-react';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Typography,
} from "@material-tailwind/react";

export const NavItem = () => {
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
    <>
      <div onClick={() => setIsOpen(!isOpen)} className='w-7 h-7 absolute right-8 top-6 cursor-pointer md:hidden'>
        {
          isOpen ? <X /> : <AlignJustify />
        }
      </div>
      <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${isOpen ? 'top-12' : 'top-[-490px]'}`}>
        {
          Links.map(link =>
            <li className='font-semibold my-7 md:my-0 md:ml-8 hover:text-gray-600'>
              <a href='/'>{link.name}</a>
            </li>)
        }
        <div className='sm:flex sm:gap-2'>
          {!user ? (
            <>
              <a href='/login' className='btn bg-blue-600 text-white py-1 px-3 md:ml-8 rounded md:static hover:text-slate-100 hover:bg-blue-500'>Login</a>

              <a href='/signup' className='btn bg-gray-600 text-white py-1 px-3 md:ml-1 rounded md:static hover:text-slate-100 hover:bg-gray-500'>Register</a>
            </>
          ) : (
            <div className='ml-4'>
              <Menu>
                <MenuHandler>
                  <Avatar
                    variant="circular"
                    alt="tania andrew"
                    className="cursor-pointer"
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                  />
                </MenuHandler>
                <MenuList>
                  <MenuItem className="flex items-center gap-2">
                    <UserRound className='w-4 h-4'/>

                    <Typography variant="small" className="font-medium">
                      {user.userName}
                    </Typography>
                  </MenuItem>
                  <MenuItem className="flex items-center gap-2">
                    <Settings className='w-4 h-4'/>

                    <Typography variant="small" className="font-medium">
                      Manage account
                    </Typography>
                  </MenuItem>
                  <hr className="my-2 border-blue-gray-50" />
                  <MenuItem className="flex items-center gap-2 ">
                    <LogOut className='h-4 w-4'/>
                    <Typography variant="small" className="font-medium">
                      Sign Out
                    </Typography>
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
          )

          }
        </div>
      </ul>
    </>
  )
}
