import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavbarDefault from "../../../../components/navbar";
import DefaultSidebar from "../../../../components/sidebar";
import { setRole } from "../../../../redux/apiRequest";
import { useParams } from "react-router-dom";
import {
  Button,
  Card,
  Input,
  CardHeader,
  CardFooter,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export const EditUser = () => {
  const { userId } = useParams();
  const [updatedRole, setUpdatedRole] = useState("");
  const users = useSelector((state) => state.user.users.allUsers);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedUser = users.find((u) => u._id === userId);

  console.log(updatedRole);
  console.log(userId);
    
  const handleSave = () => {
    const roleUser = {
      role: updatedRole,
    };
    dispatch(setRole(userId, roleUser, user.accessToken, navigate));
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
                <div className="w-[200px]">
                  <Select
                    name="role"
                    value={updatedRole || selectedUser.role}
                    onChange={(value) => setUpdatedRole(value)}
                    className="border-b border-blue-gray-400 px-4 py-2 focus:outline-none focus:border-indigo-500"
                  >
                    <Option value="">Select Role</Option>
                    <Option value="marketing manager">Marketing Manager</Option>
                    <Option value="marketing coordinator">
                      Marketing Coordinator
                    </Option>
                    <Option value="student">User</Option>
                    <Option value="guest">Guest</Option>
                  </Select>
                </div>
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
