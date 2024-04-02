import { useDispatch, useSelector } from "react-redux";
import NavbarDefault from "../../../../components/navbar";
import DefaultSidebar from "../../../../components/sidebar";
import { getOneFaculty } from "../../../../redux/apiRequest";
import { useEffect } from "react";

export const FacultyDetail = () => {
  const faculty = useSelector((state) => state.faculty.faculty.currentFaculty);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFaculty = async () => {
      if (faculty && faculty._id) {
        await dispatch(getOneFaculty(faculty._id)); 
      }
    };
    fetchFaculty();
  }, [dispatch, faculty]);


  console.log(faculty.facultyName);

  return (
    <>
      <NavbarDefault />
      <div className="flex">
        <DefaultSidebar />
        <div className="mt-2.5 ml-5 w-full"></div>
      </div>
    </>
  );
};
