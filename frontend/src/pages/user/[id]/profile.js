import React, { useEffect } from 'react'
import NavbarDefault from '../../../components/navbar'
import { Tooltip } from '@material-tailwind/react'
import DefaultSidebar from '../components/sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { getSelf } from '../../../redux/apiRequest'
import { format } from 'date-fns';
import { Pen, } from 'lucide-react'
import { Link } from 'react-router-dom'

export const UserProfile = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user && user?._id) {
      dispatch(getSelf(user?._id));
    }
  }, [dispatch, user]);

  const profile = useSelector((state) => state.user.user?.user);
  return (
    <>
      <NavbarDefault />
      <div className='flex gap-6'>
        <DefaultSidebar />
        <div className='w-full'>
          <div class="border h-100 border-gray-900 rounded-md mt-5 dark:!bg-navy-800 shadow-shadow-500 shadow-3xl rounded-primary relative mx-auto flex w-full max-w-[550px] flex-col items-center bg-white bg-cover bg-clip-border p-[16px] dark:text-white dark:shadow-none">
            <div class="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover">
              <img class="h-full w-full rounded-xl" src="https://i.ibb.co/FWggPq1/banner.png" alt=""/>
              <div class="absolute -bottom-12 flex h-[88px] w-[88px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400">
                <img class="h-full w-full rounded-full" src={profile?.avatar} alt="" />
                <Tooltip
                  content="Edit Profile"
                  placement="right"
                >
                  <Link to={`../user/${user?._id}/edit`}>
                    <button class="absolute -bottom-3 hover:bg-white right-0 flex items-center justify-center border-none bg-transparent font-bold py-2 px-2 rounded-full">
                      <Pen className='w-5' />
                    </button>
                  </Link>
                </Tooltip>
              </div>
            </div>
            <div class="mt-16 flex flex-col items-center">
              <h4 class="text-bluePrimary text-xl font-bold">{profile?.firstName} {profile.lastName} </h4>
              <p class="text-lightSecondary text-base font-normal">{profile?.description}</p>
            </div>
            <div class="mt-6 mb-3 flex gap-4 md:!gap-14">
              <div class="flex flex-col items-center justify-center">
                <h3 class="text-bluePrimary text-2xl font-bold">Role</h3>
                <p class="text-lightSecondary text-sm font-normal">{user?.role}</p>
              </div>
              <div class="flex flex-col items-center justify-center">
                <h3 class="text-bluePrimary text-2xl font-bold">Birthday</h3>
                <p class="text-lightSecondary text-sm font-normal">{profile?.birthDay ? format(new Date(profile?.birthDay), 'MMMM dd,yyyy') : 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
