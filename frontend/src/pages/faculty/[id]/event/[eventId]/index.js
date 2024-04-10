import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import NavbarDefault from '../../../../../components/navbar';
import DefaultSidebar from '../../../../../components/sidebar';
import { allContributionsByEventData, getOneEvent } from '../../../../../redux/apiRequest';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
  Button,
  Card,
  CardFooter,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { format } from "date-fns";
import { Preview } from '../../../../../components/manage/preview';
export const EventInfo = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.auth.login.currentUser);
  const event = useSelector((state) => state.event.event.currentEvent);
  const contributionData = useSelector((state) => state.contribution.getContributionsByEvent?.contributions);
  const dispatch = useDispatch();

  const currentUrl = window.location.pathname;
  const submitUrl = `${currentUrl}/contribution/submit`
  useEffect(() => {
    if (user) {
      dispatch(getOneEvent(id, user.accessToken));
    }
  }, [user, id, dispatch]);
  useEffect(() => {
    if (user) {
      dispatch(allContributionsByEventData(id, user.accessToken));
    }
  }, [user, id, dispatch]);
  const eventData = event?.Event;
  console.log(contributionData);
  return (
    <>
      <NavbarDefault />
      <div className='flex'>
        <DefaultSidebar className='flex' />
        <div className='ml-5 w-full h-full'>
          <Link to={`/faculty/${id}/event/${id}`}><Button color='blue'>Back</Button></Link>
          {eventData && (
            <Card className="mt-10">
              <CardHeader
                variant="gradient"
                color="gray"
                className="grid h-28 place-items-center"
              >
                <Typography variant="h3" color="white">
                  {eventData?.topic}
                </Typography>
              </CardHeader>
              <CardBody className="">
                <Typography variant="h6" className="ml-3">
                  Description:
                </Typography>
                <Preview value={eventData?.content} />
                <Typography variant="h6" className="ml-3">
                  Closure Date: {eventData?.closureDate ? format(new Date(eventData?.closureDate), 'MMMM dd,yyyy') : 'N/A'}
                </Typography>
                <Typography variant="h6" className="ml-3">
                  Final Date: {eventData?.finalDate ? format(new Date(eventData?.finalDate), 'MMMM dd,yyyy') : 'N/A'}
                </Typography>
                <Typography variant="h6" className="ml-3">
                  Create Date: {eventData?.createEvent ? format(new Date(eventData?.createEvent), 'MMMM dd,yyyy') : 'N/A'}
                </Typography>
              </CardBody>
              <CardFooter className='mt-[-20px]'>
                <Link to={submitUrl}><Button color='green'>Post new contribution</Button></Link>
                <Typography variant="h4" color='black' className="ml-3 mb-2">
                  Related Contribution
                  </Typography>
                <div className='flex gap-5 items-center'>
                {contributionData ? (
                  contributionData && contributionData.length > 0 ? (
                    contributionData.map((detail, index) => (
                      <Card className="mt-6 w-96 transform transition-transform duration-200 hover:translate-x-3 hover:-translate-y-3 z-10">
                        <CardHeader color="blue-gray" className="relative h-60">
                          {Array.isArray(detail.image) && detail.image.length > 0 && (
                            <img src={detail.image[0]} alt="contribution" className='w-full'/>
                          )}
                        </CardHeader>
                        <CardBody>
                          <Typography variant="h5" color="blue-gray" className="mb-2 line-clamp-2 hover:text-blue-500 hover:cursor-pointer">
                            {detail.title}
                          </Typography>
                          <Typography>
                            Created at: {format(new Date(detail.createdAt), 'MMMM dd, yyyy')}
                          </Typography>
                          <Typography variant="paragraph">
                            Author: {detail.userID.userName}
                          </Typography>
                          <Typography variant="paragraph" className='line-clamp-3'>
                            {detail.content}
                            </Typography>
                        </CardBody>
                        <CardFooter className="pt-0">
                          <Link to={`${currentUrl}/contribution/${detail._id}/read`}><Button>Read More</Button></Link>
                        </CardFooter>
                      </Card>

                    ))
                  ) : (
                    <></>
                  )
                ) : (
                  <>
                  </>
                )}
                </div>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </>
  )
}
