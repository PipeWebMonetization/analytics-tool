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

const labels = ['2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'];

const TransactionsPerYear = (props: { revenueStatistics: transactionsResults }) => {
    let chartData = [];

    // Insert data into chartData
    if (props.revenueStatistics.perMonth) {
        let sumValue = 0;
        for (let index = 1; index < 13; index++) {
            if (props.revenueStatistics.perMonth[index]) {
                sumValue += props.revenueStatistics.perMonth[index];
            }

        }
        chartData.push(sumValue);
    }

    // Define the chart data object
    const data = {
        labels,
        datasets: [
            {
                label: "Revenue",
                data: chartData,
                backgroundColor: "#FFC121",
            },
        ],
    };

    return <Bar options={options} data={data} />;
}

export default TransactionsPerYear;