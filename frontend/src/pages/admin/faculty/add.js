import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFaculty, getAllUsers } from "../../../redux/apiRequest";
import { useNavigate } from "react-router-dom";
import NavbarDefault from "../../../components/navbar";
import DefaultSidebar from "../../../components/sidebar";
import { Button, Input, Option, Select, Typography } from "@material-tailwind/react";

const AddFaculty = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const users = useSelector((state) => state.user.users?.allUsers);
  const [facultyName, setFacultyName] = useState("");
  const [descActive, setDescActive] = useState("");
  const [enrollKey, setEnrollKey] = useState("");
  const [marketingCoordinator, setMarketingCoordinator] = useState("");
  const filteredUsers = users.filter(user => {
    return user.role==="user";
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.accessToken) {
      dispatch(getAllUsers(user.accessToken));
    }
  }, [user, dispatch]);
  
  console.log(users);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const faculty = {
      facultyName: facultyName,
      enrollKey: enrollKey,
      descActive: descActive,
      userID: marketingCoordinator,
    };
    console.log(faculty)
    try {
      await dispatch(addFaculty(faculty, user.accessToken, navigate));
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <>
      <NavbarDefault />
      <div className="flex">
        <DefaultSidebar />
        <div className="mt-2.5 ml-5 w-full">
          <h1 className="text-3xl font-bold mb-4">Add Faculty</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Typography className="block text-md font-medium text-gray-700">
                Faculty Name:
              </Typography>
              <Input
                type="text"
                value={facultyName}
                onChange={(e) => setFacultyName(e.target.value)}
                className="mt-1 p-2 border border-gray-400 rounded-md w-full"
                required
              />
            </div>
            <div className="mb-4">
              <Typography className="block text-md font-medium text-gray-700">
                Enroll Key:
              </Typography>
              <Input
                type="text"
                value={enrollKey}
                onChange={(e) => setEnrollKey(e.target.value)}
                className="mt-1 p-2 border border-gray-400 rounded-md w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-md font-medium text-gray-700">
                Description:
              </label>
              <Input
                type="text"
                value={descActive}
                onChange={(e) => setDescActive(e.target.value)}
                className="mt-1 p-2 border border-gray-400 rounded-md w-full"
                required
              />
            </div>
            <div className="mb-4">
              <Typography className="block text-md font-medium text-gray-700">
                Set Marketing Coordinator
              </Typography>
              <Select
                value={marketingCoordinator}
                onChange={(value) => setMarketingCoordinator(value)}
                required
              >
                {filteredUsers.map((user) => (
                  <Option key={user._id} value={user._id}>
                    {user.userName}
                  </Option>
                ))}
              </Select>
            </div>
            <Button
              type="submit"
              className="bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={handleSubmit}
            >
              Add Faculty
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddFaculty;
