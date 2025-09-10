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
    <main className="p-8">
      <h3 className="text-2xl font-medium my-6">Stock Levels</h3>
      <div className="my-6 w-full flex flex-row justify-between gap-4">
        <div className="w-full bg-white rounded-2xl shadow-md p-4 flex flex-row justify-between items-center gap-4">
          <div className="flex flex-row justify-start items-center gap-4">
            <FaChartBar className="text-2xl text-green-500 flex flex-row justify-start items-center gap-4" />
            <h4 className="text-lg font-normal text-end">In Stock</h4>
          </div>
          <h3 className="text-md font-semibold text-end">+ 10,000</h3>
        </div>
        <div className="w-full bg-white rounded-2xl shadow-md p-4 flex flex-row justify-between items-center gap-4">
          <div className="flex flex-row justify-start items-center gap-4">
            <FaChartBar className="text-2xl text-yellow-500 flex flex-row justify-start items-center gap-4" />
            <h4 className="text-lg font-normal text-end">Low Stock</h4>
          </div>
          <h3 className="text-md font-semibold text-end">+ 10,000</h3>
        </div>
        <div className="w-full bg-white rounded-2xl shadow-md p-4 flex flex-row justify-between items-center gap-4">
          <div className="flex flex-row justify-start items-center gap-4">
            <FaChartBar className="text-2xl text-red-500 flex flex-row justify-start items-center gap-4" />
            <h4 className="text-lg font-normal text-end">Out Of Stock</h4>
          </div>
          <h3 className="text-md font-semibold text-end">- 10,000</h3>
        </div>
        <div className="w-full bg-white rounded-2xl shadow-md p-4 flex flex-row justify-between items-center gap-4">
          <div className="flex flex-row justify-start items-center gap-4">
            <FaHourglassHalf className="text-2xl text-yellow-500 flex flex-row justify-start items-center gap-4" />
            <h4 className="text-lg font-normal text-end">Expiring Soon</h4>
          </div>
          <h3 className="text-md font-semibold text-end">+ 10,000</h3>
        </div>
      </div>

      <div className="my-6 w-full flex flex-row justify-between gap-4">
        <KpiCard title="Total Tracked" value="+ 10,000" trend={70} />
        <KpiCard
          title="Total Stock Units on Hand"
          value="+ 10,000"
          trend={70}
        />
        <KpiCard title="Low or Out of Stock" value="- 10,000" trend={-70} />
        <KpiCard title="Total Stock Value" value="$ 10,000" trend={70} />
      </div>
      <div className="w-full bg-white rounded-2xl shadow-md p-6">
        <h4 className="text-lg font-semibold mb-4">Stock Details</h4>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-300 text-gray-500">
              <th colSpan={2} className="px-2 py-2 font-normal text-center">
                Product
              </th>
              <th className="px-2 py-2 font-normal">Stock</th>
              <th className="px-2 py-2 font-normal">Reorder Point</th>
              <th className="px-2 py-2 font-normal">Expiry</th>
              <th className="px-2 py-2 font-normal text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {productsData.map((product) => (
              <tr
                key={product.id}
                className="border-b border-gray-300 hover:bg-gray-50"
              >
                <td className="px-2 py-4">
                  <Link href={`/dashboard/products/${product.id}`}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={60}
                      height={40}
                      className="aspect-3/2 object-cover rounded-lg"
                    />
                  </Link>
                </td>
                <td className="px-2 py-4 font-medium">
                  <Link href={`/dashboard/products/${product.id}`}>
                    {product.name}
                  </Link>
                </td>
                <td className="px-2 py-4">{product.stockQty}</td>
                <td className="px-2 py-4">{100 - product.stockQty}</td>
                <td className="px-2 py-4">12 Sep 2025</td>
                <td className="px-2 py-4 flex justify-center gap-4">
                  <Link
                    href={"/"}
                    className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white"
                  >
                    {product.stockQty % 2 == 0 ? "Reorder" : "Stock In"}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="w-full my-6 flex flex-row justify-between items-start gap-6">
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
