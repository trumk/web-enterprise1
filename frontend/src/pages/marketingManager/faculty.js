import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import NavbarDefault from "../../components/navbar";
import DefaultSidebar from "../../components/sidebar";
import { getAllFaculties, searchFaculty } from "../../redux/apiRequest";

export const FacultyManager = () => {
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
          <div className="flex items-center gap-2 mt-7">
            <Input
              type="text"
              placeholder="Search faculty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-1/3 mb-4"
            />
          </div>
          <Card className="h-full w-full mt-7">
            <table className="w-full table-auto text-left">
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
                  {/* <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      Action
                    </Typography>
                  </th> */}
                </tr>
              </thead>
              <tbody>
                {searchTerm && filterFaculty?.Faculty && filterFaculty?.Faculty.length > 0 ? (
                  filterFaculty.Faculty.map((faculty, index) => (
                    <tr key={index}>
                      <td className="p-4 border-b border-blue-gray-50 cursor-pointer hover:bg-gray-100">
                        <Link to={`/marketingManager/faculty/${faculty?._id}`}>
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
                      {/* <td className="p-4 border-b border-blue-gray-50 w-20">
                        <Select label="Select action below">
                          <Option>
                            <Link to={`/marketingManager/faculty/${faculty?._id}`}>
                              Detail
                            </Link>
                          </Option>
                        </Select>
                      </td> */}
                    </tr>
                  ))
                ):faculties ? (
                  faculties?.Faculty && faculties?.Faculty.length > 0 ? (
                    faculties.Faculty.map((faculty, index) => (
                      <tr key={index}>
                        <td className="p-4 border-b border-blue-gray-50 cursor-pointer hover:bg-gray-100">
                          <Link to={`/marketingManager/faculty/${faculty?._id}`}>
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
                        {/* <td className="p-4 border-b border-blue-gray-50 w-20">
                          <Select label="Select action below">
                            <Option>
                              <Link to={`/marketingManager/faculty/${faculty?._id}`}>
                                Detail
                              </Link>
                            </Option>
                          </Select>
                        </td> */}
                      </tr>
                    ))
                  ) : (
                    // Hiển thị thông báo khi không tìm thấy faculty nào khớp với từ khóa
                    <tr>
                      <td colSpan={3} className="p-4">
                        No faculties found
                      </td>
                    </tr>
                  )
                ) : (
                  // Hiển thị thông báo khi đang tải dữ liệu
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