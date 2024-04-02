import NavbarDefault from "../../../components/navbar";
import DefaultSidebar from "../../../components/sidebar";
import { useEffect } from "react";
import { getAllFaculties } from "../../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Option, Select, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export const Faculty = () => {
  const faculties = useSelector((state)=>state.faculty.faculties.allFaculties)
  const user = useSelector((state)=>state.auth.login?.currentUser) 
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(getAllFaculties(user.accessToken, dispatch));
    }
  }, [user, dispatch]);


  return (
    <>
      <NavbarDefault />
      <div className="flex">
        <DefaultSidebar className="flex" />
        <div className="ml-5 w-full">
          <Button className="mt-2.5 mb-2.5">
            <Link to="/admin/faculty/add">Create new</Link>
          </Button>
          <Card className="h-full w-full">
            <table className="w-full min-w-max table-auto text-left">
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
                      Action
                    </Typography>
                  </th>
                </tr>
              </thead>
              <tbody>
                {faculties ? (
                  faculties.Faculty && faculties.Faculty.length > 0 ? (
                    faculties.Faculty.map((faculty, index) => (
                      
                        <tr key={index}>
                          
                        <td className="p-4 border-b border-blue-gray-50 cursor-pointer hover:bg-gray-100">
                        <Link to={`/admin/faculty/${faculty._id}`}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {faculty.facultyName}
                          </Typography>
                          </Link>
                        </td>
                        
                        <td className="p-4 border-b border-blue-gray-50">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {faculty.descActive}
                          </Typography>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50 w-20">
                          <Select label="Select action below">
                            <Option> <Link to={`/admin/faculty/${faculty._id}`}> Detail </Link></Option>
                            <Option>Edit</Option>
                            </Select>
                        </td>
                      </tr>
                      
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="p-4">
                        No faculties found
                      </td>
                    </tr>
                  )
                ) : (
                  <tr>
                    <td colSpan={4} className="p-4">
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

