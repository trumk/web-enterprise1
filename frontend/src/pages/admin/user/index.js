import { useDispatch, useSelector } from "react-redux";
import NavbarDefault from "../../../components/navbar";
import DefaultSidebar from "../../../components/sidebar";
import { getAllUsers, getSelf, setRole } from "../../../redux/apiRequest";
import { useEffect, useState } from "react";
import { Button, Card, CardFooter, Option, Select, Typography } from "@material-tailwind/react";
import { TablePagination } from "../../../components/manage/edit-pagination";

export const User = () => {
  const users = useSelector((state) => state.user.users.allUsers);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const [isEditingId, setIsEditingId] = useState(false);
  const [newRole, setNewRole] = useState(null);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const filteredUsers = users?.filter((user) => user.role !== "admin" && user.role !== "guest");
  const currentItems = filteredUsers?.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);
  const handleEditClick = (id) => {
    setIsEditingId(id);
  };
  const handleSaveClick = (newRole, id) => {
    if (id) {
      const roleUser = {
        role: newRole,
      };
      dispatch(setRole(id, roleUser, user?.accessToken));
    }
    setIsEditingId(null);
    window.location.reload();
  };
  useEffect(() => {
    if (user) {
      dispatch(getAllUsers(user?.accessToken));
    }
  }, [user, dispatch]);

  return (
    <>
      <NavbarDefault />
      <div className="flex">
        <DefaultSidebar className="flex" />
        <div className="ml-5 w-full">
          <Typography variant="h3" className="mb-5">
            Users
          </Typography>
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
                {currentItems ? (
                  currentItems && currentItems?.length > 0 ? (
                    currentItems?.map((user, index) => (
                      <tr onClick={() => { }} key={user._id}>
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
                        <td className="p-4 border-b border-blue-gray-50 w-80">
                          {isEditingId == user._id ? (
                            <div className="flex items-center gap-2">
                              <Select
                                name="role"
                                value={newRole || user.role}
                                onChange={(value) => setNewRole(value)}
                                className="border-b border-blue-gray-400 px-4 py-2"
                              >
                                <Option value="">Select Role</Option>
                                <Option value="marketing manager">Marketing Manager</Option>
                                <Option value="marketing coordinator">Marketing Coordinator</Option>
                                <Option value="user">User</Option>
                                <Option value="guest">Guest</Option>
                              </Select>
                              <Button color="amber" onClick={() => handleSaveClick(newRole, user._id)}>Save</Button>
                            </div>
                          ) : (
                            <Typography className="cursor-pointer" onClick={() => handleEditClick(user._id)}>{user.role}</Typography>
                          )}
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
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
              <TablePagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                itemsPerPage={usersPerPage}
                totalItems={filteredUsers}
                />
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};
