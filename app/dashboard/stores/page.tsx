"use client";
import KpiCard from "@/components/ui/KpiCard";
import ordersData from "@/public/data/ordersData";
import * as React from "react";
import {
    FaChartBar,
    FaChartLine,
    FaHourglassHalf,
    FaStore,
} from "react-icons/fa";
import { FaBoxesStacked, FaMoneyBill1Wave } from "react-icons/fa6";
import { TiWarning } from "react-icons/ti";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    PointElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    LineElement,
} from "chart.js";
import { GrPieChart } from "react-icons/gr";
import { StoresList } from "./components/StoresList/StoresList";
import { StoresTable } from "./components/StoresTable";
import Link from "next/link";
import { useStores } from "@/lib/hooks/stores/useStores";
ChartJS.register(
    ArcElement,
    PointElement,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title
);

const barChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: "top" as const,
        },
        title: {
            display: true,
            text: "Chart.js Bar Chart",
        },
    },
};

const barChartLabels = ["Store A", "Store B", "Store C", "Store D", "Store E"];

const barChartData = {
    labels: barChartLabels,
    datasets: [
        {
            label: "Dataset 1",
            data: barChartLabels.map(() => Math.floor(Math.random() * 1001)),
            backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
    ],
};

const doughnutChartData = {
    labels: ["Red", "Yellow"],
    datasets: [
        {
            label: "# of Votes",
            data: [12, 19],
            backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(255, 206, 86, 0.2)",
            ],
            borderColor: ["rgba(255, 99, 132, 1)", "rgba(255, 206, 86, 1)"],
            borderWidth: 1,
        },
    ],
};

const lineChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: "top" as const,
        },
        title: {
            display: true,
            text: "Chart.js Line Chart",
        },
    },
};

const lineChartLabels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
];

const lineChartData = {
    labels: lineChartLabels,
    datasets: [
        {
            label: "Dataset 1",
            data: lineChartLabels.map(() => Math.floor(Math.random() * 1001)),
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
            label: "Dataset 2",
            data: lineChartLabels.map(() => Math.floor(Math.random() * 1001)),
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
    ],
};

export default function BranchOverview() {
    const { data: stores } = useStores();

    return (
        <main className="p-4 md:p-8">
            <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 w-full flex flex-row justify-between items-center">
                <h3 className="text-2xl font-medium">Branch Overview</h3>
                <Link
                    href="/dashboard/stores/add"
                    className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md"
                >
                    Add Branch
                </Link>
            </div>
            <div className="my-6 w-full flex flex-col md:flex-row justify-between gap-4">
                <KpiCard
                    title="Total Branches"
                    icon={<FaStore className="mr-2 text-xl text-blue-500" />}
                    value="+ 10,000"
                />
                <KpiCard
                    title="Total Sales"
                    icon={
                        <FaMoneyBill1Wave className="mr-2 text-xl text-green-500" />
                    }
                    value="$ 10,000"
                />
                <KpiCard
                    title="Total Stock Value"
                    icon={
                        <FaBoxesStacked className="mr-2 text-xl text-orange-500" />
                    }
                    value="+ 10,000"
                />
                <KpiCard
                    title="Low Stock Alerts"
                    icon={
                        <TiWarning className="mr-2 text-xl text-yellow-500" />
                    }
                    value="+ 10,000"
                />
                <KpiCard
                    title="Pending Orders"
                    icon={
                        <FaHourglassHalf className="mr-2 text-xl text-gray-500" />
                    }
                    value="- 10,000"
                />
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6">
                <input
                    type="text"
                    placeholder="Search stores..."
                    className="border border-gray-300 rounded-md px-2 py-1 w-full md:w-2/5"
                />
                <StoresTable data={stores} />
                <StoresList data={ordersData} />
            </div>
            <div className="w-full my-6 flex flex-col md:flex-row justify-between items-start gap-6">
                <div className="w-full h-full bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between">
                    <div className="mb-4 flex flex-row justify-start items-center">
                        <FaChartBar className="mr-6 text-xl" />
                        <h4 className="text-lg font-semibold">
                            Sales by Branch
                        </h4>
                    </div>
                    <Bar options={barChartOptions} data={barChartData} />
                </div>
                <div className="w-full md:w-1/3 aspect-square bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between">
                    <div className="mb-4 flex flex-row justify-start items-center">
                        <GrPieChart className="mr-6 text-xl" />
                        <h4 className="text-lg font-semibold">
                            Inventory Value Comparison
                        </h4>
                    </div>
                    <Doughnut data={doughnutChartData} />
                </div>
            </div>
            <div className="w-full h-full bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between">
                <div className="mb-4 flex flex-row justify-start items-center">
                    <FaChartLine className="mr-6 text-xl" />
                    <h4 className="text-lg font-semibold">Low Stock Trend</h4>
                </div>
                <Line options={lineChartOptions} data={lineChartData} />
            </div>
        </main>
    );
}
