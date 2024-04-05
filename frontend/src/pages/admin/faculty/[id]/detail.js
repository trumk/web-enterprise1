import { useDispatch, useSelector } from "react-redux";
import NavbarDefault from "../../../../components/navbar";
import DefaultSidebar from "../../../../components/sidebar";
import { deleteFaculty, getOneFaculty } from "../../../../redux/apiRequest";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";


export const FacultyDetail = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const faculty = useSelector((state) => state.faculty.faculty.currentFaculty);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    if (user && user.accessToken) {
      dispatch(getOneFaculty(id, user.accessToken));
    }
  }, [dispatch, id, user]);
  const detail = faculty?.Faculty
  console.log(id)
  const handleDelete = () => {
    const confirmation = window.confirm("Are you sure you want to delete this faculty?");
    if (confirmation) {
      dispatch(deleteFaculty(id, user.accessToken, navigate)); 
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
                  {detail.facultyName}
                </Typography>
              </CardHeader>
              <Typography variant="h5" className="ml-3">
                Enroll Key: {detail.enrollKey}
              </Typography>
              <Typography variant="h5" className="ml-3">
                Description: {detail.descActive}
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
        </div>
      </div>
    </>
  );
};

