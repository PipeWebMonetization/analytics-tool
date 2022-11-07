import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import {
  transactionsPerPaymentPointer,
  transactionsResults,
} from "../../lib/database/databaseService";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: 55,
  plugins: {
    datalabels: {
      display: false,
    },
  },
};

const DoughnutChart = (props: { revenueStatistics: transactionsResults }) => {
  {
    /*

  -> Fazer um loop em cada objeto do array monthData

  "monthData": [
//         {
//           "6" : 2000
//           "7": 0.012240412,
//           "paymentPointer": "$ilp.uphold.com/yPFi3hwdaKDw-2022",
//           "pluginId": "1234-1234-1245"
//         },
 {
//           "6" : 23423
//           "7": 2345,
//           "paymentPointer": "$ilp.uphold.com/gibimba-2022",
//           "pluginId": "1234-1234-1245"
//         }
//       ]


  Gerar cor aleatória

  let randomColor = "fffff";
  while (randomColor.length == 5) {
    randomColor = Math.floor(Math.random() * 16777215).toString(16);
  }

*/
  }

  let chartData: number[][] = [];
  let labels: string[] = [];

  for (let i = 0; i < props.revenueStatistics.monthData.length; i++) {
    if (!chartData[i]) {
      chartData[i] = [];
    }
    let totalSum = 0;
    for (let j = 0; j < 12; j++) {
      totalSum += props.revenueStatistics.monthData[i][j] ?? 0;
    }
    chartData[i].push(totalSum);
    labels.push(
      props.revenueStatistics.monthData[i].paymentPointer.slice(0, -5)
    );
  }

  const data = {
    labels: labels,
    datasets: [
      {
        data: chartData.map((x) => x[0]),
        backgroundColor: [
          "#FFC52E",
          "#CC9300",
          "#FFB800",
          "#664A00",
          "#996E00",
          "#332500",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
