import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import NavbarDefault from "../../../../components/navbar";
import DefaultSidebar from "../../../../components/sidebar";
import {  editEvent, getOneEvent, } from "../../../../redux/apiRequest";
import { format } from "date-fns";
import DatePicker from "../../../../components/manage/date-picker";
import { Select, Option } from "@material-tailwind/react";
import { Editor } from "../../../../components/manage/editor";

const EditEvent = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const { id } = useParams();
  const faculties = useSelector((state) => state.faculty.faculties.allFaculties);
  const eventData = useSelector((state) => state.event.event.currentEvent);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [closureDate, setClosureDate] = useState(null);
  const [finalDate, setFinalDate] = useState(null);
  const [faculty, setFaculty] = useState("");
  const selectFaculty = faculties.Faculty

  useEffect(() => {
    if (user && user.accessToken) {
      dispatch(getOneEvent(id, user.accessToken));
    }
  }, [dispatch, id, user]);

  useEffect(() => {
    if (eventData) {
      setTopic(eventData?.Event.topic || "");
      setContent(eventData?.Event.content || "");
      setClosureDate(format(eventData?.Event.closureDate, 'MMMM dd,yyyy') || "");
      setFinalDate(format(eventData?.Event.finalDate, 'MMMM dd,yyyy') || "");
      setFaculty(eventData?.Event.facultyId?._id || "")
    }
  }, [eventData]);

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const event = {
        topic: topic,
        content: content,
        closureDate: closureDate,
        finalDate: finalDate,
        facultyId: faculty,
      };
    dispatch(editEvent(id, event, user.accessToken, navigate))
  };

  return (
    <>
      <NavbarDefault />
      <div className="flex">
        <DefaultSidebar />
        <div className="mt-2.5 ml-5 w-full">
          <h1 className="text-3xl font-bold mb-4">Edit Event</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-md font-medium text-gray-700">
                Topic:
              </label>
              <input
                type="text"
                onChange={(e) => setTopic(e.target.value)}
                value={topic}
                className="mt-1 p-2 border border-gray-400 rounded-md w-full"
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
              <Select value={faculty} onChange={(value) => setFaculty(value)}>
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
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditEvent;
