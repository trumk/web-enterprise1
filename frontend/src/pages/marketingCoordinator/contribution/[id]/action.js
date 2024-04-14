import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
    Avatar,
    Button,
    Card,
    CardFooter,
    CardHeader,
    Textarea,
    Tooltip,
    Typography,
} from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import { Download, File } from "lucide-react";
import { format } from 'date-fns';
import NavbarDefault from '../../../../components/navbar';
import { commentContribution, getOneContribution, publicContribution } from '../../../../redux/apiRequest';
import DefaultSidebar from '../../../../components/sidebar';
import { Preview } from '../../../../components/manage/preview';
export const ManageContribution = () => {
    const [comment, setComment] = useState();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const contribution = useSelector((state) => state.contribution.contribution?.currentContribution);
    const comments = contribution?.comments;
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getRole = user?.role;
    useEffect(() => {
        if (user && user?.accessToken) {
            dispatch(getOneContribution(id, user.accessToken));
        }
    }, [dispatch, id, user]);
    const handlePublic = () => {
        if (user && user?.accessToken) {
            dispatch(publicContribution(id, user.accessToken, navigate));
        }
    }
    const handleComment = (e) => {
        e.preventDefault();
        const marketingCoordinatorComment = {
            comment: comment,
        }
        dispatch(commentContribution(id, marketingCoordinatorComment, user.accessToken))
            .then(() => {
                window.location.reload();
            });
    };
    console.log(contribution?.isPublic)
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
                            Published: {contribution?.isPublic ? 'Published' : 'Not published'}
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
                                {contribution?.file?.map((file, index) => (
                                    <div
                                        className="flex items-center justify-between p-3 w-[500px] bg-sky-100 border border-gray-900 text-sky-700 rounded-md ml-3 bg-blue-200 cursor-pointer hover:bg-blue-300 transition-all duration-300 ease-in-out"
                                    >
                                        <div>
                                            <File className="h-4 w-4 mr-2 flex-shrink-0" />
                                            <Typography>{file.name}</Typography>
                                        </div>
                                        <a href={file}>
                                            <Button>
                                                <Download className='h-4 w-4' />
                                            </Button>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        )}
                        <CardFooter>
                            <Link to="/marketingCoordinator">
                                <Button>Back to List</Button>
                            </Link>
                            <Tooltip
                                content={contribution?.isPublic ? "This contribution is already public" : "Make this contribution public"}
                                placement="right"
                                animate={{
                                    mount: { scale: 1, y: 0 },
                                    unmount: { scale: 0, y: 25 },
                                }}
                            >
                                <span>
                                    <Button className='ml-5' disabled={contribution?.isPublic} onClick={handlePublic}>Public This Contribution?</Button>
                                </span>
                            </Tooltip>
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <Typography variant='h5' className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Your opinion about this post?</Typography>
                                </div>
                                <form className="mb-6" onSubmit={handleComment}>
                                    <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">

                                        <Textarea
                                            label="Evaluate about this contribution"
                                            onChange={(e) => setComment(e.target.value)}
                                        />
                                    </div>
                                    <Button onClick={handleComment}
                                    >
                                        Post comment
                                    </Button>
                                </form>
                                {comments?.filter(comment => comment.userID === user?._id && getRole === 'marketing coordinator').map((comment) => (
                                    <article className="p-6 mb-6 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                                        <footer className="flex justify-between items-center mb-2">
                                            <div className="flex items-center">
                                                <p className="inline-flex items-center mr-3 font-semibold text-sm text-gray-900 dark:text-white">
                                                    <Avatar className="mr-2 w-6 h-6 rounded-full" src={comment.userProfile.avatar} alt={comment.userID} />
                                                    {comment.userProfile.firstName} {comment.userProfile.lastName}
                                                </p>
                                            </div>
                                        </footer>
                                        <p>{comment.comment}</p>
                                        <div className="flex items-center mt-4 space-x-4">
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </>
    )
}
