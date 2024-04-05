import { useDispatch, useSelector } from "react-redux";
import NavbarDefault from "../../../../components/navbar";
import DefaultSidebar from "../../../../components/sidebar";
import { deleteEvent, getOneEvent, getOneFaculty } from "../../../../redux/apiRequest";
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


export const EventDetail = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const event = useSelector((state) => state.event.event.currentEvent);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    if (user && user.accessToken) {
      dispatch(getOneEvent(id, user.accessToken));
    }
  }, [dispatch, id, user]);
  const detail = event.Event;
  console.log(detail.facultyId.facultyName)
  return (
    <>
      <NavbarDefault />
      <div className="flex">
        <DefaultSidebar />
        <div className="mt-2.5 ml-5 w-full">
          {Event && (
            <Card className="mt-5">
              <CardHeader
                variant="gradient"
                color="gray"
                className="mb-4 grid h-28 place-items-center"
              >
                <Typography variant="h3" color="white">
                  {detail.topic}
                </Typography>
              </CardHeader>
              <Typography variant="h6" className="ml-3">
                Topic: {detail.content}
              </Typography>
              <Typography variant="h6" className="ml-3">
                Closure Date: {format(detail.closureDate, 'MMMM dd,yyyy')}
              </Typography>
              <Typography variant="h6" className="ml-3">
                Final Date: {format(detail.finalDate, 'MMMM dd,yyyy')}
              </Typography>
              <Typography variant="h6" className="ml-3">
                Create Date: {format(detail.createEvent, 'MMMM dd,yyyy')}
              </Typography>
              <Typography variant="h6" className="ml-3">
              Faculty: {detail.facultyId.facultyName}
              </Typography>
              <CardFooter>
                <Link to="/admin/event">
                  <Button>Back to List</Button>
                </Link>
                <Link to={`/admin/event/${id}/edit`}> 
                <Button className="ml-3">Edit</Button> 
                </Link>
                <Button className="ml-3" onClick={()=>{}}>Delete</Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

