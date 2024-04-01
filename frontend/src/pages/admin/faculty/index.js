import NavbarDefault from "../../../components/navbar";
import DefaultSidebar from "../../../components/sidebar";
import { useEffect } from "react";
import { getAllFaculties } from "../../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";

export const Faculty = () => {
  const faculties = useSelector((state)=>state.faculty.faculties.allFaculties)
  const user = useSelector((state)=>state.auth.login?.currentUser) 
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(getAllFaculties(user.accessToken, dispatch));
    }
  }, [user, dispatch]);

  console.log(faculties);

  return (
    <>
      <NavbarDefault />
      <div className="flex justify-center">
        {/* Display the list of faculties */}
        <ul>
          {faculties ? (
            faculties.Faculty && faculties.Faculty.length > 0 ? (
              faculties.Faculty.map((faculty, index) => (
                <li key={index}>{faculty.facultyName} {faculty.descActive}</li>
              ))
            ) : (
              <li>No faculties found</li>
            )
          ) : (
            <li>Loading...</li>
          )}
        </ul>
      </div>
      <DefaultSidebar />
    </>
  );
};

