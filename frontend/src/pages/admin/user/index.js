import { useDispatch, useSelector } from "react-redux";
import NavbarDefault from "../../../components/navbar";
import DefaultSidebar from "../../../components/sidebar";
import { getAllUsers } from "../../../redux/apiRequest";
import { useEffect } from "react";
import { Button, Card, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { IconButton } from "@material-tailwind/react";
import { Info, PenLine } from "lucide-react";

export const User = () => {
  const users = useSelector((state) => state.user.users.allUsers);
  const user = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(getAllUsers(user.accessToken));
    }
  }, [user, dispatch]);

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
                {users ? (
                  users.map((user, index) => (
                    <tr key={index}>
                      <td className="p-4 border-b border-blue-gray-50 cursor-pointer hover:bg-gray-100">
                      <Link to={`/admin/user/${user._id}`}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {user.userName}
                          </Typography>
                        </Link>
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
                      <td className="p-4 border-b border-blue-gray-50">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {user.role}
                        </Typography>
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
