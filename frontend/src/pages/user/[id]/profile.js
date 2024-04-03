import React, { useEffect, useState } from 'react'
import NavbarDefault from '../../../components/navbar'
import { Button, Card, CardBody, CardHeader, Typography } from '@material-tailwind/react'
import logo from '../../../components/assets/logo.jpg'
import DefaultSidebar from '../components/sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { getSelf } from '../../../redux/apiRequest'
import { format } from 'date-fns';
import { PencilLine } from 'lucide-react'
import { Link } from 'react-router-dom'

export const UserProfile = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if(user && user._id) {
      dispatch(getSelf(user._id));
    }
  }, [dispatch, user]);

  const profile = useSelector((state) => state.user.user.user);
  console.log(user?._id);
  return (
    <>
    <NavbarDefault/>
    <div className='flex gap-6'>
      <DefaultSidebar/>
    <div className='w-full flex justify-center items-center'>
    <Card className="w-[900px] h-full mt-20 border">
      <CardHeader>
        <Typography variant='h4' className='mt-2 mb-2'>{profile?.firstName} {profile?.lastName}&apos;s profile</Typography>
      </CardHeader>
      <CardBody className='flex gap-5'>
      <img src={profile?.avatar} alt="profile-picture" className='w-80 border rounded-md' />
        <div>
        <Typography variant="h5" color="blue-gray" className="mb-2 font-medium">
          First Name: {profile?.firstName}
        </Typography>
        <Typography variant="h5" color="blue-gray" className="mb-2 font-medium">
          Last Name:  {profile.lastName}
        </Typography>
        <Typography variant="h5" color="blue-gray" className="mb-2 font-medium">
          Birthday: {format(profile?.birthDay, 'dd/MM/yyyy')}
          </Typography>
          <Typography variant='h5' color="blue-gray" className="mb-2 font-medium">
            Description: {profile?.description}
            </Typography>
        <Typography variant='h5' color="blue-gray" className="font-medium">
          Role: {user?.role} 
        </Typography>
        
        <Link to={`../user/${user._id}/edit`}><Button className='flex items-center gap-1 mt-2' color='amber'><PencilLine className='h-4 w-4'/> Edit</Button></Link>
        </div>
      </CardBody>
    </Card>
    </div>
    </div>
    
    </>
  )
}
