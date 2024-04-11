import React, { useEffect } from 'react'
import NavbarDefault from '../../../components/navbar'
import DefaultSidebar from '../../../components/sidebar'
import { 
    Typography, 
    Input, 
    Button,
    Card,
    CardHeader,
    CardBody,
    Avatar
} from '@material-tailwind/react'
import { useSelector } from 'react-redux'
import { getAllEventsByFaculty } from '../../../redux/apiRequest'
import { useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Preview } from '../../../components/manage/preview'
import { format } from 'date-fns'
import { ArrowRight } from 'lucide-react';

export const FacultyMainPage = () => {
    const { id } = useParams()
    const user = useSelector((state) => state.auth.login.currentUser);

    const eventInFaculty = useSelector((state) => state.faculty.getEventsByFaculty.filterEvent)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            dispatch(getAllEventsByFaculty(id, user.accessToken))
        }
    }, [user, dispatch])
    const eventData = eventInFaculty?.events
    console.log(eventData)
    return (
        <>
            <NavbarDefault />
            <div className="flex">
                <DefaultSidebar className="flex" />
                <div className="ml-5 w-full h-full">
                    <div className='mt-10 flex items-start gap-5 flex-wrap'>
                        {eventData?.map(event => (
                            <div key={event._id} className="m-2 flex-none relative" style={{width: '26rem'}}>
                                <div className="absolute w-full h-full bg-teal-900 rounded-xl"/>
                                <Card color="teal" shadow={false} className="w-full cursor-pointer transform transition-transform duration-200 hover:translate-x-1 hover:-translate-y-1 z-10">
                                    <CardHeader
                                        color="transparent"
                                        floated={false}
                                        shadow={false}
                                        className="mx-0 flex items-start gap-4 pt-0 pb-8"
                                    >
                                        <div className="flex w-full flex-col gap-0.5">
                                            <div className="flex items-start justify-between ml-3">
                                                <Typography variant="h4" color="white">
                                                    {event.topic}
                                                </Typography>
                                            </div>
                                            <Typography variant='paragraph' color="white" className='ml-4 italic'>
                                                Due to {format(event.closureDate, 'MMMM dd,yyyy')}
                                            </Typography>
                                        </div>
                                    </CardHeader>
                                    <CardBody className="mb-6 ml-4 p-0">
                                    <Link to={`/faculty/${id}/event/${event._id}`}><Button variant='outlined' className='flex items-center gap-2'>Explore more about the event <ArrowRight className='w-6' /> </Button> </Link>
                                    </CardBody>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
