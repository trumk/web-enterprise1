import React, { useEffect, useState } from 'react'
import NavbarDefault from '../../../components/navbar'
import DefaultSidebar from '../../../components/sidebar'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneContribution } from '../../../redux/apiRequest';
import { Avatar, Button, Card, CardFooter, CardHeader, Typography } from '@material-tailwind/react';
import { Preview } from '../../../components/manage/preview';
import { Download, File } from 'lucide-react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

export const MyContributionDetail = () => {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const contribution = useSelector((state) => state.contribution.contribution?.currentContribution);
    const { id } = useParams();
    const dispatch = useDispatch();
    const comments = contribution?.comments
    const [currentPage, setCurrentPage] = useState(1);
    const commentsPerPage = 5;
    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = comments?.slice(indexOfFirstComment, indexOfLastComment);
    const sortedComments = currentComments?.sort((a, b) => {
        if (a.userProfile?.user.role === 'marketing coordinator') return -1;
        if (b.userProfile?.user.role === 'marketing coordinator') return 1;
        return 0;
    });
    useEffect(() => {
        if (user && user?.accessToken) {
            dispatch(getOneContribution(id, user.accessToken));
        }
    }, [dispatch, id, user]);
    console.log(sortedComments)
    return (
        <>
            <NavbarDefault />
            <div className='flex'>
                <DefaultSidebar className='flex' />
                <div className='mt-5 ml-5 w-full'>
                    <Link to="/myContribution">
                        <Button color='green'>Back to List</Button>
                    </Link>
                    <Card className="mt-5">
                        <CardHeader
                            variant="gradient"
                            color="purple"
                            className="mb-4 grid h-28 place-items-center mt-4"
                        >
                            <Typography variant="h4" color="white">
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
                                {contribution?.file.map((file, index) => (
                                    <div
                                        className="flex items-center justify-between p-3 w-[500px] bg-sky-100 border border-gray-900 text-sky-700 rounded-md ml-3 bg-blue-200 cursor-pointer hover:bg-blue-300 transition-all duration-300 ease-in-out"
                                    >
                                        <div className='flex items-center'>
                                            <File className="h-4 w-4 mr-2 flex-shrink-0" />
                                            <Typography className='text-sm'>{file.split('/').pop()}</Typography>
                                        </div>
                                        <a target="_blank" href={file} download>
                                            <Button>
                                                <Download className='h-4 w-4' />
                                            </Button>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        )}
                        <CardFooter>
                            {sortedComments?.map((comment) => (
                                <article
                                    className={`p-6 mb-6 text-base rounded-md border-t dark:border-gray-700 ${comment.userProfile?.user.role === 'marketing coordinator' ? 'bg-yellow-100 dark:bg-yellow-600' : 'bg-white dark:bg-gray-900'}`}
                                >
                                    <footer className="flex justify-between items-center mb-2">
                                        <div className="flex items-center">
                                            <p className="inline-flex items-center mr-3 font-semibold text-sm text-gray-900 dark:text-white">
                                                <Avatar className="mr-2 w-6 h-6 rounded-full" src={comment.userProfile?.avatar} alt={comment.userID} />
                                                {comment.userProfile?.firstName} {comment.userProfile?.lastName} {comment.userProfile?.user.role === "marketing coordinator" ? "(Marketing Coordinator)" : ""}
                                            </p>
                                        </div>
                                    </footer>
                                    <p>{comment.comment}</p>
                                    <div className="flex items-center mt-4 space-x-4">
                                    </div>
                                </article>
                            ))}
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </>
    )
}
