import { Avatar, Button, Textarea, Typography } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { format } from 'date-fns'
import { Download, File } from 'lucide-react'
import { commentContribution, getOneContribution } from '../../../redux/apiRequest'
import NavbarDefault from '../../../components/navbar'
import { Preview } from '../../../components/manage/preview'
import { DefaultPagination } from '../../../components/manage/pagination'

export const ReadContributionDashboardByGuest = () => {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const { contributionId } = useParams();
    const [comment, setComment] = useState();
    const contribution = useSelector((state) => state.contribution.contribution?.currentContribution);
    const comments = contribution?.comments;
    const dispatch = useDispatch();
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
    const paginate = pageNumber => setCurrentPage(pageNumber);
    useEffect(() => {
        if (user && user.accessToken) {
            dispatch(getOneContribution(contributionId, user.accessToken));
        }
    }, [dispatch, contributionId, user]);

    const handleComment = (e) => {
        e.preventDefault();
        const userComment = {
            comment: comment,
        }
        dispatch(commentContribution(contribution._id, userComment, user.accessToken))
            .then(() => {
                window.location.reload();
            });
    };
    const images = contribution?.image.map(image => ({ img: image }))
    const [active, setActive] = useState(images?.[0]?.img || '');
    useEffect(() => {
        if (contribution?.image.length > 0) {
          setActive(contribution.image[0]);
        }
      }, [contribution]);
    return (
        <>
            <NavbarDefault />
            <main className="pt-8 pb-16 lg:pt-10 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
                <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">

                    <article className="mx-auto w-full max-w-3xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                        <Link to={`/guest`}><Button variant='outlined' color='green'>Back to home</Button></Link>
                        <header className=" mt-4 mb-4 lg:mb-6 not-format">
                            <address className="flex items-center mb-6 mt-3 not-italic">
                                <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                                    <img className="mr-4 w-16 h-16 rounded-full" src={contribution?.author.avatar} alt="Jese Leos" />
                                    <div className="mt-4" >
                                        <Typography className="text-xl font-bold text-gray-900 dark:text-white">{contribution?.author.firstName} {contribution?.author.lastName}</Typography>
                                    </div>
                                </div>
                            </address>
                            <Typography variant='h5'>{contribution?.title}</Typography>


                        </header>
                        <div className="border border-gray-900 rounded-sm p-2" >
                            <div className="grid gap-5">
                                <div>
                                    <img
                                        className="h-auto w-full max-w-full rounded-lg object-cover object-center md:h-[480px]"
                                        src={active}
                                        alt=""
                                    />
                                </div>
                                <div className="grid grid-cols-5 gap-4">
                                    {images?.map(({ img }, index) => (
                                        <div key={index}>
                                            <img
                                                onClick={() => setActive(img)}
                                                src={img}
                                                className="h-20 max-w-full cursor-pointer rounded-lg object-cover object-center"
                                                alt=""
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <Preview value={contribution?.content} className="text" />

                        </div>

                        <section className="not-format">
                            <div className="flex justify-between items-center mb-6 mt-4">
                                <div>
                                    <h3 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white">Some attachments for my contribution</h3>
                                    {contribution?.file.length > 0 && (
                                        <div className="space-y-2 mt-4">
                                            {contribution?.file?.map((file, index) => (
                                                <div
                                                    className="flex items-center justify-between mt-2 p-3 w-[500px] bg-sky-100 border border-gray-900 text-sky-700 rounded-md ml-3 bg-blue-200 cursor-pointer hover:bg-blue-300 transition-all duration-300 ease-in-out"
                                                >
                                                    <div className='flex items-center'>
                                                        <File className="h-4 w-4 mr-2 flex-shrink-0" />
                                                        <Typography variant='h6'>{file.split('/').pop()}</Typography>
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
                                </div>
                            </div>
                        </section>

                        <section className="not-format">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white">Discussion ({comments?.length})</h3>
                            </div>

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
                            <div className='flex justify-center'>
                                {comments?.length !== 0 ? (
                                    <DefaultPagination totalPages={Math.ceil(comments?.length / commentsPerPage)} paginate={paginate} />
                                )
                                    : <Typography>No comments</Typography>
                                }
                            </div>
                        </section>
                    </article>
                </div>
            </main>

        </>
    )
}
