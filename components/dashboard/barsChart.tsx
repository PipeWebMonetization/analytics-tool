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
import { transactionsResults } from "../../lib/database/databaseService";

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
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const BarsChart = (props: { revenueStatistics: transactionsResults }) => {
  let values: number[] = [];
  Object.values(props.revenueStatistics.perMonth!).forEach((val) =>
    values.push(val as number)
  );
  values = values.splice(0, 12);
  const data = {
    labels,
    datasets: [
      {
        label: "Revenue",
        data: values,
        backgroundColor: "#FFC121",
      },
    ],
  };
  return <Bar options={options} data={data} />;
};

export default BarsChart;
