import React, { useEffect, useState } from 'react'
import NavbarDefault from '../../../components/navbar'
import DefaultSidebar from '../components/sidebar'
import { Button, Card, CardBody, CardHeader, Input, Popover, PopoverContent, PopoverHandler, Textarea, Typography } from '@material-tailwind/react'
import { format } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { DayPicker } from "react-day-picker";
import { ChevronLeftIcon, ChevronRightIcon, ImageUp, } from 'lucide-react'
import { editProfile, getSelf } from '../../../redux/apiRequest'

export const EditProfile = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    if (user && user._id) {
      dispatch(getSelf(user._id));
    }
  }, [dispatch, user]);

  const profile = useSelector((state) => state.user.user.user);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDay, setBirthDay] = useState(new Date());
  const [description, setDescription] = useState('');
  const [avatar, setAvatar] = useState(profile.avatar);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditAvatar = () => {
    setIsEditing(true);
  };


  useEffect(() => {
    if (profile) {
      setFirstName(profile.firstName || '');
      setLastName(profile.lastName || '');
      setBirthDay(profile.birthDay ? new Date(profile.birthDay) : new Date());
      setDescription(profile.description || '');
    }
  }, [profile]);
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    setIsEditing(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const editedProfile = new FormData();
    editedProfile.append("firstName", firstName);
    editedProfile.append("lastName", lastName);
    editedProfile.append("birthDay", birthDay);
    if (avatar) {
      editedProfile.append("avatar", avatar);
    }
    editedProfile.append("description", description);
    for (const [key, value] of editedProfile.entries()) {
      console.log(key + ': ' + value);
    }
    

    dispatch(editProfile(profile._id, user._id, user.accessToken, editedProfile, navigate));
  };
  return (
    <>
      <NavbarDefault />
      <div className='flex'>
        <DefaultSidebar />
        <div className='ml-5 w-full'>
          <Card className="w-[900px] mt-20 border">
            <CardHeader>
              <Typography variant='h4' className='mt-2 mb-2'>{profile?.firstName} {profile?.lastName}&apos;s profile</Typography>
            </CardHeader>
            <CardBody className='flex gap-5 items-center'>
              <form className="mt-8 mb-2 grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
                <div className="mb-1 flex flex-col gap-6">
                  <Typography variant="h6" color="blue-gray" className="-mb-3 w-full">
                    First Name
                  </Typography>
                  <Input
                    size="lg"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
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
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
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
                        value={format(birthDay, 'MMMM, dd, yyyy')}
                        onChange={(e) => setBirthDay(new Date(e.target.value))}
                      />
                    </PopoverHandler>
                    <PopoverContent>
                      <DayPicker
                        mode="single"
                        selected={birthDay}
                        onSelect={setBirthDay}
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
                </div>
                <div className="mb-1 flex flex-col gap-6">
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Avatar
                  </Typography>
                  <div className='w-[800px]'>
                    <div className="rounded-lg shadow-xl bg-gray-50 md:w-1/2 w-[400px]">
                      <div className="m-4">
                        <div className="flex items-center justify-center w-full">
                          {isEditing ? (
                            <label className="flex cursor-pointer flex-col w-full h-32 border-2 rounded-md border-dashed hover:bg-gray-100 hover:border-gray-300">
                              <div className="flex flex-col items-center justify-center pt-7">
                                <ImageUp />
                                <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                  Select an image</p>
                              </div>
                              <input type="file" onChange={handleImageUpload} class="opacity-0" />
                            </label>
                          ) : (
                            <>
                            <div className="flex items-center justify-end w-full">
                              <Button variant='text'onClick={handleEditAvatar}>Edit Avatar</Button>
                            </div>
                            </>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {avatar && (
                            <div className="overflow-hidden relative">
                              <img className="h-20 w-20 rounded-md" src={avatar} />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Description
                  </Typography>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} />
                  <Button className="mt-6" fullWidth onClick={handleSubmit}>
                    Save
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  )
}
