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
  const totalContributionsConfig = {
    type: "bar",
    height: 240,
    series: [
      {
        name: "Total",
        data: statistic?.map((item) => item.totalContributions),
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
        categories: statistic?.map((item) => item.facultyName),
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
  const PercentageOfTotal = {
    type: "pie",
    width: 560,
    height: 560,
    series: statistic?.map((item) => item.percentageOfTotal),

    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: statistic?.map((item) => item.facultyName),
      },
      dataLabels: {
        enabled: false,
      },
      labels: statistic?.map((item) => item.facultyName),
      colors: undefined,
      legend: {
        show: true, 
        position: "right", 
        labels: {
          colors: undefined, 
          formatter: function (val, opts) {
            const facultyName = statistic[opts.seriesIndex].facultyName;
            return `${facultyName}`;
          },
        },
      },
    },
  };
  const facultyNames = statistic?.map((item) => item.facultyName);
  console.log(facultyNames);
  const dispatch = useDispatch();

  const time = {
    startDate: "2022",
    endDate: "2025",
  };
  useEffect(() => {
    if (user && user.accessToken) {
      dispatch(getStatistic(user.accessToken, time));
    }
  }, [user, dispatch]);
  console.log(statistic);
  return (
    <>
      <NavbarDefault />
      <div className="flex">
        <DefaultSidebar className="flex" />
        <div className="ml-5 w-full">
          <section className="mt-4">
            <div>
              <Typography variant="h4">Total Contribution</Typography>
              <Chart {...totalContributionsConfig}/>
            </div>
          </section>
          <section className="mt-4">
            <div>
              <Typography variant="h4">Percentage of total</Typography>
              <Chart {...PercentageOfTotal} />
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
