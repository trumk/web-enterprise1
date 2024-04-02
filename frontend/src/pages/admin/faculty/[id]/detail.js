import { useDispatch, useSelector } from "react-redux"
import NavbarDefault from "../../../../components/navbar"
import DefaultSidebar from "../../../../components/sidebar"
import { getOneFaculty } from "../../../../redux/apiRequest";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const FacultyDetail = () => {
  const user = useSelector((state)=> state.auth.login?.currentUser)
  const faculty = useSelector((state) => state.faculty.faculty.currentFaculty);
  const dispatch = useDispatch();
  const {id} = useParams();
  useEffect(() => {
    if(faculty && id) {
      dispatch(getOneFaculty(id, user.accessToken));
    }
  }, [dispatch, faculty]);

console.log(faculty)

    return(
        <>
      <NavbarDefault />
      <div className="flex">
        <DefaultSidebar />
        <div className="mt-2.5 ml-5 w-full">
          
        </div>
      </div>
    </>
    )
}