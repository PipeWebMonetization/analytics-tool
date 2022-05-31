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
    labels: ['$payment-pointer-1', '$payment-pointer-2'],
    datasets: [
      {
        data: [12, 19],
        backgroundColor: [
          '#FFC121',
          '#B07F00',
        ],
        borderColor: [
          '#FFC121',
          '#B07F00',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const DoughnutChart = () => {
    return <Doughnut data={data} />;
  };
  
  export default DoughnutChart;
  