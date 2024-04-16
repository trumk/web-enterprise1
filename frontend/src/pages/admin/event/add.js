import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEvent } from "../../../redux/apiRequest";
import { useNavigate } from "react-router-dom";
import NavbarDefault from "../../../components/navbar";
import DefaultSidebar from "../../../components/sidebar";
import DatePicker from "../../../components/manage/date-picker";
import { Select, Option } from "@material-tailwind/react";
import { Editor } from "../../../components/manage/editor";

const AddEvent = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [closureDate, setClosureDate] = useState(null);
  const [finalDate, setFinalDate] = useState(null);
  const [faculty, setFaculty] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const faculties = useSelector((state) => state.faculty.faculties.allFaculties)
  const selectFaculty = faculties.Faculty
  console.log(content)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const event = {
      topic: topic,
      content: content,
      closureDate: closureDate,
      finalDate: finalDate,
      facultyId: faculty,
    };
    try {
      await dispatch(addEvent(user.accessToken, event, navigate));
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
          <h1 className="text-3xl font-bold mb-4">Add Event</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-md font-medium text-gray-700">
                Topic:
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="mt-1 p-2 border border-gray-400 rounded-md w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-md font-medium text-gray-700">
                Content:
              </label>
              <Editor
                value={content}
                onChange={setContent}
                className="mt-1 p-2 border border-gray-400 rounded-md w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-md font-medium text-gray-700">
                Closure Date:
              </label>
              <DatePicker
                date={closureDate}
                setDate={setClosureDate}
              />
            </div>
            <div className="mb-4">
              <label className="block text-md font-medium text-gray-700">
                Final Date:
              </label>
              <DatePicker
                date={finalDate}
                setDate={setFinalDate}
              />
            </div>
            <div className="mb-4">
              <label className="block text-md font-medium text-gray-700">
                Faculty:
              </label>
              <Select value={faculty} onChange={(value) => setFaculty(value)} required>
                {selectFaculty.map((faculty) => (
                  <Option key={faculty._id} value={faculty._id}>
                    {faculty.facultyName}
                  </Option>
                ))}
              </Select>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={handleSubmit}
            >
              Add Event
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddEvent;
