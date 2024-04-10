import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavbarDefault from "../../../../components/navbar";
import DefaultSidebar from "../../../../components/sidebar";
import { getSelf, setRole } from "../../../../redux/apiRequest";
import { useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

export const EditUser = () => {
  const { userId } = useParams();
  const [updatedRole, setUpdatedRole] = useState(""); 
  const users = useSelector((state) => state.user.users.allUsers);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();


  const selectedUser = users.find((u) => u._id === userId);

  const handleChange = (e) => {
    const { value } = e.target;
    setUpdatedRole(value); 
  };

  const handleSave = () => {
    dispatch(setRole(userId, updatedRole, user.accessToken)); 
  };

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
                  Edit User: {selectedUser.userName}
                </Typography>
              </CardHeader>
              <div className="flex flex-col gap-4">
                <Typography
                  variant="h5"
                  color="blue-gray"
                  className="mb-2 font-medium ml-2.5"
                >
                  Current Role: {selectedUser.role}
                </Typography>
                <select
                  name="role"
                  value={updatedRole || selectedUser.role}
                  onChange={handleChange}
                  className="border-b border-blue-gray-400 px-4 py-2 focus:outline-none focus:border-indigo-500"
                >
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="marketing manager">Marketing Manager</option>
                  <option value="marketing coordinator">Marketing Coordinator</option>
                  <option value="student">Student</option>
                  <option value="user">User</option>
                  <option value="guest">Guest</option>
                </select>
              </div>
              <CardFooter>
                <Button onClick={handleSave}>Save</Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </>
  );
};
