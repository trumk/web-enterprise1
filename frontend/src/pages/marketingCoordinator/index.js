
import { useDispatch, useSelector } from "react-redux";
import NavbarDefault from "../../components/navbar";
import DefaultSidebar from "../../components/sidebar";
import { getContributionByCoordinator, searchContribution } from "../../redux/apiRequest";
import {
  Badge,
  Card,
  CardFooter,
  IconButton,
  Input,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react"
import { Settings } from "lucide-react"
import { TablePagination } from "../../components/manage/edit-pagination";


export const MarketingCoordinatorPage = () => {
  const contributions = useSelector(
    (state) => state.contribution.getContributionByCoordinator?.contributions
  );
  const filterContribution = useSelector(
    (state) => state.contribution.searchContribution?.filterContribution
  );
  const user = useSelector((state) => state.auth.login?.currentUser);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const contributionsPerPage = 4;
  const dispatch = useDispatch();
  const displayList = searchTerm !== "" ? filterContribution : contributions;
  const currentItems = displayList?.slice(
    (currentPage - 1) * contributionsPerPage,
    currentPage * contributionsPerPage
  );

  useEffect(() => {
    if (user) {
      dispatch(getContributionByCoordinator(user.accessToken));
    }
  }, [user, dispatch]);
  console.log(contributions);

  useEffect(() => {
    if (user && searchTerm !== "") {
      dispatch(searchContribution(searchTerm, user.accessToken));
    } else {
      dispatch({
        type: "SET_FILTER_CONTRIBUTION",
        payload: { filterContribution: [] },
      });
    }
  }, [searchTerm, user, dispatch]);

  return (
    <>
      <NavbarDefault />
      <div className="flex">
        <DefaultSidebar />
        <div className="ml-5 w-full">
          <div className="flex items-center gap-2 mt-2">
            <Input
              type="text"
              placeholder="Search contributions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-1/3 mb-4"
            />
          </div>
          <Card className="h-full w-full mt-5">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      Title
                    </Typography>
                  </th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      Image
                    </Typography>
                  </th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      Published
                    </Typography>
                  </th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      User
                    </Typography>
                  </th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      Actions
                    </Typography>
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems ? (
                  currentItems && currentItems.length > 0 ? (
                    currentItems?.map((contribution, index) => (
                      <tr key={index}>
                        <td className="p-4 border-b border-blue-gray-50 cursor-pointer hover:bg-gray-100">
                          <Link
                            to={`/marketingCoordinator/contribution/${contribution._id}/action`}
                          >
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {contribution?.title}
                            </Typography>
                          </Link>
                        </td>

                        <td className="p-1 border-b border-blue-gray-50">
                          {Array.isArray(contribution.image) &&
                            contribution.image.length > 0 && (
                              <img
                                src={contribution.image[0]}
                                alt="contribution"
                                className="h-[80px]"
                              />
                            )}
                        </td>
                        <td className="p-12 border-b border-blue-gray-50">
                          <Badge
                            className="w-[100px]"
                            content={
                              contribution.isPublic === true
                                ? "Published"
                                : "Not Published"
                            }
                            color={
                              contribution.isPublic === true ? "green" : "red"
                            }
                          />
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {contribution?.author.firstName} {contribution?.author.lastName}
                          </Typography>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50 w-20">
                          <div className="flex gap-2 items-center">

                            <Link to={`/marketingCoordinator/contribution/${contribution._id}/action`}> <IconButton variant="gradient" color="amber"><Settings/> </IconButton></Link>

                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="p-4">
                        No contribution found
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
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
              <TablePagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                itemsPerPage={contributionsPerPage}
                totalItems={displayList}
                />
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};
