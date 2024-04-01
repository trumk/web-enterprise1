import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFaculty } from "../../../redux/apiRequest"; // import action for adding faculty
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarDefault from "../../../components/navbar";
import DefaultSidebar from "../../../components/sidebar";

const AddFaculty = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  console.log(user.accessToken);
  const [facultyName, setFacultyName] = useState("");
  const [descActive, setDescActive] = useState("");
  const [enrollKey, setEnrollKey] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const faculty = {
      facultyName: facultyName,
      descActive: descActive,
      enrollKey: enrollKey
    };
    dispatch(addFaculty(faculty, user.accessToken, dispatch, navigate))
    .unwrap()
    .then((response) => {
      // Xử lý thành công nếu cần
    })
    .catch((error) => {
      // Xử lý lỗi nếu cần
    });

    setFacultyName("");
    setDescActive("");
    setEnrollKey("");
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
              <label className="block text-md font-medium text-gray-700">
                Faculty Name:
              </label>
              <input
                type="text"
                value={facultyName}
                onChange={(e) => setFacultyName(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-md font-medium text-gray-700">
                Description:
              </label>
              <input
                type="text"
                value={descActive}
                onChange={(e) => setDescActive(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-md font-medium text-gray-700">
                Enroll Key:
              </label>
              <input
                type="text"
                value={enrollKey}
                onChange={(e) => setEnrollKey(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Add Faculty
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddFaculty;
