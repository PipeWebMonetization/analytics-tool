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
import { HeatMapGrid } from "react-grid-heatmap";
import { Flex } from "@chakra-ui/react";
import { useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options: any = {
  indexAxis: "y",
  responsive: true,
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
          return tooltipItem[0]["dataset"]["label"];
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
      display: false,
      grid: {
        display: false,
      },
    },
    y: {
      ticks: {
        mirror: true,
        labelOffset: 50,
      },
      display: false,
      grid: {
        display: false,
      },
    },
  },
};

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

const unformatTransaction = (transactionValue: number) => {
  if (transactionValue >= 2) {
    return Number(transactionValue - 1).toFixed(20);
  } else if (transactionValue < 2 && transactionValue >= 0.6) {
    return Number(transactionValue - 0.7).toFixed(20);
  } else {
    return Number(transactionValue - 0.5).toFixed(20);
  }
};

const customColors = [
  "#FFC52E",
  "#CC9300",
  "#FFB800",
  "#664A00",
  "#996E00",
  "#332500",
];

const initialBarData = {
  labels: [],
  datasets: [],
};

const xLabels = new Array(31).fill(0).map((_, i) => `${i}`);
const yLabels = [
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

const TransactionsPerYear = (props: {
  revenueStatistics: transactionsResults;
}) => {
  const [barChartData, setBarChartData] = useState(initialBarData);

  var data = new Array(yLabels.length)
    .fill(0)
    .map(() => new Array(xLabels.length).fill(0));

  var paymentPointers = new Array(yLabels.length)
    .fill(0)
    .map(() => new Array(xLabels.length).fill([]));

  const setPaymentPointerAmount = (
    month: number,
    dayOfMonth: number,
    amount: number,
    paymentPointer: string
  ) => {
    data[month][dayOfMonth] += amount;
    paymentPointers[month][dayOfMonth] = [
      ...paymentPointers[month][dayOfMonth],
      {
        pointer: paymentPointer,
        value: amount,
      },
    ];
  };

  const leapYear = () => {
    let year = new Date().getFullYear();
    return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
  };

  const getDaysOfMonth = (month: number) => {
    switch (month) {
      case 1:
        return leapYear() ? 29 : 28;
      case 2:
        return 31;
      case 3:
        return 30;
      case 4:
        return 31;
      case 5:
        return 30;
      case 6:
        return 31;
      case 7:
        return 31;
      case 8:
        return 30;
      case 9:
        return 31;
      case 10:
        return 30;
      case 11:
        return 31;
      default:
        return 0;
    }
  };

  const numberOfDays = leapYear() ? 366 : 365;

  if (props.revenueStatistics.yearData) {
    for (let i = 0; i < props.revenueStatistics.yearData.length; i++) {
      var monthIndex = 0;
      var dayOfMonth = 0;
      var daysOfCurrentMonth = 30;
      var daysOfPreviousMonth = -1;

      for (let dayIndex = 0; dayIndex < numberOfDays; dayIndex++) {
        if (dayIndex > daysOfPreviousMonth && dayIndex <= daysOfCurrentMonth) {
          if (props.revenueStatistics.yearData[i][dayIndex] != undefined) {
            let amount = Number(props.revenueStatistics.yearData[i][dayIndex]);
            setPaymentPointerAmount(
              monthIndex,
              dayOfMonth,
              amount,
              String(props.revenueStatistics.yearData[i].paymentPointer)
            );
          }
          dayOfMonth += 1;
          if (dayIndex == daysOfCurrentMonth) {
            daysOfPreviousMonth = daysOfCurrentMonth;
            monthIndex += 1;
            daysOfCurrentMonth += getDaysOfMonth(monthIndex);
            dayOfMonth = 0;
          }
        }
      }
    }
  }

  const getDayOfYear = (x: any, y: any) => {
    const reducedArray = paymentPointers[x][y].reduce(
      (acc: any[], info: any) => {
        const hasItem = acc.find((a) => a.pointer === info.pointer);
        if (hasItem) {
          const idx = acc.findIndex((a) => a.pointer === info.pointer);
          acc[idx].value += info.value;
        } else {
          acc.push(info);
        }

        return acc;
      },
      []
    );

    let chartData: number[][] = [];
    let labels = [""];

    for (let i = 0; i < reducedArray.length; i++) {
      if (!chartData[i]) {
        chartData[i] = [];
      }
      chartData[i].push(reducedArray[i].value);
    }

    setBarChartData({
      labels,
      datasets: chartData.map((data, index) => {
        return {
          label: reducedArray[index].pointer.slice(0, -5) ?? "Pointer",
          data: formatTransaction(data),
          borderRadius: 6,
          backgroundColor: customColors[index],
        };
      }),
    } as any);
  };

  const calculateOpacity = (ratio: number) => {
    if (ratio > 0 && ratio < 0.02) {
      return 0.3;
    }
    return ratio;
  };

  return (
    <Flex
      flexDir={"row"}
      w={"65vw"}
      alignItems={"center"}
      alignSelf={"center"}
      justifyContent={"space-between"}
    >
      <Flex>
        <HeatMapGrid
          data={data}
          xLabels={xLabels}
          yLabels={yLabels}
          xLabelsStyle={(index) => ({
            color: index % 2 ? "transparent" : "#777",
            fontSize: ".8rem",
          })}
          yLabelsStyle={() => ({
            fontSize: ".7rem",
            textTransform: "uppercase",
            color: "#777",
          })}
          cellStyle={(_x, _y, ratio) => {
            const opacity = calculateOpacity(ratio);
            return {
              background: `rgba(255, 193, 33, ${opacity})`,
              fontSize: ".8rem",
              color: `rgb(255, 193, 33, ${ratio * 10})`,
            };
          }}
          cellHeight="1rem"
          xLabelsPos="top"
          yLabelsPos="left"
          onClick={getDayOfYear}
          square
        />
      </Flex>
      <Flex w={"20vw"}>
        <Bar options={options} data={barChartData} />
      </Flex>
    </Flex>
  );
};

export default TransactionsPerYear;
