import { useDispatch, useSelector } from "react-redux";
import NavbarDefault from "../../../../components/navbar";
import DefaultSidebar from "../../../../components/sidebar";
import { deleteFaculty, getAllEventsByFaculty, getOneFaculty } from "../../../../redux/apiRequest";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { format } from "date-fns";


export const FacultyDetail = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const faculty = useSelector((state) => state.faculty.faculty.currentFaculty);
  const eventInFaculty = useSelector((state) => state.faculty.getEventsByFaculty.filterEvent)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    if (user && user.accessToken) {
      dispatch(getOneFaculty(id, user.accessToken));
    }
  }, [dispatch, id, user]);
  useEffect(() => {
    if (user) {
      dispatch(getAllEventsByFaculty(id, user.accessToken))
    }
  }, [user, id, dispatch])
  const detail = faculty?.Faculty
  const eventData = eventInFaculty?.events
  console.log(eventData)
  const handleDelete = () => {
    const confirmation = window.confirm("Are you sure you want to delete this faculty?");
    if (confirmation) {
      dispatch(deleteFaculty(id, user?.accessToken, navigate));
    }
  };
  console.log(faculty)
  return (
    <>
      <NavbarDefault />
      <div className="flex">
        <DefaultSidebar />
        <div className="mt-2.5 ml-5 w-full">
          {faculty && (
            <Card className="mt-5">
              <CardHeader
                variant="gradient"
                color="gray"
                className="mb-4 grid h-28 place-items-center"
              >
                <Typography variant="h3" color="white">
                  {detail?.facultyName}
                </Typography>
              </CardHeader>
              <Typography variant="h5" className="ml-3">
                Enroll Key: {detail?.enrollKey}
              </Typography>
              <Typography variant="h5" className="ml-3">
                Description: {detail?.descActive}
              </Typography>
              <Typography variant="h5" className="ml-3">
                Manage by: {detail?.marketingCoordinator?.userName}
              </Typography>
              <CardFooter>
                <Link to="/admin/faculty">
                  <Button>Back to List</Button>
                </Link>
                <Link to={`/admin/faculty/${id}/edit`}>
                  <Button className="ml-3">Edit</Button>
                </Link>
                <Button className="ml-3" onClick={handleDelete}>Delete</Button>
              </CardFooter>
            </Card>
          )}
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
                </tr>
              </thead>
              <tbody>
                {eventData ? (
                  eventData && eventData.length > 0 ? (
                    eventData.map((detail, index) => (

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

