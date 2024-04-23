
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  Input,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { getAllFaculties, searchFaculty } from "../redux/apiRequest";
import NavbarDefault from "../components/navbar";
import DefaultSidebar from "../components/sidebar";

export const Homepage = () => {
  const faculties = useSelector((state) => state.faculty.faculties?.allFaculties);

  const user = useSelector((state) => state.auth.login?.currentUser);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const filterFaculty = useSelector(
  //   (state) => state.faculty.searchFaculty.filterFaculty
  // );
  // const searchResult = useSelector(
  //   (state) => state.faculty.searchFaculty.searchResult
  // );
  const studentFaculty = useSelector((state) => state.user.user.user?.facultyID);
  const handleNavigate = (facultyId) => {  
    if (studentFaculty?.includes(facultyId)) {
      console.log(facultyId)
      navigate(`/faculty/${facultyId}`);
    } else {
      navigate(`/faculty/${facultyId}/enroll`);
    }
  }
  console.log(studentFaculty);
  useEffect(() => {
    if (user) {
      dispatch(getAllFaculties(user.accessToken, dispatch));
    }
  }, [user, dispatch]);

  const handleSearch = async () => {
    try {
      dispatch(searchFaculty(searchTerm, user.accessToken));
    } catch (error) {
      console.error("Error searching faculties:", error);
    }
  };
  console.log(faculties?.Faculty)
  return (
    <>
      <NavbarDefault />
      <div className="flex">
        <DefaultSidebar className="flex" />
        <div className="ml-5 w-full h-full">
          <div className='mt-10 flex items-start gap-5 flex-wrap'>
          {
            faculties ? (
              faculties?.Faculty && faculties?.Faculty.length > 0 ? (
                faculties.Faculty.map((faculty, index) => (
                  <div key={faculty?._id} className="m-2 flex-none relative" style={{ width: '26rem' }}>
                    <div className="absolute w-full h-full bg-teal-900 rounded-xl" />
                    <Card color="teal" shadow={false} className="w-full cursor-pointer transform transition-transform duration-200 hover:translate-x-3 hover:-translate-y-3 z-10">
                      <CardHeader
                        color="transparent"
                        floated={false}
                        shadow={false}
                        className="mx-0 flex items-start gap-4 pt-0 pb-8"
                      >
                        <div className="flex w-full flex-col gap-0.5">
                          <div className="flex items-start justify-between ml-3">
                            <Typography variant="h4" color="white">
                              {faculty?.facultyName}
                            </Typography>
                          </div>
                          <Typography variant='paragraph' color="white" className='ml-4 italic line-clamp-2'>
                            {faculty?.descActive}
                          </Typography>
                        </div>
                      </CardHeader>
                      <CardBody className="mb-6 ml-4 p-0">
                        <Button onClick={()=>handleNavigate(faculty._id)} variant='outlined' className='flex items-center gap-2'>Enroll Here</Button>
                      </CardBody>
                    </Card>
                  </div>
                ))
              ) : (
                <div className="text-center p-4 col-span-4">
                  No faculties found
                </div>
              )
            ) : (
              <div className="text-center p-4 col-span-4">
                Loading...
              </div>
            )}
            </div>
        </div>
      </div>
    </>
  );
};
