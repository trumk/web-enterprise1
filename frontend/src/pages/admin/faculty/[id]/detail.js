import { useDispatch, useSelector } from "react-redux";
import NavbarDefault from "../../../../components/navbar";
import DefaultSidebar from "../../../../components/sidebar";
import { getOneFaculty } from "../../../../redux/apiRequest";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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
  const { id } = useParams();
  useEffect(() => {
    if (user && user.accessToken) {
      dispatch(getOneFaculty(id, user.accessToken));
    }
  }, [dispatch, id, user]);
  const detail = faculty.Faculty;
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
              <Typography variant="h5" className="ml-1">
                Enroll Key: {detail.enrollKey}
              </Typography>
              <Typography variant="h5" className="ml-1">
                Description: {detail.descActive}
              </Typography>
              <CardFooter>
                <Link to="/admin/faculty">
                  <Button>Back to List</Button>
                </Link>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </>
  );
};
