import React, { useEffect, useState } from 'react'
import {
  Typography,
  Card,
  Badge,
  IconButton,
  CardBody,
  CardFooter,
  Button
} from '@material-tailwind/react'
import { useDispatch, useSelector } from 'react-redux'
import NavbarDefault from '../../components/navbar';
import DefaultSidebar from '../../components/sidebar';
import { getContributionsByUser, removeContribution } from '../../redux/apiRequest';
import { Link } from 'react-router-dom';
import { Book, Info, Settings, Trash } from 'lucide-react';

export const MyContributionPage = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const userContribution = useSelector((state) => state.contribution.userContributions?.contributions)
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [contributionsPerPage, setContributionsPerPage] = useState(4);

  const totalPages = Math.ceil(userContribution?.length / contributionsPerPage);

  const currentItems = userContribution?.slice((currentPage - 1) * contributionsPerPage, currentPage * contributionsPerPage);

  const goToNextPage = () => {
    setCurrentPage((page) => page + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((page) => page - 1);
  }; 

  useEffect(() => {
    if (user) {
      dispatch(getContributionsByUser(user.accessToken))
    }
  }, [user, dispatch])

  const handleDelete = (contributionId) => {
    const confirmation = window.confirm(`Are you sure you want to delete this contribution?`);
    if(confirmation) {
      dispatch(removeContribution(contributionId, user?.accessToken))
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }

  console.log(userContribution)
  return (
    <>
      <NavbarDefault />
      <div className="flex">
        <DefaultSidebar className="flex" />
        <div className="ml-5 w-full h-full">
          <div className="mt-10">
            <Typography variant='h4'>My Contribution</Typography>
            <Typography variant='h6'>Here are the contributions you have made</Typography>
            <Card className="h-full w-full mt-5">
              <CardBody>
                <table className="w-full min-w-max table-auto text-left">
                  <thead>
                    <tr>
                      <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          Title
                        </Typography>
                      </th>
                      <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          Image
                        </Typography>
                      </th>
                      <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          Published
                        </Typography>
                      </th>
                      <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          Actions
                        </Typography>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {userContribution ? (
                      userContribution && userContribution.length > 0 ? (
                        currentItems.map((contribution, index) => (

                          <tr key={index}>

                            <td className="p-4 border-b border-blue-gray-50 cursor-pointer hover:bg-gray-100">
                              <Link to={`/admin/contribution/${contribution?._id}`}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {contribution?.title}
                                </Typography>
                              </Link>
                            </td>

                            <td className="p-4 border-b border-blue-gray-50">
                              {Array.isArray(contribution?.image) && contribution.image.length > 0 && (
                                <img src={contribution?.image[0]} alt="contribution" className='h-[80px]' />
                              )}

                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                              <Badge
                                className='w-[100px]'
                                content={contribution?.isPublic === true ? "Published" : "Not Published"}
                                color={contribution?.isPublic === true ? "green" : "red"}

                              />
                            </td>
                            <td className="p-4 border-b border-blue-gray-50 w-20">
                              <div className="flex gap-2 items-center">
                                <Link to={`/myContribution/${contribution._id}/detail`}><IconButton variant="gradient" color="blue"><Book/></IconButton></Link>
                                <Link to={`/myContribution/${contribution._id}/edit`}><IconButton variant="gradient" color="amber"> <Settings/> </IconButton></Link>
                                <IconButton color="red" onClick={()=> handleDelete(contribution._id)}> <Trash /> </IconButton>
                              </div>
                            </td>
                          </tr>

                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="p-4">
                            No contributions found
                          </td>
                        </tr>
                      )
                    ) : (
                      <tr>
                        <td colSpan={4} className="p-4">
                          Loading...
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </CardBody>
              <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  Page {currentPage} of {totalPages}
                </Typography>
                <div className="flex gap-2">
                  <Button
                    onClick={goToPreviousPage}
                    variant="outlined"
                    size="sm"
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={goToNextPage}
                    variant="outlined"
                    size="sm"
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
