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
import ChartDataLabels from "chartjs-plugin-datalabels";
import { PostInfoDocument, TransactionsDocument } from "../../../modules";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const unformatTransaction = (transactionValue: number) => {
  if (transactionValue >= 2) {
    return transactionValue - 1;
  } else if (transactionValue < 2 && transactionValue >= 0.6) {
    return transactionValue - 0.7;
  } else {
    return transactionValue - 0.5;
  }
};

const options: any = {
  indexAxis: "x",
  barRoundness: 30,
  maintainAspectRatio: false,
  datalabels: {
    display: false,
  },
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    tooltip: {
      callbacks: {
        title: function (tooltipItem: any, data: any) {
          return tooltipItem[0]["label"];
        },
        label: function (tooltipItem: any, data: any) {
          return unformatTransaction(tooltipItem["raw"]);
        },
      },
      backgroundColor: "#000",
      titleFontSize: 16,
      titleFontColor: "#0066ff",
      bodyFontColor: "#000",
      bodyFontSize: 14,
      displayColors: false,
    },
    datalabels: {
      display: false,
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

const initialBarData = {
  labels: [],
  datasets: [],
};

const customColors = [
  "#FFC52E",
  "#CC9300",
  "#FFB800",
  "#664A00",
  "#996E00",
  "#332500",
];

const TransactionsPerContent = (props: {
  transactions: TransactionsDocument[];
  postInfos: PostInfoDocument[];
}) => {
  const [barChartData, setBarChartData] = useState(initialBarData);

  const formatTransaction = (transactions: number[]) => {
    let formattedTransactions: number[] = [];
    transactions.forEach((transaction) => {
      if (transaction > 0) {
        if (transaction < 0.1) {
          formattedTransactions.push(transaction + 0.5);
        } else if (transaction < 1) {
          formattedTransactions.push(transaction + 0.7);
        } else {
          formattedTransactions.push(transaction + 1);
        }
      } else {
        formattedTransactions.push(0);
      }
    });
    return formattedTransactions;
  };

  useEffect(() => {
    var chartData: number[][] = [];
    var labels: string[] = [];

    if (props.postInfos && props.transactions) {
      const transactions = props.transactions.reduce(
        (acc: any[], info: any) => {
          const hasItem = acc.find((a) => a.postId === info.postId);
          if (hasItem) {
            const idx = acc.findIndex((a) => a.postId === info.postId);
            acc[idx].value += info.value;
          } else {
            acc.push(info);
          }

          return acc;
        },
        []
      );

      const postInfos = props.postInfos.sort((a, b) =>
        a.postTitle.localeCompare(b.postTitle)
      );

      for (let i = 0; i < postInfos.length; i++) {
        let transaction: TransactionsDocument[] = transactions.filter(
          (transaction: TransactionsDocument) =>
            transaction.postId === postInfos[i].postId
        );

        if (postInfos.length > 0) {
          labels.push(postInfos[i].postTitle);
        }

        if (!chartData[0]) {
          chartData[0] = [];
        }

        chartData[0].push(transaction[0]?.value);
      }

      labels.pop();

      const chartDiv = document.getElementById("contentChartDiv");

      if (labels.length > 6) {
        if (chartDiv?.style?.width) {
          const newWidth = 300 + (labels.length - 6) * 30;
          chartDiv.style.width = `${newWidth}px`;
        }
      }

      setBarChartData({
        labels,
        datasets: chartData
          .map((data, index) => {
            return {
              label: labels[index],
              data: formatTransaction(data),
              borderRadius: 6,
              backgroundColor: customColors[index],
              barThickness: 15,
            };
          })
          .flat()
          .flat(),
      } as any);
    }
  }, [props.postInfos, props.transactions]);

  return <Bar id="contentChartDiv" options={options} data={barChartData} />;
};

export default TransactionsPerContent;
