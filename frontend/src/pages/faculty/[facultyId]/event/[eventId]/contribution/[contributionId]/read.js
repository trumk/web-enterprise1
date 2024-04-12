import { Button, Textarea, Typography } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getOneContribution, allContributionsByEventData } from '../../../../../../../redux/apiRequest'
import NavbarDefault from '../../../../../../../components/navbar'
import { Preview } from '../../../../../../../components/manage/preview'

export const ReadContribution = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const { contributionId } = useParams();
  const contribution = useSelector((state) => state.contribution.contribution?.currentContribution);
  const dispatch = useDispatch();
  const [active, setActive] = useState('');
  const event = useSelector((state) => state.event.event?.currentEvent);
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
  const images = contribution?.image.map(image => ({ img: image }))
  console.log(event.Event?._id, contribution?._id, contributionId)
  return (
    <>
      <NavbarDefault />
      <main class="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
        <div class="flex justify-between px-4 mx-auto max-w-screen-xl ">
          <article class="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <header class="mb-4 lg:mb-6 not-format">
              <address class="flex items-center mb-6 not-italic">
                <div class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                  <img class="mr-4 w-16 h-16 rounded-full" src={contribution?.author.avatar} alt="Jese Leos" />
                  <div>
                    <a href="#" rel="author" class="text-xl font-bold text-gray-900 dark:text-white">{contribution?.author.firstName} {contribution?.author.lastName}</a>
                    <p class="text-base text-gray-500 dark:text-gray-400"><time pubdate datetime="2022-02-08" title="February 8th, 2022">Feb. 8, 2022</time></p>
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
            <Preview value={contribution?.content} className="text-md"/>
            <section class="not-format">
              <div class="flex justify-between items-center mb-6">
                <h2 class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Discussion (20)</h2>
              </div>
              <form class="mb-6">
                <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                  <label for="comment" class="sr-only">Your comment</label>
                  <Textarea label="Post your opinion" />
                </div>
                <Button type="submit"
                  class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                  Post comment
                </Button>
              </form>
              <article class="p-6 mb-6 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                  <footer class="flex justify-between items-center mb-2">
                      <div class="flex items-center">
                          <p class="inline-flex items-center mr-3 font-semibold text-sm text-gray-900 dark:text-white"><img
                                  class="mr-2 w-6 h-6 rounded-full"
                                  src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                                  alt="Bonnie Green"/>Bonnie Green</p>
                      </div>
                  </footer>
                  <p>The article covers the essentials, challenges, myths and stages the UX designer should consider while creating the design strategy.</p>
                  <div class="flex items-center mt-4 space-x-4">
                  </div>
              </article>
            </section>
          </article>
        </div>
      </main>

      <aside aria-label="Related articles" class="py-8 lg:py-24 bg-gray-50 dark:bg-gray-800">
        <div class="px-4 mx-auto max-w-screen-xl">
          <h2 class="mb-8 text-2xl font-bold text-gray-900 dark:text-white">Related articles</h2>
          <div class="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            <article class="max-w-xs">
              <a href="#">
                <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-1.png" class="mb-5 rounded-lg" alt="Image 1" />
              </a>
              <h2 class="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                <a href="#">Our first office</a>
              </h2>
              <p class="mb-4 text-gray-500 dark:text-gray-400">Over the past year, Volosoft has undergone many changes! After months of preparation.</p>
              <a href="#" class="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline">
                Read in 2 minutes
              </a>
            </article>
            <article class="max-w-xs">
              <a href="#">
                <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-2.png" class="mb-5 rounded-lg" alt="Image 2" />
              </a>
              <h2 class="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                <a href="#">Enterprise design tips</a>
              </h2>
              <p class="mb-4  text-gray-500 dark:text-gray-400">Over the past year, Volosoft has undergone many changes! After months of preparation.</p>
              <a href="#" class="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline">
                Read in 12 minutes
              </a>
            </article>
            <article class="max-w-xs">
              <a href="#">
                <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-3.png" class="mb-5 rounded-lg" alt="Image 3" />
              </a>
              <h2 class="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                <a href="#">We partnered with Google</a>
              </h2>
              <p class="mb-4  text-gray-500 dark:text-gray-400">Over the past year, Volosoft has undergone many changes! After months of preparation.</p>
              <a href="#" class="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline">
                Read in 8 minutes
              </a>
            </article>
            <article class="max-w-xs">
              <a href="#">
                <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-4.png" class="mb-5 rounded-lg" alt="Image 4" />
              </a>
              <h2 class="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                <a href="#">Our first project with React</a>
              </h2>
              <p class="mb-4  text-gray-500 dark:text-gray-400">Over the past year, Volosoft has undergone many changes! After months of preparation.</p>
              <a href="#" class="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline">
                Read in 4 minutes
              </a>
            </article>
          </div>
        </div>
      </aside>


      {/* //TODO: Read Contribution, with gallery images and comments */}

    </>
  )
}
