import { useEffect, useState } from "react";
import NavbarDefault from "../../components/navbar";
import DefaultSidebar from "../../components/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getStatistic } from "../../redux/apiRequest";
import Chart from "react-apexcharts";
import { Typography } from "@material-tailwind/react";

export const MarketingManagerPage = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const statistic = useSelector((state) => state.user.statistic?.data);
  const isFetching = useSelector((state) => state.user.statistic?.isFetching);
  const dispatch = useDispatch();
  const time = {
    startDate: "2023",
  };
  useEffect(() => {
    if (user && user.accessToken) {
      dispatch(getStatistic(user.accessToken, time));
    }
  }, [user, dispatch]);
  const analytics = statistic?.statistics;
  console.log(statistic?.statistics);
  const numberOfContribution = {
    type: "bar",
    height: 300,
    series: [
      {
        name: "Total",
        data: analytics?.map((item) => item.numberOfContributions),
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#020617"],
      plotOptions: {
        bar: {
          columnWidth: "40%",
          borderRadius: 2,
        },
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: analytics?.map((item) => item.facultyName),
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  };

  const percentageContribution = {
    type: "pie",
    width: 500,
    height: 500,
    series: analytics?.map((item) => item.contributionPercentage),
    options: {
      chart: {
        toolbar: {
          show: false,
        },
        legends: {
          show: true,
          position: "right",
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: true,
      },
      labels: analytics?.map((item) => item.facultyName),
      colors: undefined,
      legend: {
        show: true,
        position: 'right'
      },
    },
  };
  const numberOfContributors = {
    type: "bar",
    height: 300,
    series: [
      {
        name: "Total",
        data: analytics?.map((item) => item.numberOfContributors),
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#c126e0"],
      plotOptions: {
        bar: {
          columnWidth: "40%",
          borderRadius: 2,
        },
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: analytics?.map((item) => item.facultyName),
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  };
  console.log(statistic?.statistics);
  return (
    <>
      <NavbarDefault />
      <div className="flex">
        <DefaultSidebar className="flex" />
        <div className="ml-5 w-full">
          {isFetching ? (
            <div>Loading...</div>
          ) : (
            <>
              <section className="mt-4">
                <div className="border border-gray-900">
                  <Typography variant="h4">Total Contribution</Typography>
                  <Chart {...numberOfContribution} />
                </div>
              </section>
              <section className="mt-4">
                <div className="border border-gray-900">
                  <Typography variant="h4">Number of Contributor</Typography>
                  <Chart {...numberOfContributors} />
                </div>
              </section>
              <section className="mt-4">
                <div className="flex flex-col items-center gap-2 border border-gray-900">
                  <Typography variant="h4">Percentage of Total</Typography>
                  <Chart {...percentageContribution} />
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </>
  );
};
