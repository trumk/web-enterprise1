import React, { useEffect, useState } from 'react'
import NavbarDefault from '../../../components/navbar'
import DefaultSidebar from '../../../components/sidebar'
import { useDispatch, useSelector } from "react-redux";
import { getAllContributions } from '../../../redux/apiRequest';
import { Badge, Button, Card, CardFooter, Typography } from "@material-tailwind/react";
import { IconButton } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import { Info, Trash } from 'lucide-react';


export const Contribution = () => {
  const contributions = useSelector((state) => state.contribution.contributions.allContributions)
  const user = useSelector((state) => state.auth.login?.currentUser)
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1);
  const [contributionsPerPage, setContributionsPerPage] = useState(4);

  const totalPages = Math.ceil(contributions?.length / contributionsPerPage);

  const currentItems = contributions?.slice((currentPage - 1) * contributionsPerPage, currentPage * contributionsPerPage);

  const goToNextPage = () => {
    setCurrentPage((page) => page + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((page) => page - 1);
  };
  useEffect(() => {
    if (user) {
      dispatch(getAllContributions(user.accessToken, dispatch))
    }
  }, [user, dispatch])
  console.log(contributions)

  return (
    <>
      <NavbarDefault />
      <div className="flex">
        <DefaultSidebar />
        <div className='ml-5 w-full'>
          <Card className="h-full w-full mt-5">
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
                      User
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
                {contributions ? (
                  contributions && contributions.length > 0 ? (
                    currentItems.map((contribution, index) => (

                      <tr key={index}>

                        <td className="p-4 border-b border-blue-gray-50 cursor-pointer hover:bg-gray-100">
                          <Link to={`/admin/contribution/${contribution._id}`}>
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
                        {Array.isArray(contribution.image) && contribution.image.length > 0 && (
                            <img src={contribution.image[0]} alt="contribution" className='h-[80px]'/>
                          )}

                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <Badge 
                          className='w-[100px]'
                            content={contribution.isPublic === true ? "Published" : "Not Published"}
                            color={contribution.isPublic === true ? "green" : "red"}

                          />
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {contribution?.userID.userName}
                          </Typography>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50 w-20">
                          <div className="flex gap-2 items-center">
                            <IconButton variant="gradient" color="amber"><Link to={`/admin/contribution/${contribution._id}`}> <Info /> </Link></IconButton>
                          </div>
                        </td>
                      </tr>

                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="p-4">
                        No contribution found
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
    </>
  )
}
