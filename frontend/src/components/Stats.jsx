import { useState, useEffect } from "react";
import Footer from "./common/Footer";
import Navigation from "./common/Navigation";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "../styles/stats.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const dummyData = {
  2023: [40, 50, 65, 70, 80, 90, 100, 110, 95, 80, 60, 50],
  2024: [30, 45, 55, 60, 75, 85, 95, 100, 90, 70, 65, 40],
};

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function Stats() {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Replace this with actual API call later
    setChartData(dummyData[selectedYear]);
  }, [selectedYear]);

  const data = {
    labels: months,
    datasets: [
      {
        label: `Total KM Run in ${selectedYear}`,
        data: chartData,
        backgroundColor: "rgba(75,192,192,0.7)",
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#ffffff", // white legend text
          font: {
            size: 16,
          },
        },
      },
      title: {
        display: true,
        text: `Running Stats for ${selectedYear}`,
        color: "#ffffff", // white title
        font: {
          size: 20,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#ffffff",
          font: {
            size: 14,
          },
        },
        grid: {
          color: "rgba(244, 244, 244, 0.17)", // subtle gray grid
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 20,
          color: "#ffffff",
          font: {
            size: 14,
          },
        },
        grid: {
          color: "rgba(244, 244, 244, 0.17)", // subtle gray grid
        },
      },
    },
  };

  return (
    <div className="stats-container">
      <div className="navigation-wrapper">
        <Navigation />
      </div>

      <div className="stats-main-container">
        <div className="stats-content">
          <div className="year-filter">
            <label>Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
          </div>

          <Bar data={data} options={options} />
        </div>
      </div>

      <Footer />
    </div>
  );
}
