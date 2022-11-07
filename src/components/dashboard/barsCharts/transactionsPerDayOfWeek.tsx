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
      top: 50,
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

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const labels = daysOfWeek.map(
  (_, i) => daysOfWeek[(i + new Date().getDay() + 1) % 7]
);
const getDayOfYear = () => {
  let now: any = new Date();
  let start: any = new Date(now.getFullYear(), 0, 0);
  let diff = now - start;
  let oneDay = 1000 * 60 * 60 * 24;
  let day = Math.floor(diff / oneDay);
  return day;
};

const TransactionsPerDayOfWeek = (props: {
  revenueStatistics: transactionsResults;
}) => {
  let chartData: number[][] = [];
  let dayOfYear = getDayOfYear();
  // Insert data into chartData
  if (props.revenueStatistics.yearData) {
    for (let i = 0; i < props.revenueStatistics.yearData.length; i++) {
      if (!chartData[i]) {
        chartData[i] = [];
      }
      for (let dayIndex = dayOfYear - 6; dayIndex <= dayOfYear; dayIndex++) {
        if (props.revenueStatistics.yearData[i][dayIndex]) {
          chartData[i].push(props.revenueStatistics.yearData[i][dayIndex]);
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
          props.revenueStatistics.weekData[index].paymentPointer.slice(0, -5) ??
          "Pointer",
        data: data,
        borderRadius: 6,
        backgroundColor: customColors[index],
      };
    }),
  };

  return <Bar options={options} data={data} />;
};

export default TransactionsPerDayOfWeek;
