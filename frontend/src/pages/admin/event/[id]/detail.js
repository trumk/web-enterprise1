import { useDispatch, useSelector } from "react-redux";
import NavbarDefault from "../../../../components/navbar";
import DefaultSidebar from "../../../../components/sidebar";
import { deleteEvent, getOneEvent, deleteThisEvent } from "../../../../redux/apiRequest";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardFooter,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { format } from "date-fns";
import { Preview } from "../../../../components/manage/preview";


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
  console.log(detail)
  const handleDelete = () => {
    const confirmation = window.confirm(`Are you sure you want to delete ${detail.topic}?`);
    if (confirmation) {
      dispatch(deleteThisEvent(id, user.accessToken, navigate));
    }
  };
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
                  {detail?.topic}
                </Typography>
              </CardHeader>
              <CardBody className="">
                <Typography variant="h6" className="ml-3">
                  Content: 
                </Typography>
                <Preview value={detail?.content} />
                <Typography variant="h6" className="ml-3">
                  Closure Date: {detail?.closureDate ? format(new Date(detail?.closureDate), 'MMMM dd,yyyy') : 'N/A'}
                </Typography>
                <Typography variant="h6" className="ml-3">
                  Final Date: {detail?.finalDate ? format(new Date(detail?.finalDate), 'MMMM dd,yyyy') : 'N/A'}
                </Typography>
                <Typography variant="h6" className="ml-3">
                  Create Date: {detail?.createEvent ? format(new Date(detail?.createEvent), 'MMMM dd,yyyy') : 'N/A'}
                </Typography>
                <Typography variant="h6" className="ml-3">
                  Faculty: {detail?.facultyId.facultyName}
                </Typography>
              </CardBody>

              <CardFooter>
                <Link to="/admin/event">
                  <Button color="blue">Back to List</Button>
                </Link>
                <Link to={`/admin/event/${id}/edit`}>
                  <Button color="amber" className="ml-3">Edit</Button>
                </Link>
                <Button color="red" className="ml-3" onClick={handleDelete}>Delete</Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

