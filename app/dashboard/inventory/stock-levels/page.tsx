"use client";

import productsData from "@/public/data/productsData";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { FaHourglassHalf, FaChartBar, FaCaretUp } from "react-icons/fa6";
import { GrPieChart } from "react-icons/gr";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import KpiCard from "@/components/ui/KpiCard";
import { StockLevelsTable } from "./components/StockLevelsTable";
import { StockLevelsList } from "./components/StockLevelsList/StockLevelsList";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
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

export default function StockLevels() {
  return (
    <main className="p-4 md:p-8">
      <h3 className="text-2xl font-medium my-6">Stock Levels</h3>
      <div className="my-6 w-full flex flex-col md:flex-row justify-between gap-4">
        <KpiCard
          title="In Stock"
          value="+ 10,000"
          icon={<FaChartBar className="text-xl text-green-500" />}
        />
        <KpiCard
          title="Low Stock"
          value="+ 10,000"
          icon={<FaChartBar className="text-xl text-yellow-500" />}
        />
        <KpiCard
          title="Out Of Stock"
          value="- 10,000"
          icon={<FaChartBar className="text-xl text-red-500" />}
        />
        <KpiCard
          title="Expiring Soon"
          value="+ 10,000"
          icon={<FaHourglassHalf className="text-xl text-yellow-500" />}
        />
      </div>

      <div className="my-6 w-full flex flex-col md:flex-row justify-between gap-4">
        <KpiCard title="Total Tracked" value="+ 10,000" trend={70} />
        <KpiCard
          title="Total Stock Units on Hand"
          value="+ 10,000"
          trend={70}
        />
        <KpiCard title="Low or Out of Stock" value="- 10,000" trend={-70} />
        <KpiCard title="Total Stock Value" value="$ 10,000" trend={70} />
      </div>

      <StockLevelsTable data={productsData} />
      <StockLevelsList data={productsData} />

      <div className="w-full my-6 flex flex-col md:flex-row justify-between items-start gap-6">
        <div className="w-full h-full bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between">
          <div className="mb-4 flex flex-row justify-start items-center">
            <GrPieChart className="mr-6 text-xl" />
            <h4 className="text-lg font-semibold">Stock Distribution</h4>
          </div>
          <Doughnut data={doughnutChartData} />
        </div>
        <div className="w-full h-full bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between">
          <div className="mb-4 flex flex-row justify-start items-center">
            <FaChartBar className="mr-6 text-xl" />
            <h4 className="text-lg font-semibold">Stock Value</h4>
          </div>
          <Bar options={barChartOptions} data={barChartData} />
        </div>
      </div>
    </main>
  );
}
