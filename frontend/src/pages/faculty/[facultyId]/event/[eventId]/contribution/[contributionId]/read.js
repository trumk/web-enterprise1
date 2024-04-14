import { Avatar, Button, Textarea, Typography } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getOneContribution, allContributionsByEventData, commentContribution } from '../../../../../../../redux/apiRequest'
import NavbarDefault from '../../../../../../../components/navbar'
import { Preview } from '../../../../../../../components/manage/preview'
import { DefaultPagination } from '../../../../../../../components/manage/pagination'
import { format } from 'date-fns'
import { Download, File } from 'lucide-react'

export const ReadContribution = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const { facultyId, eventId, contributionId } = useParams();
  const [comment, setComment] = useState();
  const contribution = useSelector((state) => state.contribution.contribution?.currentContribution);
  const relatedContributions = useSelector((state) => state.contribution.getContributionsByEvent.contributions);
  const comments = contribution?.comments;
  const dispatch = useDispatch();
  const [active, setActive] = useState('');
  const event = useSelector((state) => state.event.event?.currentEvent);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5;

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments?.slice(indexOfFirstComment, indexOfLastComment);


  const paginate = pageNumber => setCurrentPage(pageNumber);
  useEffect(() => {
    if (user && user.accessToken) {
      dispatch(getOneContribution(contributionId, user.accessToken));
    }
  }, [dispatch, contributionId, user]);

  useEffect(() => {
    if (user && user.accessToken) {
      dispatch(allContributionsByEventData(event.Event?._id, user.accessToken));
    }
  }, [dispatch, user]);

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
  const filteredRelatedContributions = relatedContributions.filter(
    relatedContribution => relatedContribution._id !== contribution._id
  );
  console.log(relatedContributions)
  console.log(comments)
  return (
    <>
      <NavbarDefault />

      <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
        <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">

          <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <header className="mb-4 lg:mb-6 not-format">
              <Link to={`/faculty/${facultyId}/event/${eventId}`}><Button variant='outlined'>Back to event</Button></Link>
              <address className="flex items-center mb-6 mt-3 not-italic">
                <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                  <img className="mr-4 w-16 h-16 rounded-full" src={contribution?.author.avatar} alt="Jese Leos" />
                  <div>
                    <a href="#" rel="author" className="text-xl font-bold text-gray-900 dark:text-white">{contribution?.author.firstName} {contribution?.author.lastName}</a>
                  </div>
                </div>
              </address>
              <Typography variant='h3'>{contribution?.title}</Typography>
              <div className="grid gap-4">
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
                        alt="gallery-image"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </header>
            <Preview value={contribution?.content} className="text-md" />
            <section className="not-format">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Some attachments for my contribution</h2>
                  {contribution?.file.length > 0 && (
                    <div className="space-y-2">
                      {contribution?.file?.map((file, index) => (
                        <div
                          className="flex items-center justify-between mt-2 p-3 w-[500px] bg-sky-100 border border-gray-900 text-sky-700 rounded-md ml-3 bg-blue-200 cursor-pointer hover:bg-blue-300 transition-all duration-300 ease-in-out"
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
                </div>
              </div>
            </section>
            <section className="not-format">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Discussion ({comments?.length})</h2>
              </div>
              <form className="mb-6">
                <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">

                  <Textarea
                    label="Post your opinion"
                    onChange={(e) => setComment(e.target.value)}
                    required
                  />
                </div>
                <Button onClick={handleComment}
                >
                  Post comment
                </Button>
              </form>

              {currentComments?.map((comment) => (
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
              <div className='flex items-center'>
                {comments !== 0 && (
                  <DefaultPagination totalPages={Math.ceil(comments?.length / commentsPerPage)} paginate={paginate} />
                )

                }
              </div>
            </section>
          </article>
        </div>
      </main>

      <aside aria-label="Related articles" className="py-8 lg:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="px-4 mx-auto max-w-screen-xl">
          <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">Related contributions</h2>
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {filteredRelatedContributions?.slice(0, 4).map((relatedContribution, index) => (
              <article className="max-w-xs">
                <a href="#">
                  <img src={relatedContribution?.image[0]} className="mb-5 rounded-lg h-40" alt="Image 2" />
                </a>
                <h2 className="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                  <a href="#">{relatedContribution?.title}</a>
                </h2>
                <Typography>Posted at : {relatedContribution?.createdAt ? format(new Date(relatedContribution?.createdAt), 'MMMM dd, yyyy') : 'N/A'}</Typography>
                <p className="mb-4  text-gray-500 dark:text-gray-400"></p>
                <Link to={`/faculty/${facultyId}/event/${eventId}/contribution/${relatedContribution?._id}/read`} className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline">
                  Read this contribution
                </Link>
              </article>
            ))}
          </div>
        </div>
      </aside>

    </>
  )
}
