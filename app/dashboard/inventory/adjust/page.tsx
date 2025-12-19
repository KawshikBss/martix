"use client";

import productsData from "@/public/data/productsData";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import {
    FaHourglassHalf,
    FaChartBar,
    FaCaretUp,
    FaChartLine,
} from "react-icons/fa6";
import { Bar, Line } from "react-chartjs-2";
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
import { FaBalanceScaleLeft } from "react-icons/fa";
import KpiCard from "@/components/ui/KpiCard";
import { StockAdjustmentsTable } from "./components/StockAdjustmentsTable";
import { StockAdjustmentsList } from "./components/StockAdjustmentsList/StockAdjustmentsList";
import { useInventoryMovements } from "@/lib/hooks/inventories/useInventoryMovements";
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

const doughnutChartData = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
        {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
        },
    ],
};

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

const barChartLabels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
];

const barChartData = {
    labels: barChartLabels,
    datasets: [
        {
            label: "Dataset 1",
            data: barChartLabels.map(() => Math.floor(Math.random() * 1001)),
            backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
            label: "Dataset 2",
            data: barChartLabels.map(() => Math.floor(Math.random() * 1001)),
            backgroundColor: "rgba(53, 162, 235, 0.5)",
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

const horizontalBarChartLabels = [
    ...productsData.map((product) => product.name),
];

const horizontalBarChartData = {
    labels: horizontalBarChartLabels,
    datasets: [
        {
            label: "Dataset 1",
            data: horizontalBarChartLabels.map(() =>
                Math.floor(Math.random() * 1001)
            ),
            backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
            label: "Dataset 2",
            data: horizontalBarChartLabels.map(() =>
                Math.floor(Math.random() * 1001)
            ),
            backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
    ],
};

export default function InventoryAdjustStocks() {
    const { data: inventoryMovements, isLoading: inventoryMovementsIsLoading } =
        useInventoryMovements();

    return (
        <main className="p-4 md:p-8">
            <h3 className="text-2xl font-medium my-6">Inventory Movements</h3>
            <div className="flex flex-row items-center justify-between mb-6 gap-4 flex-wrap">
                {/* Filters */}
                <div className="flex flex-row items-center gap-4 flex-wrap">
                    {/* Date Range Picker */}
                    <select className="bg-white border border-gray-300 rounded-md px-2 py-2">
                        <option>Today</option>
                        <option>Last 7 days</option>
                        <option>This Month</option>
                        <option>Custom</option>
                    </select>
                    {/* Type Filter */}
                    <select className="bg-white border border-gray-300 rounded-md px-2 py-2">
                        <option>All</option>
                        <option>Stock In</option>
                        <option>Stock Out</option>
                    </select>
                    {/* Category Filter */}
                    <select className="bg-white border border-gray-300 rounded-md px-2 py-2">
                        <option>All Categories</option>
                        <option>Medicine</option>
                        <option>Equipment</option>
                        <option>Consumables</option>
                    </select>
                    {/* Search Bar */}
                    <input
                        type="text"
                        placeholder="Search by name, SKU, or supplier"
                        className="bg-white border border-gray-300 rounded-md px-2 py-2 min-w-[300px]"
                    />
                </div>
                {/* Quick Actions */}
                <div className="flex flex-row gap-2">
                    <Link
                        href="/"
                        className="bg-green-500 hover:bg-transparent text-white hover:text-green-500 border border-green-500 px-2 py-1 rounded-md"
                    >
                        + Add Stock In
                    </Link>
                    <Link
                        href="/"
                        className="bg-red-500 hover:bg-transparent text-white hover:text-red-500 border border-red-500 px-2 py-1 rounded-md"
                    >
                        - Record Stock Out
                    </Link>
                </div>
            </div>
            <div className="my-6 w-full flex flex-col md:flex-row justify-between gap-4">
                <KpiCard
                    title="Total Stock In"
                    icon={
                        <FaChartBar className="mr-6 text-xl text-green-500" />
                    }
                    value="+ 10,000"
                    trend={70}
                />
                <KpiCard
                    title="Total Stock Out"
                    icon={<FaChartBar className="mr-6 text-xl text-red-500" />}
                    value="- 10,000"
                    trend={-70}
                />
                <KpiCard
                    title="Net Movement"
                    icon={
                        <FaBalanceScaleLeft className="mr-6 text-xl text-yellow-500" />
                    }
                    value="+ 10,000"
                    trend={70}
                />
                <KpiCard
                    title="Recent Transactions"
                    icon={
                        <FaHourglassHalf className="mr-6 text-xl text-orange-500" />
                    }
                    product={{
                        name: productsData[0].name,
                        image: productsData[0].image,
                        id: productsData[0].id.toString(),
                    }}
                    seeMoreLink="/"
                />
            </div>

            <StockAdjustmentsTable
                data={inventoryMovements}
                isLoading={inventoryMovementsIsLoading}
            />
            <StockAdjustmentsList data={productsData} />

            <div className="w-full my-6 flex flex-col md:flex-row justify-between items-start gap-6">
                <div className="w-full h-full bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between">
                    <div className="mb-4 flex flex-row justify-start items-center">
                        <FaChartBar className="mr-6 text-xl" />
                        <h4 className="text-lg font-semibold">
                            Daily Stock In vs Stock Out
                        </h4>
                    </div>
                    <Bar options={barChartOptions} data={barChartData} />
                </div>
                <div className="w-full h-full bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between">
                    <div className="mb-4 flex flex-row justify-start items-center">
                        <FaChartLine className="mr-6 text-xl" />
                        <h4 className="text-lg font-semibold">
                            Daily Stock In vs Stock Out
                        </h4>
                    </div>
                    <Line options={lineChartOptions} data={lineChartData} />
                </div>
            </div>
            <div className="w-full h-full bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between">
                <div className="mb-4 flex flex-row justify-start items-center">
                    <FaChartBar className="mr-6 text-xl" />
                    <h4 className="text-lg font-semibold">
                        Top 5 Products by Stock In/Out
                    </h4>
                </div>
                <Bar
                    options={{ ...barChartOptions, indexAxis: "y" }}
                    data={horizontalBarChartData}
                />
            </div>
        </main>
    );
}
