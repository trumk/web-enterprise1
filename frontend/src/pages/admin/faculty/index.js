import NavbarDefault from "../../../components/navbar";
import DefaultSidebar from "../../../components/sidebar";
import { useState, useEffect } from "react";
import { getAllFaculties, searchFaculty } from "../../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  IconButton,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { Info, Settings } from "lucide-react";

export const Faculty = () => {
  const faculties = useSelector(
    (state) => state.faculty.faculties?.allFaculties
  );
  const user = useSelector((state) => state.auth.login?.currentUser);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const filterFaculty = useSelector(
    (state) => state.faculty.searchFaculty.filterFaculty
  );
  useEffect(() => {
    if (user) {
      dispatch(getAllFaculties(user.accessToken, dispatch));
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (user && searchTerm !== "") {
      dispatch(searchFaculty(searchTerm, user.accessToken));
    } else {
      dispatch({
        type: "SET_FILTER_FACULTY",
        payload: { filterFaculty: { faculties: [], message: "" } }
      });
    }
  }, [searchTerm, user, dispatch]);
  
  console.log(filterFaculty)
  return (
    <>
      <NavbarDefault />
      <div className="flex">
        <DefaultSidebar className="flex" />
        <div className="ml-5 w-full">
        <Link to="/admin/faculty/add">
          <Button className="mt-2.5 mb-2.5 mt-8" color="green">
            Create new
          </Button>
          </Link>
          <Typography variant="h3" className="mb-2">Faculties</Typography>
          <div className="flex items-center gap-2">
            
            <Input
              type="text"
              placeholder="Search faculty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-1/3 mb-4"
            />
          </div>
          <Card className="h-full w-full mt-2">
            <table className="w-full  table-auto text-left">
              <thead>
                <tr>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      Faculty Name
                    </Typography>
                  </th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      Description
                    </Typography>
                  </th>  
                                          <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      Marketing Coordinator
                    </Typography>
                  </th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-center">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      Action
                    </Typography>
                  </th>
                </tr>
              </thead>
              <tbody>
                {searchTerm && filterFaculty?.Faculty && filterFaculty?.Faculty.length > 0 ? (
                  filterFaculty.Faculty.map((faculty, index) => (
                    <tr key={index}>
                      <td className="p-4 border-b border-blue-gray-50 cursor-pointer hover:bg-gray-100">
                        <Link to={`/admin/faculty/${faculty?._id}`}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {faculty?.facultyName}
                          </Typography>
                        </Link>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {faculty?.descActive}
                        </Typography>
                      </td>   
                                                                  <td className="p-4 border-b border-blue-gray-50">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {faculty?.marketingCoordinator?.[0].userName}
                        </Typography>
                      </td>  
                      <td className="p-4 border-b border-blue-gray-50 w-20">
                          <div className="flex gap-2 items-center">
                            <Link to={`/admin/faculty/${faculty?._id}`}><IconButton variant="gradient" color="amber"> <Info/> </IconButton></Link>
                            <Link to={`/admin/faculty/${faculty?._id}/edit`}><IconButton color="red"> <Settings/> </IconButton></Link>
                            </div>
                        </td>
                    </tr>
                  ))
                ):faculties ? (
                  faculties?.Faculty && faculties?.Faculty.length > 0 ? (
                    faculties.Faculty.map((faculty, index) => (
                      <tr key={index}>
                        <td className="p-4 border-b border-blue-gray-50 cursor-pointer hover:bg-gray-100">
                          <Link to={`/admin/faculty/${faculty?._id}`}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {faculty?.facultyName}
                            </Typography>
                          </Link>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {faculty?.descActive}
                          </Typography>
                        </td>
                                                                                                            <td className="p-4 border-b border-blue-gray-50">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {faculty?.marketingCoordinator?.userName}
                        </Typography>
                      </td>  
                        <td className="p-4 border-b border-blue-gray-50 w-20">
                          <div className="flex gap-2 items-center">
                            <IconButton variant="gradient" color="amber"><Link to={`/admin/faculty/${faculty?._id}`}> <Info/> </Link></IconButton>
                            <IconButton color="red"><Link to={`/admin/faculty/${faculty?._id}/edit`}> <Settings/> </Link></IconButton>
                            </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="p-4">
                        No faculties found
                      </td>
                    </tr>
                  )
                ) : (
                  <tr>
                    <td colSpan={3} className="p-4">
                      Loading...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Card>
        </div>
      </div>
    </>
  );
  
};
