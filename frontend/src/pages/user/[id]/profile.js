import React, { useEffect, useState } from 'react'
import NavbarDefault from '../../../components/navbar'
import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react'
import logo from '../../../components/assets/logo.jpg'
import DefaultSidebar from '../components/sidebar'
import { useSelector } from 'react-redux'

export const UserProfile = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  return (
    <>
    <NavbarDefault/>
    <div className='flex gap-6'>
      <DefaultSidebar/>
    <div className='w-full flex justify-center items-center'>
    <Card className="w-full h-full mt-20">
      <CardHeader className="h-80">
        <img src={logo} alt="profile-picture" className='w-64 h-64' />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2 font-medium">
          Email: {user.email}
        </Typography>
        <Typography variant="h5" color="blue-gray" className="mb-2 font-medium">
          UserName:  {user.userName}
        </Typography>
        <Typography variant='h5' color="blue-gray" className="font-medium">
          Role: {user.role} 
        </Typography>
      </CardBody>
    </Card>
    </div>
    </div>
    
    </>
  )
}
