import React from "react";
import { Bar } from "react-chartjs-2";
import PropTypes from "prop-types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ labels, numberOfAttending, data, text }) => {
  const seedData = {
    labels,
    datasets: [
      {
        label: `${numberOfAttending}  Answers`,
        data: data,
        backgroundColor: ["rgba(53, 162, 235, 0.5)", "rgba(255, 99, 132, 0.5)"],
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        suggestedMin: 0,
        suggestedMax: numberOfAttending,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: text,
      },
    },
  };
  return (
    <div>
      <Bar height={400} width={600} data={seedData} options={options} />
    </div>
  );
};
BarChart.propTypes = {
  labels: PropTypes.array,
  numberOfAttending: PropTypes.number,
  data: PropTypes.array,
  text: PropTypes.string,
};
export default BarChart;
