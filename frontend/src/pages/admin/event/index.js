import { useDispatch, useSelector } from "react-redux";
import NavbarDefault from "../../../components/navbar";
import DefaultSidebar from "../../../components/sidebar";
import { getAllEvents } from "../../../redux/apiRequest";
import { useEffect } from "react";
import { Button, Card, Option, Select, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

export const Event = () => {
  const events = useSelector((state)=>state.event.events.allEvents)
  const user = useSelector((state)=>state.auth.login?.currentUser) 
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      dispatch(getAllEvents(user.accessToken, dispatch));
    }
  }, [user, dispatch]);
  const details = events.events;
  console.log(details)
  
  return (
    <>
      <NavbarDefault />
      <div className="flex">
        <DefaultSidebar className="flex" />
        <div className="ml-5 w-full">
          <Button className="mt-2.5 mb-2.5">
            <Link to="/admin/event/add">Create new</Link>
          </Button>
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
                      className="font-normal leading-none opacity-70"
                    >
                      Action
                    </Typography>
                  </th>
                </tr>
              </thead>
              <tbody>
                {details ? (
                  details && details.length > 0 ? (
                    details.map((detail, index) => (
                      
                        <tr key={index}>
                          
                        <td className="p-4 border-b border-blue-gray-50 cursor-pointer hover:bg-gray-100">
                        <Link to={`/admin/event/${detail._id}`}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {detail.topic}
                          </Typography>
                          </Link>
                        </td>
                        
                        <td className="p-4 border-b border-blue-gray-50">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {format(detail.closureDate, 'MMMM dd,yyyy')}
                          </Typography>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {format(detail.finalDate, 'MMMM dd,yyyy')}
                          </Typography>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {detail.facultyId.facultyName}
                          </Typography>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50 w-20">
                          <Select label="Select action below">
                            <Option> <Link to={`/admin/event/${detail._id}`}> Detail </Link></Option>
                            <Option><Link to={`/admin/event/${detail._id}/edit`}> Edit </Link></Option>
                            </Select>
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
          </Card>
        </div>
          </div>
    </>
  );
};
