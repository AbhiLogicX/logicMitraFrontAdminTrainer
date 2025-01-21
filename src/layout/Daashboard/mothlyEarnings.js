/* eslint-disable */
import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

import { UtilsMothns } from "../../util/formatcarht";

const labels = UtilsMothns.months({ count: 12 });

function LineChart({ graphData, titleLable }) {
  //   const [fetchedData, setFetchedData] = useState(false);
  //   const [earningsData, setEarningsData] = useState();

  const data = {
    labels,
    datasets: [
      {
        label: titleLable,
        data: graphData,
        backgroundColor: "#ccaa00",
        borderColor: "#057458",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          color: "#ccaa00", // Color of x-axis labels
        },
        grid: {
          color: "white", // Color of grid lines
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#ccaa00", // Color of y-axis labels
        },
        grid: {
          color: "white", // Color of grid lines
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#ccaa00", // Color of legend text
        },
      },
      title: {
        display: true,

        color: "#ccaa00", // Color of title text
        font: {
          size: 18, // Customize title font size
        },
      },
    },
  };

  return (
    <div
      style={{
        width: "95%",
        height: "450px",
      }}
      className="mb-10"
    >
      <h1 className="text-2xl text-white mb-2">{titleLable}</h1>
      <hr className="border-2 border-amber-400" />
      <Bar options={options} data={data} />
    </div>
  );
}
export default LineChart;
