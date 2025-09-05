"use client";
import categoriesData from "@/public/data/categoriesData";
import productsData from "@/public/data/productsData";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { FaChartBar, FaChartLine, FaHourglassHalf } from "react-icons/fa";
import { MdDangerous } from "react-icons/md";
import { PiWarningFill } from "react-icons/pi";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement
} from "chart.js";
import { GrPieChart } from "react-icons/gr";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
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

const barChartLabels = [...categoriesData.map((cat) => cat.name)];

const barChartData = {
  labels: barChartLabels,
  datasets: [
    {
      label: "Categories",
      data: barChartLabels.map(() => Math.floor(Math.random() * 1001)),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const doughnutChartData = {
  labels: ["Red", "Yellow"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19],
      backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(255, 206, 86, 0.2)"],
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

const lineChartLabels = [...productsData.map((prod) => prod.name).slice(0, 7)];

const lineChartData = {
  labels: lineChartLabels,
  datasets: [
    {
      label: "Dataset 1",
      data: lineChartLabels.map(() => Math.floor(Math.random() * 1001)),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

export default function LowStockAlerts() {
  return (
    <main className="p-8">
      <h3 className="text-2xl font-medium my-6">Stock Levels</h3>
      <div className="flex flex-row items-center justify-between mb-6 gap-4 flex-wrap">
        <div className="flex flex-row items-center gap-4 flex-wrap">
          <select className="bg-white border border-gray-300 rounded-md px-2 py-2">
            <option>Today</option>
            <option>Last 7 days</option>
            <option>This Month</option>
            <option>Custom</option>
          </select>
          <select className="bg-white border border-gray-300 rounded-md px-2 py-2">
            <option>All Categories</option>
            <option>Medicine</option>
            <option>Equipment</option>
            <option>Consumables</option>
          </select>
          <select className="bg-white border border-gray-300 rounded-md px-2 py-2">
            <option>All Suppliers</option>
            <option>Supplier A</option>
            <option>Supplier B</option>
            <option>Supplier C</option>
          </select>
          <input
            type="text"
            placeholder="Search by name or SKU"
            className="bg-white border border-gray-300 rounded-md px-2 py-2 min-w-[200px]"
          />
        </div>
        <div className="flex flex-row gap-2">
          <Link
            href="/"
            className="bg-blue-500 hover:bg-transparent text-white hover:text-blue-500 border border-blue-500 px-2 py-1 rounded-md"
          >
            Create Purchase Order
          </Link>
          <Link
            href="/"
            className="bg-yellow-500 hover:bg-transparent text-white hover:text-yellow-500 border border-yellow-500 px-2 py-1 rounded-md"
          >
            Snooze Alert
          </Link>
          <Link
            href="/"
            className="bg-green-500 hover:bg-transparent text-white hover:text-green-500 border border-green-500 px-2 py-1 rounded-md"
          >
            Mark as Resolved
          </Link>
        </div>
      </div>

      <div className="my-6 w-full flex flex-row justify-between gap-4">
        <div className="w-full bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between">
          <div className="flex flex-row justify-end items-center">
            <PiWarningFill className="mr-2 text-xl text-green-500" />
            <h4 className="text-lg font-normal">Total Low Stock</h4>
          </div>
          <h3 className="text-2xl font-semibold">10,000</h3>
        </div>
        <div className="w-full bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between">
          <div className="flex flex-row justify-end items-center">
            <MdDangerous className="mr-2 text-2xl text-red-500" />
            <h4 className="text-lg font-normal">Total Stock Out</h4>
          </div>
          <h3 className="text-2xl font-semibold">10,000</h3>
        </div>
        <div className="w-full bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between">
          <div className="flex flex-row justify-end items-center">
            <FaHourglassHalf className="mr-2 text-xl text-yellow-500" />
            <h4 className="text-lg font-normal">Avg Days in Low Stock</h4>
          </div>
          <h3 className="text-2xl font-semibold">5</h3>
        </div>
        <div className="w-full bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between">
          <div className="flex flex-row justify-end items-center">
            <FaChartLine className="mr-2 text-xl text-orange-500" />
            <h4 className="text-lg font-normal">Most Critical Category</h4>
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
            <h3 className="text-lg font-semibold">Medicine</h3>
          </Link>
        </div>
      </div>

      <div className="w-full bg-white rounded-2xl shadow-md p-6">
        <h4 className="text-lg font-semibold mb-4">Stock Details</h4>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-300 text-gray-500">
              <th colSpan={3} className="px-2 py-2 font-normal text-center">
                Product
              </th>
              <th className="px-2 py-2 font-normal">Current Stock</th>
              <th className="px-2 py-2 font-normal">Low Stock Threshold</th>
              <th className="px-2 py-2 font-normal">Status</th>
              <th className="px-2 py-2 font-normal">Last Stock In</th>
              <th className="px-2 py-2 font-normal">Supplier</th>
              <th className="px-2 py-2 font-normal text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {productsData.map((product) => (
              <tr
                key={product.id}
                className={`border-b border-gray-300 bg-${
                  product.stockQty % 4 == 0
                    ? "yellow"
                    : product.stockQty % 2 == 0
                    ? "red"
                    : "orange"
                }-500 hover:bg-gray-50`}
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
                    {product.name} [{product.sku}]
                  </Link>
                </td>
                <td className="px-2 py-4 font-medium">{product.category}</td>
                <td className="px-2 py-4">{product.stockQty}</td>
                <td className="px-2 py-4">{100 - product.stockQty}</td>
                <td
                  className={`px-2 py-4 text-${
                    product.stockQty % 4 == 0
                      ? "yellow"
                      : product.stockQty % 2 == 0
                      ? "red"
                      : "orange"
                  }-500`}
                >
                  <span className="bg-white px-2 py-1 rounded-full text-sm font-medium">
                    {product.stockQty % 4 == 0
                      ? "Low"
                      : product.stockQty % 2 == 0
                      ? "Out"
                      : "Critical"}
                  </span>
                </td>
                <td className="px-2 py-4">12 Aug, 2025</td>
                <td className="px-2 py-4">Supplier Name</td>
                <td className="px-2 py-4 flex justify-center gap-4">
                  <Link
                    href={"/"}
                    className="bg-blue-200 px-2 py-1 rounded-md hover:bg-white"
                  >
                    Reorder
                  </Link>
                  <Link
                    href={"/"}
                    className="bg-yellow-200 px-2 py-1 rounded-md hover:bg-white"
                  >
                    Snooze
                  </Link>
                  <Link
                    href={"/"}
                    className="bg-green-200 px-2 py-1 rounded-md hover:bg-white"
                  >
                    Resolved
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
            <FaChartBar className="mr-6 text-xl" />
            <h4 className="text-lg font-semibold">Stock Value</h4>
          </div>
          <Bar options={barChartOptions} data={barChartData} />
        </div>
        <div className="w-1/3 aspect-square bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between">
          <div className="mb-4 flex flex-row justify-start items-center">
            <GrPieChart className="mr-6 text-xl" />
            <h4 className="text-lg font-semibold">Stock Distribution</h4>
          </div>
          <Doughnut data={doughnutChartData} />
        </div>
      </div>

      <div className="w-full h-full bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between">
        <div className="mb-4 flex flex-row justify-start items-center">
          <FaChartLine className="mr-6 text-xl" />
          <h4 className="text-lg font-semibold">Daily Stock In vs Stock Out</h4>
        </div>
        <Line options={lineChartOptions} data={lineChartData} />
      </div>
    </main>
  );
}
