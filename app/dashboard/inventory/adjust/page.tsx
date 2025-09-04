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
import { FaBalanceScaleLeft } from "react-icons/fa";
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

export default function InventoryAdjustStocks() {
  return (
    <main className="p-8">
      <h3 className="text-2xl font-medium my-6">Stock Levels</h3>

      <div className="my-6 w-full flex flex-row justify-between gap-4">
        <div className="w-full bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between">
          <div className="flex flex-row justify-between items-center">
            <FaChartBar className="mr-6 text-xl text-green-500" />
            <h4 className="text-lg font-normal">Total Stock In</h4>
          </div>
          <h3 className="text-2xl font-semibold">+ 10,000</h3>
          <span className="text-sm text-green-500 flex items-center">
            <FaCaretUp /> 70%
          </span>
        </div>
        <div className="w-full bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between">
          <div className="flex flex-row justify-between items-center">
            <FaChartBar className="mr-6 text-xl text-red-500" />
            <h4 className="text-lg font-normal">Total Stock Out</h4>
          </div>
          <h3 className="text-2xl font-semibold">+ 10,000</h3>
          <span className="text-sm text-green-500 flex items-center">
            <FaCaretUp /> 70%
          </span>
        </div>
        <div className="w-full bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between">
          <div className="flex flex-row justify-between items-center">
            <FaBalanceScaleLeft className="mr-6 text-xl text-yellow-500" />
            <h4 className="text-lg font-normal">Net Movement</h4>
          </div>
          <h3 className="text-2xl font-semibold">+ 10,000</h3>
          <span className="text-sm text-green-500 flex items-center">
            <FaCaretUp /> 70%
          </span>
        </div>
        <div className="w-full bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between">
          <div className="flex flex-row justify-between items-center">
            <FaHourglassHalf className="mr-6 text-xl text-orange-500" />
            <h4 className="text-lg font-normal">Recent Transactions</h4>
          </div>
          <Link
            href="/"
            className="flex flex-row justify-between items-center my-2"
          >
            <Image
              src="https://globalcare.com.bd/public/uploads/all/u0KM6G8OypRGBAJ1YxNk0mbpi9zhEbRWfa1ogSm0.jpg"
              alt="Sergel 20mg"
              width={60}
              height={40}
              className="aspect-3/2 object-cover rounded-lg"
            />
            <h3 className="text-lg font-semibold">Sergel 20mg</h3>
          </Link>
          <Link href="/" className="text-sm text-blue-500 flex items-center">
            See More
          </Link>
        </div>
      </div>
      <div className="w-full bg-white rounded-2xl shadow-md p-6">
        <h4 className="text-lg font-semibold mb-4">Stock Details</h4>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-300 text-gray-500">
              <th className="px-2 py-2 font-normal">Date & Time</th>
              <th colSpan={2} className="px-2 py-2 font-normal text-center">
                Product
              </th>
              <th className="px-2 py-2 font-normal">Transaction Type</th>
              <th className="px-2 py-2 font-normal">Quantity</th>
              <th className="px-2 py-2 font-normal">Value</th>
              <th className="px-2 py-2 font-normal">Source / Destination</th>
              <th className="px-2 py-2 font-normal">Entered By</th>
              <th className="px-2 py-2 font-normal text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {productsData.map((product) => (
              <tr
                key={product.id}
                className="border-b border-gray-300 hover:bg-gray-50"
              >
                <td className="px-2 py-4">12 Aug, 2025</td>
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
                    {product.name} [{product.sku}]
                  </Link>
                </td>
                <td className="px-2 py-4">
                  {product.stockQty % 2 == 0 ? "Stock In" : "Stock Out"}
                </td>
                <td className="px-2 py-4">{product.stockQty}</td>
                <td className="px-2 py-4">
                  {product.stockQty * product.price}
                </td>
                <td className="px-2 py-4">
                  {product.stockQty % 2 == 0 ? "Supplier Name" : "Sale"}
                </td>
                <td className="px-2 py-4">Staff Name</td>
                <td className="px-2 py-4 flex justify-center gap-4">
                  <Link
                    href={"/"}
                    className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white"
                  >
                    View
                  </Link>
                  <Link
                    href={"/"}
                    className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white"
                  >
                    Edit
                  </Link>
                  <Link
                    href={"/"}
                    className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white"
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
