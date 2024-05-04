import { useDispatch, useSelector } from "react-redux";
import NavbarDefault from "../../../components/navbar";
import DefaultSidebar from "../../../components/sidebar";
import { getAllEvents } from "../../../redux/apiRequest";
import { useEffect, useState } from "react";
import { Button, Card, CardFooter, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { IconButton } from "@material-tailwind/react";
import { PenLine, Settings } from 'lucide-react';
import { TablePagination } from "../../../components/manage/edit-pagination";

export const Event = () => {
  const events = useSelector((state)=>state.event.events.allEvents)
  const user = useSelector((state)=>state.auth.login?.currentUser) 
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 5;
  const details = events?.events;
  const currentItems = details?.slice((currentPage - 1) * eventsPerPage, currentPage * eventsPerPage);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      dispatch(getAllEvents(user.accessToken, dispatch));
    }
  }, [user, dispatch]);
  
  console.log(details)
  return (
    <>
      <NavbarDefault />
      <div className="flex">
        <DefaultSidebar className="flex" />
        <div className="ml-5 w-full">
          <Button className="mt-2.5 mb-2.5 mt-8" color="green">
            <Link to="/admin/event/add">Create new</Link>
          </Button>
          <Typography variant="h3" className="mb-2">Events</Typography>
          <Card className="h-full w-full">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      Topic
                    </Typography>
                  </th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      Closure Date
                    </Typography>
                  </th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      Final Date
                    </Typography>
                  </th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      Faculty
                    </Typography>
                  </th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70 text-center"
                    >
                      Action
                    </Typography>
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems ? (
                  currentItems && currentItems?.length > 0 ? (
                    currentItems?.map((detail, index) => (
                      
                        <tr key={index}>
                          
                        <td className="p-4 border-b border-blue-gray-50 cursor-pointer hover:bg-gray-100">
                        <Link to={`/admin/event/${detail?._id}`}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {detail?.topic}
                          </Typography>
                          </Link>
                        </td>
                        
                        <td className="p-4 border-b border-blue-gray-50">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {format(detail?.closureDate, 'MMMM dd,yyyy')}
                          </Typography>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {format(detail?.finalDate, 'MMMM dd,yyyy')}
                          </Typography>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {detail?.facultyId?.facultyName}
                          </Typography>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50 w-20">
                          <div className="flex gap-2 items-center">
                            <Link to={`/admin/event/${detail?._id}`}><IconButton variant="gradient" color="amber"> <Settings/></IconButton> </Link>
                            <Link to={`/admin/event/${detail?._id}/edit`}><IconButton color="red"> <PenLine/> </IconButton></Link>
                            </div>
                        </td>
                      </tr>
                      
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="p-4">
                        No events found
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
                <TablePagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    itemsPerPage={eventsPerPage}
                    totalItems={details}
                />
            </CardFooter>
          </Card>
        </div>
          </div>
    </>
  );
};
