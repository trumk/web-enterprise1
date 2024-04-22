import { useState, useEffect } from "react";
import NavbarDefault from "../../components/navbar";
import DefaultSidebar from "../../components/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getStatistic } from "../../redux/apiRequest";
import Chart from "react-apexcharts";
import { Button, Option, Select, Typography } from "@material-tailwind/react";

export const MarketingManagerPage = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const statistic = useSelector((state) => state.user.statistic ? state.user.statistic.data : null);
  const dispatch = useDispatch();
  const [time, setTime] = useState();
  useEffect(() => {
    if (user && user.accessToken && time) {
      dispatch(getStatistic(user.accessToken, { startDate: time }));
    }
  }, [user, time]);
  let numberOfContribution = null;
  let percentageContribution = null;
  let numberOfContributors = null;

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const timeValue = { startDate: time };
  //   dispatch(getStatistic(user.accessToken, timeValue));
  // };


  const analytics = statistic?.statistics || [];
  console.log(statistic?.statistics);
  numberOfContribution = {
    fill_raw: "last",
    type: "bar",
    height: 300,
    series: [
      {
        name: "Total",
        data: analytics && analytics?.length > 0 ? analytics?.map((item) => item.numberOfContributions) : [],
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

  percentageContribution = {
    fill_raw: "last",
    type: "pie",
    width: 500,
    height: 500,
    series: analytics && analytics?.length > 0 ? analytics?.map((item) => item.contributionPercentage) : [],
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
  numberOfContributors = {
    fill_raw: "last",
    type: "bar",
    height: 300,
    series: [
      {
        name: "Total",
        data: analytics && analytics?.length > 0 ? analytics?.map((item) => item.numberOfContributors) : [],
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
        <div className="ml-5 w-full mt-5">
          <>
            <Select value={time} onChange={(value) => setTime(value)} label="Select year" className="mt-2.5">
              <Option value="2023">2023</Option>
              <Option value="2024">2024</Option>
              <Option value="2025">2025</Option>
              <Option value="2026">2026</Option>
              <Option value="2027">2027</Option>
              <Option value="2028">2028</Option>
              <Option value="2029">2029</Option>
              <Option value="2030">2030</Option>
            </Select>
            {/* <Button onClick={handleSubmit} className="mt-4">Save</Button>
            </form> */}
            <>
              <section className="mt-4">
                <div className="border border-gray-900">
                  <Typography variant="h4">Total Contribution</Typography>
                  {numberOfContribution && numberOfContribution.type && <Chart {...numberOfContribution} />}
                </div>
              </section>
              <section className="mt-4">
                <div className="border border-gray-900">
                  <Typography variant="h4">Number of Contributors</Typography>
                  {numberOfContributors && numberOfContributors.type && <Chart {...numberOfContributors} />}
                </div>
              </section>
              <section className="mt-4">
                <div className="flex flex-col items-center gap-2 border border-gray-900">
                  <Typography variant="h4">Percentage of Total</Typography>
                  {percentageContribution && percentageContribution.type && <Chart {...percentageContribution} />}
                </div>
              </section>
            </>
          </>
        </div>
      </div>
    </>
  );
};
