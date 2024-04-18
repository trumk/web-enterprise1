import React, { useEffect } from 'react'
import NavbarDefault from '../../../components/navbar'
import DefaultSidebar from '../../../components/sidebar'
import { useDispatch, useSelector } from 'react-redux';
import { getAllEvents, getExceptionContributions } from '../../../redux/apiRequest';
import { Card, Typography } from '@material-tailwind/react';
import { format } from 'date-fns';

export const ExceptionContribution = () => {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const exceptionContribution = useSelector((state) => state.contribution?.exception.exceptionContributions);
    const events = useSelector((state) => state.event?.events?.allEvents);
    const dispatch = useDispatch();
    useEffect(() => {
        if (user && user.accessToken) {
            dispatch(getExceptionContributions(user.accessToken));
        }

    }, [user, dispatch]);
    useEffect(() => {
        if (user && user.accessToken) {
            dispatch(getAllEvents(user.accessToken));
        }
    }, [user, dispatch]);
    const detailEvent = events?.events;
    console.log(events?.events);
    const noComments = exceptionContribution?.noComments;
    const noCommentsAfter14Days = exceptionContribution?.noCommentsAfter14Days;
    console.log(noComments, noCommentsAfter14Days);
    const TABLE_HEAD = ["Title", "Created At", "Images", "Event"];
    return (
        <>
            <NavbarDefault />
            <div className="flex">
                <DefaultSidebar className="flex" />
                <div className="ml-5 w-full">
                    <Card className="h-full w-full overflow-scroll">
                        <Typography className='my-4' variant='h4'>Contribution with no comment</Typography>
                        <table className="w-full min-w-max table-auto text-left">
                            <thead>
                                <tr>
                                    {TABLE_HEAD.map((head) => (
                                        <th
                                            key={head}
                                            className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                        >
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal leading-none opacity-70"
                                            >
                                                {head}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                            {noComments?.length === 0 ? (
                                    <tr>
                                        
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-medium p-4"
                                            >
                                                There is no contribution with no comment
                                            </Typography>
                                        
                                    </tr>
                                ) : (
                                noComments?.map((comment, index) => {
                                    const event = detailEvent?.find(event => event._id === comment.eventID);
                                    return (
                                        <tr key={comment._id}>
                                            <td className="p-4">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {comment.title}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {format(new Date(comment.createdAt), "dd/MM/yyyy")}
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <Typography
                                                    as="a"
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-medium"
                                                >
                                                    <img src={comment?.image[0]} alt="comment" className="w-10 h-10" />
                                                </Typography>
                                            </td>
                                            <td className="p-4">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {event?.topic}
                                                </Typography>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                            </tbody>
                        </table>
                        <Typography className='my-4' variant='h4'>Contribution with no comment after 14 days</Typography>
                        <table className="w-full min-w-max table-auto text-left">
                            <thead>
                                <tr>
                                    {TABLE_HEAD.map((head) => (
                                        <th
                                            key={head}
                                            className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                        >
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal leading-none opacity-70"
                                            >
                                                {head}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {noCommentsAfter14Days?.length === 0 ? (
                                    <tr>
                                        
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-medium p-4"
                                            >
                                                There is no contribution with no comment after 14 days
                                            </Typography>
                                        
                                    </tr>
                                ) : (
                                    noCommentsAfter14Days?.map((comment, index) => {
                                        const event = detailEvent?.find(event => event._id === comment.eventID);
                                        return (
                                            <tr key={comment._id}>
                                                <td className="p-4">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {comment.title}
                                                    </Typography>
                                                </td>
                                                <td className="p-4">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {format(new Date(comment.createdAt), "dd/MM/yyyy")}
                                                    </Typography>
                                                </td>
                                                <td className="p-4">
                                                    <Typography
                                                        as="a"
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-medium"
                                                    >
                                                        <img src={comment?.image[0]} alt="Comment" className="w-10 h-10" />
                                                    </Typography>
                                                </td>
                                                <td className="p-4">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {event?.topic}
                                                    </Typography>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </Card>
                </div>
            </div>
        </>
    )
}
