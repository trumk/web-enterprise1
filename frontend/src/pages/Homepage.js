import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import NavbarDefault from '../components/navbar';
import DefaultSidebar from '../components/sidebar';

export const Homepage = () => {
  return (
    <>
    <NavbarDefault/>
    <DefaultSidebar/>
    </>
  )
}
