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
  var totalValue = 0;
  // Insert data into chartData
  if (props.revenueStatistics.yearData) {
    for (let i = 0; i < props.revenueStatistics.yearData.length; i++) {
      if (!chartData[i]) {
        chartData[i] = [];
      }
      totalValue = 0;
      for (let dayIndex = 0; dayIndex < 366; dayIndex++) {
        if (props.revenueStatistics.yearData[i][dayIndex]) {
          totalValue += props.revenueStatistics.yearData[i][dayIndex];
        }
      }
      chartData[i].push(totalValue);
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

export default TransactionsPerYear;
