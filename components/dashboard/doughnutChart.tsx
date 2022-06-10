import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['userid_test-user3'],
  datasets: [
    {
      data: [100],
      backgroundColor: [
        '#FFC121',
        '#B07F00',
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
};

const DoughnutChart = () => {
  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
