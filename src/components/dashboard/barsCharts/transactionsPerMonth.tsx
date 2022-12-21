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

const TransactionsPerMonth = (props: {
  revenueStatistics: transactionsResults;
}) => {
  console.log("Chart props:", props.revenueStatistics);
  let chartData: number[][] = [];

  // Insert data into chartData
  if (props.revenueStatistics.monthData) {
    for (let i = 0; i < props.revenueStatistics.monthData.length; i++) {
      if (!chartData[i]) {
        chartData[i] = [];
      }
      for (let index = 0; index < 12; index++) {
        if (props.revenueStatistics.monthData[i][index]) {
          chartData[i].push(props.revenueStatistics.monthData[i][index]);
        } else {
          chartData[i].push(0);
        }
      }
    }
  }

  // Define the chart data object
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
          props.revenueStatistics.monthData[index].paymentPointer.slice(
            0,
            -5
          ) ?? "Pointer",
        data: data,
        backgroundColor: customColors[index],
      };
    }),
  };
  return <Bar options={options} data={data} />;
};

export default TransactionsPerMonth;
