
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  Input,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { getAllFaculties, searchFaculty } from "../redux/apiRequest";
import NavbarDefault from "../components/navbar";
import DefaultSidebar from "../components/sidebar";

export const Homepage = () => {
  const faculties = useSelector(
    (state) => state.faculty.faculties.allFaculties
  );
  
  const user = useSelector((state) => state.auth.login?.currentUser);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  
  // const filterFaculty = useSelector(
  //   (state) => state.faculty.searchFaculty.filterFaculty
  // );
  // const searchResult = useSelector(
  //   (state) => state.faculty.searchFaculty.searchResult
  // );

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
  //console.log(filterFaculty);
  return (
    <>
      <NavbarDefault />
      <div className="flex">
        <DefaultSidebar className="flex" />
        <div className="ml-5 w-full h-full">
          <div className="flex items-center gap-2">
            <Input
              type="text"
              placeholder="Search faculty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-1/3 mb-4"
            />
            <Button onClick={handleSearch} className="mb-2.5 mt-2.5">
              Search
            </Button>
          </div>
          <Card className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20">
                {
                  faculties ? (
                    faculties.Faculty && faculties.Faculty.length > 0 ? (
                      faculties.Faculty.map((faculty, index) => (
                        <Card className="mt-6 w-96 border border-indigo-500">
                          <CardBody>
                            <Typography variant="h5" color="blue-gray" className="mb-2">
                              {faculty.facultyName}
                            </Typography>
                            <Typography>
                              {faculty.descActive}
                            </Typography>
                          </CardBody>
                          <CardFooter className="pt-0">
                            <Link to={`faculty/${faculty._id}/enroll`}><Button>Enroll Here</Button></Link>
                          </CardFooter>
                        </Card>
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
          </Card>
        </div>
      </div>
    </>
  );
};