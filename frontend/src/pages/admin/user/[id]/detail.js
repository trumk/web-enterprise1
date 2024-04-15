import { useDispatch, useSelector } from "react-redux";
import NavbarDefault from "../../../../components/navbar";
import DefaultSidebar from "../../../../components/sidebar";
import { getAllUsers } from "../../../../redux/apiRequest";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { createAxios } from "../../../../redux/createInstance";
import { loginSuccess } from "../../../../redux/authSlice";

export const UserDetail = () => {
  const userId = useParams().userId;
  const users = useSelector((state) => state.user.users?.allUsers);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const axiosJWT = createAxios(user, dispatch, loginSuccess);

  useEffect(() => {
    if (user) {
      dispatch(getAllUsers(user.accessToken, axiosJWT));
    }
  }, [user, dispatch]);

  console.log(userId)
  const selectedUser = users?.find((u) => u?._id === userId);

  return (
    <>
      <NavbarDefault />
      <div className="flex">
        <DefaultSidebar />
        <div className="mt-2.5 ml-5 w-full">
          {selectedUser && (
            <Card className="mt-5">
              <CardHeader
                variant="gradient"
                color="gray"
                className="mb-4 grid h-28 place-items-center"
              >
                <Typography variant="h3" color="white">
                  {selectedUser.userName}
                </Typography>
              </CardHeader>
              <Typography
                variant="h5"
                color="blue-gray"
                className="mb-2 font-medium ml-5"
              >
                Email: {selectedUser.email}
              </Typography>
              <Typography
                variant="h5"
                color="blue-gray"
                className="font-medium ml-5"
              >
                Role: {selectedUser.role}
              </Typography>
              <CardFooter>
                <Link to="/admin/user">
                  <Button>Back to List</Button>
                </Link>
                <Link to= {`/admin/user/${userId}/edit`}
                className="pl-2.5">
                  <Button>Edit</Button>
                </Link>
              </CardFooter>
            </Card>
          )}
          
        </div>
      </div>
    </>
  );
};
