import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavbarDefault from "../../components/navbar";
import DefaultSidebar from "../../components/sidebar";
import {
  getAllContributions,
  searchContribution,
} from "../../redux/apiRequest";
import { format } from "date-fns";
import { Button, Input, Typography } from "@material-tailwind/react";
import { ArrowBigLeft, ArrowRight } from "lucide-react";

export const ContributionsDashboard = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const contributionData = useSelector(
    (state) => state.contribution.contributions?.allContributions
  );
  const filterContribution = useSelector(
    (state) => state.contribution.searchContribution?.filterContribution
  );
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      dispatch(getAllContributions(user.accessToken, dispatch));
    }
  }, [user, dispatch]);
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
  console.log(filterContribution);
  return (
    <>
      <NavbarDefault />
      <div className="flex">
        <DefaultSidebar className="flex" />
        <div className="ml-5 w-full">
          <div className="flex items-center gap-2 mt-2">
            <Input
              type="text"
              label="Search contributions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-1/3 mb-4"
            />
          </div>
          <Typography variant="h2" className="font-bold text-purple-600">
            Explore some interesting contributions
          </Typography>
          {searchTerm && filterContribution?.length > 0
            ? filterContribution.map((contribution, index) => (
                <div key={index} className="bg-purple-100 px-2 py-1">
                  <article className="mx-auto my-2 flex max-w-md flex-col rounded-2xl bg-white px-4 shadow md:max-w-5xl md:flex-row md:items-center">
                    <div className="shrink-0 my-4 md:mr-8 md:max-w-sm">
                      <img
                        className="rounded-2xl h-64 w-96 object-cover"
                        src={contribution?.image[0]}
                        alt=""
                      />
                    </div>
                    <div className="py-4 sm:py-8">
                      <a
                        href="#"
                        className="mb-6 block text-2xl font-medium text-gray-700"
                      >
                        {contribution?.title}
                      </a>
                      <p className="mb-6 text-gray-500">
                        From: {contribution?.eventID.topic}
                      </p>
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={contribution?.author.avatar}
                          alt=""
                        />
                        <p className="ml-4 w-56">
                          <Typography className="block font-bold text-gray-700">
                            {contribution?.author.firstName}{" "}
                            {contribution?.author.lastName}
                          </Typography>
                          <Typography className="text-sm text-gray-400">
                            {format(contribution?.createdAt, "MMMM dd, yyyy")}
                          </Typography>
                        </p>
                      </div>
                      <Button
                        variant="text"
                        className="mt-4 flex items-center gap-2"
                      >
                        Read More <ArrowRight className="h-4" />
                      </Button>
                    </div>
                  </article>
                </div>
              ))
            : // Nếu không có tìm kiếm hoặc không có kết quả tìm kiếm, hiển thị contributionData
              contributionData?.map((contribution, index) => (
                <div key={index} className="bg-purple-100 px-2 py-1">
                  <article className="mx-auto my-2 flex max-w-md flex-col rounded-2xl bg-white px-4 shadow md:max-w-5xl md:flex-row md:items-center">
                    <div className="shrink-0 my-4 md:mr-8 md:max-w-sm">
                      <img
                        className="rounded-2xl h-64 w-96 object-cover"
                        src={contribution?.image[0]}
                        alt=""
                      />
                    </div>
                    <div className="py-4 sm:py-8">
                      <a
                        href="#"
                        className="mb-6 block text-2xl font-medium text-gray-700"
                      >
                        {contribution?.title}
                      </a>
                      <p class="mb-6 text-gray-500">
                        From: {contribution.eventID.topic}
                      </p>
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={contribution.author.avatar}
                          alt=""
                        />
                        <p className="ml-4 w-56">
                          <Typography className="block font-bold text-gray-700">
                            {contribution?.author.firstName}{" "}
                            {contribution?.author.lastName}
                          </Typography>
                          <Typography className="text-sm text-gray-400">
                            {format(contribution?.createdAt, "MMMM dd, yyyy")}
                          </Typography>
                        </p>
                      </div>
                      <Button
                        variant="text"
                        className="mt-4 flex items-center gap-2"
                      >
                        Read More <ArrowRight className="h-4" />
                      </Button>
                    </div>
                  </article>
                </div>
              ))}
        </div>
      </div>
    </>
  );
};
