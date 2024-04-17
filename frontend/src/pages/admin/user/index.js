import { useDispatch, useSelector } from "react-redux";
import NavbarDefault from "../../../components/navbar";
import DefaultSidebar from "../../../components/sidebar";
import { getAllUsers, setRole } from "../../../redux/apiRequest";
import { useEffect, useState } from "react";
import { Card, Option, Select, Typography } from "@material-tailwind/react";
import { createAxios } from "../../../redux/createInstance";
import { loginSuccess } from "../../../redux/authSlice";

export const User = () => {
  const users = useSelector((state) => state.user.users.allUsers);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const [updatedRole] = useState("");
  const dispatch = useDispatch();
  const axiosJWT = createAxios(user, dispatch, loginSuccess);

  useEffect(() => {
    if (user) {
      dispatch(getAllUsers(user?.accessToken, axiosJWT));
    }
  }, [user, dispatch]);

  const handleRoleChange = (newRole, userId) => {
    if (userId) {
        const roleUser = {
            role: newRole,
        };
        dispatch(setRole(userId, roleUser, user?.accessToken, axiosJWT));
        window.location.reload();
    } else {
        console.warn("No user selected. Cannot change role.");
    }
};

  const filteredUsers = users?.filter((user) => user.role !== "admin");
  return (
    <>
      <NavbarDefault />
      <div className="flex">
        <DefaultSidebar className="flex" />
        <div className="ml-5 w-full">
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
                      Username
                    </Typography>
                  </th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      Email
                    </Typography>
                  </th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      Role
                    </Typography>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers ? (
                  filteredUsers.map((user, index) => (
                    <tr onClick={() => {}} key={user._id}>
                      <td className="p-4 border-b border-blue-gray-50">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {user.userName}
                        </Typography>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {user.email}
                        </Typography>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50 w-32">
                        <Select
                          name="role"
                          value={updatedRole || user.role}
                          onChange={(value) =>
                            handleRoleChange(value, user._id)
                          }
                          className="border-b border-blue-gray-400 px-4 py-2"
                        >
                          <Option value="">Select Role</Option>
                          <Option value="marketing manager">
                            Marketing Manager
                          </Option>
                          <Option value="marketing coordinator">
                            Marketing Coordinator
                          </Option>
                          <Option value="user">User</Option>
                          <Option value="guest">Guest</Option>
                        </Select>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="p-4">
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
