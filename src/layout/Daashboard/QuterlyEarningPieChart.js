import React from "react";
import { Pie } from "react-chartjs-2";

function PieChartQuterlyEarning({ titleLabel, yearlyData }) {
  // Random data for quarterly earnings

  const data = {
    labels: [
      `Q1(JAN-MAR)  ₹${yearlyData?.Q1?.debit + yearlyData?.Q1?.credit}/-`,
      `Q2(APR-JUN) ₹${yearlyData?.Q2?.debit + yearlyData?.Q2?.credit}/-`,
      `Q3(JUL-SEP) ₹${yearlyData?.Q3?.debit + yearlyData?.Q3?.credit}/-`,
      `Q4(OCT-DEC) ₹${yearlyData?.Q4?.debit + yearlyData?.Q4?.credit}/-`,
    ],
    datasets: [
      {
        label: "Quarterly Earnings",
        data: [
          yearlyData?.Q1?.debit + yearlyData?.Q1?.credit,
          yearlyData?.Q2?.debit + yearlyData?.Q2?.credit,
          yearlyData?.Q3?.debit + yearlyData?.Q3?.credit,
          yearlyData?.Q4?.debit + yearlyData?.Q4?.credit,
        ],
        backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0"],
        borderColor: ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#ccaa00", // Customize legend label colors
        },
      },
      title: {
        display: true,
        text: titleLabel,
        color: "#ccaa00", // Title color
        font: {
          size: 18,
        },
      },
    },
  };

  return (
    <div
      style={{
        width: "95%",
        height: "300px",
      }}
      className="mb-10 "
    >
      <Pie data={data} options={options} />
    </div>
  );
}

export default PieChartQuterlyEarning;
