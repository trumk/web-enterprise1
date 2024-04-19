import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import NavbarDefault from "../../../../components/navbar";
import DefaultSidebar from "../../../../components/sidebar";
import { editFaculty, getAllUsers, getOneFaculty } from "../../../../redux/apiRequest";
import { toast } from "react-toastify";
import { Option, Select, Typography } from "@material-tailwind/react";

const EditFaculty = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const users = useSelector((state) => state.user.users?.allUsers);
  const { id } = useParams();
  const facultyData = useSelector((state) => state.faculty.faculty.currentFaculty);
  const msg = useSelector((state) => state.faculty?.msg);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [facultyName, setFacultyName] = useState("");
  const [descActive, setDescActive] = useState("");
  const [enrollKey, setEnrollKey] = useState("");
  const [marketingCoordinator, setMarketingCoordinator] = useState("");
  const filteredUsers = users.filter(user => {
    return user.role === 'user' || (user.role === 'marketing coordinator' && user._id === marketingCoordinator);
  });
  console.log(marketingCoordinator)
  useEffect(() => {
    if (user && user.accessToken) {
      dispatch(getAllUsers(user.accessToken));
    }
  }, [user, dispatch]);
  useEffect(() => {
    if (user && user.accessToken) {
      dispatch(getOneFaculty(id, user.accessToken));
    }
  }, [dispatch, id, user]);
  useEffect(() => {
    if (facultyData) {
      setFacultyName(facultyData.Faculty.facultyName || "");
      setEnrollKey(facultyData.Faculty.enrollKey || "");
      setDescActive(facultyData.Faculty.descActive || "");
      setMarketingCoordinator(facultyData?.Faculty.marketingCoordinator?._id || "");
    }
  }, [facultyData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const faculty = {
        facultyName: facultyName,
        enrollKey: enrollKey,
        descActive: descActive,
        userID: marketingCoordinator,
    };
    console.log(faculty)

        await dispatch(editFaculty(id, faculty, user.accessToken, navigate))
};



  return (
    <>
      <NavbarDefault />
      <div className="flex">
        <DefaultSidebar />
        <div className="mt-2.5 ml-5 w-full">
          <h1 className="text-3xl font-bold mb-4">Edit faculty</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-md font-medium text-gray-700">
                Faculty Name:
              </label>
              <input
                type="text"
                onChange={(e) => setFacultyName(e.target.value)}
                value={facultyName}
                className="mt-1 p-2 border border-gray-400 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-md font-medium text-gray-700">
                Enroll Key:
              </label>
              <input
                type="text"
                onChange={(e) => setEnrollKey(e.target.value)}
                value={enrollKey}
                className="mt-1 p-2 border border-gray-400 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-md font-medium text-gray-700">
                Description:
              </label>
              <input
                type="text"
                onChange={(e) => setDescActive(e.target.value)}
                value={descActive}
                className="mt-1 p-2 border border-gray-400 rounded-md w-full"
              />
            </div>
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
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-2"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditFaculty;
