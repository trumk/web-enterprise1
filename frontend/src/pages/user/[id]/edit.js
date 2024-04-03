import React, { useEffect, useState } from 'react'
import NavbarDefault from '../../../components/navbar'
import DefaultSidebar from '../components/sidebar'
import { Button, Card, CardBody, CardHeader, Input, Popover, PopoverContent, PopoverHandler, Textarea, Typography } from '@material-tailwind/react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux'
import { DayPicker } from "react-day-picker";
import { ChevronLeftIcon, ChevronRightIcon, ImageUpIcon, PencilLine } from 'lucide-react'
import { getSelf } from '../../../redux/apiRequest'

export const EditProfile = () => {
  const [date, setDate] = useState();
  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (user && user._id) {
      dispatch(getSelf(user._id));
    }
  }, [dispatch, user]);

  const profile = useSelector((state) => state.user.user.user);
  const [firstName, setFirstName] = useState(profile?.firstName || '');
  const [lastName, setLastName] = useState(profile?.lastName || '');
  const [description, setDescription] = useState(profile?.description || '');
  const [avatar, setAvatar] = useState(profile?.avatar || '');

  useEffect(() => {
    if (profile) {
      setFirstName(profile.firstName || '');
      setLastName(profile.lastName || '');
      setDescription(profile.description || '');
      setAvatar(profile.avatar || '');
    }
  }, [profile]);
  return (
    <>
      <NavbarDefault />
      <div className='flex gap-6'>
        <DefaultSidebar />
        <div className='w-full flex justify-center items-center'>
          <Card className="w-[900px] h-full mt-20 border">
            <CardHeader>
              <Typography variant='h4' className='mt-2 mb-2'>{profile?.firstName} {profile?.lastName}&apos;s profile</Typography>
            </CardHeader>
            <CardBody className='flex gap-5 items-center'>
              <form className="mt-8 mb-2 w-full sm:w-96">
                <div className="mb-1 flex flex-col gap-6">
                  <Typography variant="h6" color="blue-gray" className="-mb-3 w-full">
                    First Name
                  </Typography>
                  <Input
                    size="lg"
                    value={profile?.firstName}
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Last Name
                  </Typography>
                  <Input
                    size="lg"
                    value={profile?.lastName}
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Birthday
                  </Typography>
                  <Popover placement="bottom">
                    <PopoverHandler>
                      <Input
                        size="lg"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                        onChange={() => null}
                        value={format(profile?.birthDay, 'MMMM dd,yyyy')}
                      />
                    </PopoverHandler>
                    <PopoverContent>
                      <DayPicker
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        showOutsideDays
                        className="border-0"
                        classNames={{
                          caption: "flex justify-center py-2 mb-4 relative items-center",
                          caption_label: "text-sm font-medium text-gray-900",
                          nav: "flex items-center",
                          nav_button:
                            "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                          nav_button_previous: "absolute left-1.5",
                          nav_button_next: "absolute right-1.5",
                          table: "w-full border-collapse",
                          head_row: "flex font-medium text-gray-900",
                          head_cell: "m-0.5 w-9 font-normal text-sm",
                          row: "flex w-full mt-2",
                          cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                          day: "h-9 w-9 p-0 font-normal",
                          day_range_end: "day-range-end",
                          day_selected:
                            "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                          day_today: "rounded-md bg-gray-200 text-gray-900",
                          day_outside:
                            "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                          day_disabled: "text-gray-500 opacity-50",
                          day_hidden: "invisible",
                        }}
                        components={{
                          IconLeft: ({ ...props }) => (
                            <ChevronLeftIcon {...props} className="h-4 w-4 stroke-2" />
                          ),
                          IconRight: ({ ...props }) => (
                            <ChevronRightIcon {...props} className="h-4 w-4 stroke-2" />
                          ),
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Avatar
                  </Typography>
                  <div className="p-4 flex flex-col items-center gap-2 bg-violet-50 text-violet-500 rounded-lg hover:bg-violet-100 cursor-pointer border">
                    {profile.avatar ? (
                      <>
                        <ImageUpIcon className="w-6 h-6" />
                        <span>Choose some files to upload</span>
                      </>
                    ) : (
                      <img src={profile.avatar} alt="profile-picture" className="w-80 border rounded-md" />
                    )}
                    <input type="file" className="hidden" />
                  </div>
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Description
                  </Typography>
                  <Textarea label="Message" />
                </div>
                <Button className="mt-6" fullWidth>
                  Save
                </Button>
              </form>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  )
}
