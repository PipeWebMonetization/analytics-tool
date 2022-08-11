import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { transactionsResults } from "../../../lib/database/databaseService";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  barRoundness: 30,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      display: false,
      grid: {
        display: false,
      },
    },
  },
};

const labels = [
  "2022",
  "2023",
  "2024",
  "2025",
  "2026",
  "2027",
  "2028",
  "2029",
  "2030",
];

const TransactionsPerYear = (props: {
  revenueStatistics: transactionsResults;
}) => {
  let chartData: number[][] = [];

  // Insert data into chartData
  if (props.revenueStatistics.yearData) {
    for (let i = 0; i < props.revenueStatistics.yearData.length; i++) {
      if (!chartData[i]) {
        chartData[i] = [];
      }
      for (let index = 1; index < 13; index++) {
        if (props.revenueStatistics.yearData[i][index]) {
          chartData[i].push(props.revenueStatistics.yearData[i][index]);
        } else {
          chartData[i].push(0);
        }
      }
    }
  }

  const customColors = [
    "#FFC52E",
    "#CC9300",
    "#FFB800",
    "#664A00",
    "#996E00",
    "#332500",
  ];
  const data = {
    labels,
    datasets: chartData.map((data, index) => {
      return {
        label:
          props.revenueStatistics.monthData[index].paymentPointer ?? "Pointer",
        data: data,
        backgroundColor: customColors[index],
      };
    }),
  };

  return <Bar options={options} data={data} />;
};

export default TransactionsPerYear;
