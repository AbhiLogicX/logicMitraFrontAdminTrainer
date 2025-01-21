import React, { useState } from "react";
import Home from "../../Home";
import Card from "../../components/Card";
import { useFetch } from "../../hooks/useFetch";
import LineChart from "./mothlyEarnings";
import PieChartQuterlyEarning from "./QuterlyEarningPieChart";
import QuaterlyEarningsCard from "./QuaterlyEarningsCard";
import { useAuth } from "../../context/auth";

function Dashboard() {
  const [auth, setAuth] = useAuth();

  const [quaterlyDetails, setQuaterlyDetails] = useState({
    year: new Date().getFullYear(),
    quater: 1,
  });

  const [yearlyDetails, setyearlyDetails] = useState(2024);

  const quaterlyUrl = `/dashboard/earning-info?year=${
    quaterlyDetails.year
  }&quarter=${quaterlyDetails.quater}&userId=${
    auth?.userId ? auth?.userId : auth?.user
  }`;
  const yearlyUrl = `/dashboard/yearly-earning-info?year=${yearlyDetails}&userId=${
    auth?.userId ? auth?.userId : auth?.user
  }`;
  const [data, error, loading, setReload] = useFetch(
    `/dashboard/info-trainer/${auth?.userId ? auth?.userId : auth?.user}`
  );

  const [graphData, grError, grLoading, grReload] = useFetch(
    "/graph/yearly-statistics"
  );
  const [earningData, earningError, earningLoading, earningReload] =
    useFetch(quaterlyUrl);

  const [yearlyData, yearlyError, yearlyLoading, yearlyReload] =
    useFetch(yearlyUrl);

  const handleQuaterlyChange = (e) => {
    const { name, value } = e.target;
    setQuaterlyDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    earningReload(false);
  };

  return (
    <>
      <Home>
        <div style={{ width: "100%" }}>
          <div style={{ display: "flex", width: "100%" }}>
            <Card
              title="Total Courses"
              value={data?.data?.courses}
              path="/trainers"
            />
            <Card
              title="Total Students"
              value={data?.data?.students}
              path="/students"
            />
            <Card
              title="Enrollments"
              value={data?.data?.enrollments}
              path="/enrollment"
            />
            <Card
              title="Wallet Amount"
              value={`${data?.data?.walletAmount}/-`}
              path="/trainers-subscribed"
            />
          </div>
          <div className="px-3 flex gap-2">
            <div className="box mb-5 " style={{ width: "100%" }}>
              <QuaterlyEarningsCard
                data={earningData}
                detailChange={handleQuaterlyChange}
              />
            </div>
            <div className="box mb-5" style={{ width: "100%" }}>
              <div className="mb-3">
                <h1 className="text-2xl text-white ">Quaterly Earning Chart</h1>
              </div>
              <hr className="border-2 border-amber-400 mb-2" />
              <div className="flex justify-end">
                <select
                  onChange={(e) => {
                    setyearlyDetails(e.target.value);
                    yearlyReload(false);
                  }}
                  className="form-select  input focus-within:bg-none focus:border-none outline-none w-[30%] text-white py-[10px]"
                >
                  <option>2024</option>
                  <option>2023</option>
                </select>
              </div>

              <PieChartQuterlyEarning
                titleLabel="Quarterly Earnings"
                yearlyData={
                  yearlyData !== null ? yearlyData?.data?.yearlySummary : null
                }
              />
            </div>
          </div>
          <div className="px-3">
            <div className="box mb-5">
              <LineChart
                titleLable="Monthly Enrollments"
                graphData={graphData?.data?.monthlyEnrollments}
              />
            </div>
          </div>
        </div>
      </Home>
    </>
  );
}

export default Dashboard;
