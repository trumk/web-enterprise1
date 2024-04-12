import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneContribution } from '../../../../redux/apiRequest';
import NavbarDefault from '../../../../components/navbar';
import DefaultSidebar from '../../../../components/sidebar';
import {
    Button,
    Card,
    CardFooter,
    CardHeader,
    Typography,
} from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import { File } from "lucide-react";
import { format } from 'date-fns';
import { Preview } from '../../../../components/manage/preview';
export const ContributionDetail = () => {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const contribution = useSelector((state) => state.contribution.contribution?.currentContribution);
    const { id } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        if (user && user?.accessToken) {
            dispatch(getOneContribution(id, user.accessToken));
        }
    }, [dispatch, id, user]);
    
    return (
        <>
            <NavbarDefault />
            <div className="flex">
                <DefaultSidebar />
                <div className='ml-5 w-full'>
                    <Card className="mt-5">
                        <CardHeader
                            variant="gradient"
                            color="gray"
                            className="mb-4 grid h-28 place-items-center"
                        >
                            <Typography variant="h3" color="white">
                                {contribution?.title}
                            </Typography>
                        </CardHeader>
                        <Typography variant="h5" className="ml-3">
                            Student: {contribution?.author.firstName} {contribution?.author.lastName}
                        </Typography>
                        <Typography variant="h5" className="ml-3">
                            Content:
                        </Typography>
                        <Preview value={contribution?.content} />
                        <Typography variant="h5" className="ml-3">
                            Created At: {contribution?.createdAt ? format(new Date(contribution?.createdAt), 'MMMM dd, yyyy') : 'N/A'}
                        </Typography>
                        <Typography variant="h5" className="ml-3">
                            Published: {contribution?.isPublic ? 'Yes' : 'No'}
                            </Typography>
                        <Typography variant="h5" className="ml-3">
                            Image:
                            <div className='flex items-center gap-2'>
                                {contribution?.image.map((imgSrc, index) => (
                                <img
                                    key={index}
                                    src={imgSrc}
                                    alt={`contribution ${index}`}
                                    className='mt-2 mb-2 h-[300px] rounded-md border border-gray-900'
                                />
                            ))}
                            </div>
                            
                        </Typography>
                        <Typography variant="h5" className="ml-3">
                            Files:
                        </Typography>
                        {contribution?.file.length > 0 && (
                            <div className="space-y-2">
                                {contribution.file.map((file, index) => (
                                    <div
                                        className="flex items-center p-3 w-[500px] bg-sky-100 border border-gray-900 text-sky-700 rounded-md ml-3 bg-blue-200 cursor-pointer hover:bg-blue-300 transition-all duration-300 ease-in-out"
                                    >
                                        
                                        <File className="h-4 w-4 mr-2 flex-shrink-0" />
                                        <p className="text-xs line-clamp-1">
                                            Contribution Attachment {index + 1}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                        <CardFooter>
                            <Link to="/admin/contribution">
                                <Button>Back to List</Button>
                            </Link>
                            <Button className="ml-3" onClick={() => { }}>Delete</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </>
    )
}
