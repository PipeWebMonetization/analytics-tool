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
import ChartDataLabels from "chartjs-plugin-datalabels";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const options: any = {
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
    datalabels: {
      display: true,
      color: "black",
      align: "end",
      anchor: "end",
      rotation: -45,
      font: {
        size: 11,
      },
      labels: {
        title: {
          font: {
            size: 11,
            weight: "bold",
          },
        },
        value: {
          color: "black",
        },
      },
      formatter: function (value: number) {
        let stringValue = String(value);
        var numberToFixed = 2;
        if (value < 1) {
          for (let i = 0; i < stringValue.length; i++) {
            if (stringValue.charAt(i) != "0" && stringValue.charAt(i) != ".") {
              numberToFixed = i;
              break;
            }
          }
        }
        let data = value.toFixed(numberToFixed);
        if (Number(data) > 0) {
          return data;
        }
        return "";
      },
    },
  },
  layout: {
    padding: {
      left: 0,
      right: 0,
      top: 22,
      bottom: 0,
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
      // chartData[i].sort((n1: number, n2: number) => n1 - n2);
    }
    console.log(chartData);
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
        borderRadius: 6,
        backgroundColor: customColors[index],
      };
    }),
  };
  return <Bar options={options} data={data} />;
};

export default TransactionsPerMonth;
