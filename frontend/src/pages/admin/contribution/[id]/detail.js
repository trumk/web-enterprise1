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
import { Download, File } from "lucide-react";
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
    console.log(contribution?.file)

    return (
        <>
            <NavbarDefault />
            <div className="flex ">
                <DefaultSidebar />
                <div className='ml-5 w-full border '>
                    <Card className="mt-5 ">
                        <CardHeader
                            variant="gradient"
                            color="gray"
                            className="mb-4 grid h-20 place-items-center mt-4"
                        >
                            <Typography variant="h3" color="white">
                                {contribution?.title}
                            </Typography>
                        </CardHeader>
                        <Typography variant="h5" className="ml-3 mt-4">
                            Student: {contribution?.author.firstName} {contribution?.author.lastName}
                        </Typography>
                        <Typography variant="h5" className="ml-3 mt-4">
                            Content:
                        </Typography>

                        <div className='mt-2 text-slate-500 border rounded-lg' style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '30px', marginRight: '30px' }}>
                            <Preview value={contribution?.content} style={{ flexGrow: 5 }} />
                        </div>



                        <Typography variant="h5" className="ml-3  mt-4">
                            Created At: {contribution?.createdAt ? format(new Date(contribution?.createdAt), 'MMMM dd, yyyy') : 'N/A'}
                        </Typography>
                        <Typography variant="h5" className="ml-3  mt-4">
                            Published: {contribution?.isPublic ? 'Yes' : 'No'}
                        </Typography>
                        <Typography variant="h5" className="ml-3  mt-4">
                            Image:
                            <div className='flex items-center gap-2 mt-3'>
                                {contribution?.image.map((imgSrc, index) => (
                                    <img
                                        key={index}
                                        src={imgSrc}
                                        alt={`contribution ${index}`}
                                        className='mt-2 mb-2 h-[480px] rounded-md border border-gray-900'
                                    />
                                ))}
                            </div>

                        </Typography>
                        <Typography variant="h5" className="ml-3 mt-4">
                            Files:
                        </Typography>
                        {contribution?.file.length > 0 && (
                            <div className="space-y-4">
                                {contribution?.file.map((file, index) => (
                                    <div
                                        className="flex items-center justify-between p-3 w-[500px] bg-sky-100 border border-gray-900 text-sky-700 rounded-md ml-3 bg-blue-200 cursor-pointer hover:bg-blue-300 transition-all duration-300 ease-in-out"
                                    >
                                        <div className='flex items-center'>
                                            <File className="h-4 w-4 mr-2 flex-shrink-0" />
                                            <Typography className='text-sm'>{file.split('/').pop()}</Typography>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        <CardFooter className='mt-4'>
                            <Link to="/admin/contribution">
                                <Button color='green '>Back to List</Button>
                            </Link>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </>
    )
}
