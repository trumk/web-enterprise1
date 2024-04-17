import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import NavbarDefault from '../../components/navbar';
import DefaultSidebar from '../../components/sidebar';
import { getAllContributions } from '../../redux/apiRequest';
import { format } from 'date-fns';
import { Button, Typography } from '@material-tailwind/react';
import { ArrowBigLeft, ArrowRight } from 'lucide-react';

export const ContributionsDashboard = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const contributionData = useSelector((state) => state.contribution.contributions?.allContributions);
  const dispatch = useDispatch();
  useEffect(()=> {
    if(user) {
      dispatch(getAllContributions(user.accessToken, dispatch));
    }
  }, [user, dispatch]);
  console.log(contributionData);
  return (
    <>
      <NavbarDefault />
      <div className="flex">
        <DefaultSidebar className="flex" />
        <div className="ml-5 w-full">
          <Typography variant='h2' className="font-bold text-purple-600">Explore some interesting contributions</Typography>
          {
            contributionData?.map((contribution, index) => (
              <div class="bg-purple-100 px-2 py-1">
                <article class="mx-auto my-2 flex max-w-md flex-col rounded-2xl bg-white px-4 shadow md:max-w-5xl md:flex-row md:items-center">
                  <div class="shrink-0 my-4 md:mr-8 md:max-w-sm">
                    <img class="rounded-2xl h-64 w-96 object-cover" src={contribution?.image[0]} alt="" />
                  </div>
                  <div class="py-4 sm:py-8">
                    <a href="#" class="mb-6 block text-2xl font-medium text-gray-700">{contribution?.title}</a>
                    <p class="mb-6 text-gray-500">From: {contribution.eventID.topic}</p>
                    <div class="flex items-center">
                      <img class="h-10 w-10 rounded-full object-cover" src={contribution.author.avatar} alt="Simon Lewis" />
                      <p class="ml-4 w-56">
                      <Typography class="block font-bold text-gray-700">{contribution.author.firstName} {contribution.author.lastName}</Typography>
                        <Typography class="text-sm text-gray-400">{format(contribution?.createdAt, 'MMMM dd,yyyy')}</Typography>
                      </p>
                    </div>
                    <Button variant='text' className='mt-4 flex items-center gap-2'>Read More <ArrowRight className="h-4"/></Button>
                  </div>
                </article>
              </div>
          ))}
          
        </div>
      </div>
    </>
  )
}
