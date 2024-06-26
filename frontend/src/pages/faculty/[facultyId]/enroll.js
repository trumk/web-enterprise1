import React, { useState } from 'react'
import NavbarDefault from '../../../components/navbar'
import DefaultSidebar from '../../../components/sidebar'
import {
  Button,
  Card,
  Input,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getOneFaculty, joinFaculty } from '../../../redux/apiRequest';
import { useNavigate } from 'react-router-dom';

export const EnrollFaculty = () => {
  const [enrollKey, setEnrollKey] = useState('');
  const {facultyId} = useParams()

  const user = useSelector((state) => state.auth.login?.currentUser);
  const faculty = useSelector((state) => state.faculty.faculty?.currentFaculty);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (user && user?.accessToken) {
      dispatch(getOneFaculty(facultyId, user?.accessToken));
    }
  }, [dispatch, facultyId, user]);

  const handleEnroll = async (e) => {
    e.preventDefault();
    const enroll={
      enrollKey:enrollKey,
    }
    dispatch(joinFaculty(facultyId, user?.accessToken, enroll, navigate));
  };

  console.log(facultyId)
  return (
    
    <>
    <NavbarDefault />
      <div className="flex">
        
        <DefaultSidebar className="flex" />
        <div className="ml-5 w-full h-full">
          <div className='mt-10'>
            <Typography variant='h4'>
              Enroll Faculty:
            </Typography>
            <Typography variant='h6'>Enroll if you want to join {faculty?.Faculty.facultyName}</Typography>
            <div className='w-72 mt-2'>
              <form onSubmit={handleEnroll}>                
            <Input 
            type="password" 
            variant='standard' 
            onChange={(e)=> setEnrollKey(e.target.value)}
            value={enrollKey}
            />
            <Button color='blue' className='mt-2' onClick={handleEnroll}>Enroll</Button>
              </form>
            </div>
          </div>
        </div>
        </div>
    </>
  )
}
