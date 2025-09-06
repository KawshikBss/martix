"use client";

import productsData from "@/public/data/productsData";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import {
  FaBox,
  FaBoxOpen,
  FaChartBar,
  FaChartLine,
  FaTrophy,
} from "react-icons/fa";
import { FaMoneyBill1Wave, FaPerson, FaUserGroup } from "react-icons/fa6";
import { GrPieChart } from "react-icons/gr";
import { Bar, Doughnut, Line } from "react-chartjs-2";
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
  LineElement,
} from "chart.js";
import categoriesData from "@/public/data/categoriesData";
import { BiLineChart, BiLineChartDown } from "react-icons/bi";
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
    {
      label: "Categories",
      data: barChartLabels.map(() => Math.floor(Math.random() * 1001)),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
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

export default function ProfitLossReport() {
  return (
    <main className="p-8">
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="w-full flex flex-row justify-between items-center">
          <h3 className="text-2xl font-medium">Profit & Loss</h3>
          <button className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md">
            Print
          </button>
        </div>
        <div className="mt-4 flex flex-row justify-between">
          <div className="flex flex-row gap-4">
            <select className="bg-white border border-gray-300 rounded-md px-2 py-2">
              <option>Today</option>
              <option>Last 7 days</option>
              <option>This Month</option>
              <option>Custom</option>
            </select>
            <select className="bg-white border border-gray-300 rounded-md px-2 py-2">
              <option>All</option>
              <option>Medicine</option>
              <option>Electronics</option>
              <option>Home</option>
            </select>
            <select className="bg-white border border-gray-300 rounded-md px-2 py-2">
              <option>All Customers</option>
              <option>Customer A</option>
              <option>Customer B</option>
              <option>Customer C</option>
            </select>
            <select className="bg-white border border-gray-300 rounded-md px-2 py-2">
              <option>All</option>
              <option>POS</option>
              <option>Online</option>
              <option>Wholesale</option>
            </select>
          </div>
        </div>
      </div>
      <div className="my-6 w-full flex flex-row justify-between gap-4">
        <div className="w-full bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between items-start gap-4">
          <div className="w-full flex flex-row justify-end items-start gap-4">
            <FaMoneyBill1Wave className="text-2xl text-green-500 flex flex-row justify-start items-center gap-4" />
            <h4 className="text-md font-normal text-end">Total Sales</h4>
          </div>
          <h3 className="text-xl font-semibold text-end">$ 10,000</h3>
        </div>
        <div className="w-full bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between items-start gap-4">
          <div className="w-full flex flex-row justify-end items-start gap-4">
            <BiLineChartDown className="text-2xl text-blue-500 flex flex-row justify-start items-center gap-4" />
            <h4 className="text-md font-normal text-end">Cost Of Goods Sold</h4>
          </div>
          <h3 className="text-xl font-semibold text-end">$ 10,000</h3>
        </div>
        <div className="w-full bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between items-start gap-4">
          <div className="w-full flex flex-row justify-end items-start gap-4">
            <BiLineChart className="text-2xl text-orange-500 flex flex-row justify-start items-center gap-4" />
            <h4 className="text-md font-normal text-end">Gross Profit</h4>
          </div>
          <h3 className="text-xl font-semibold text-end">$ 10,000</h3>
        </div>
        <div className="w-full bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between items-start gap-4">
          <div className="w-full flex flex-row justify-end items-start gap-4">
            <FaTrophy className="text-2xl text-yellow-500 flex flex-row justify-start items-center gap-4" />
            <h4 className="text-md font-normal text-end">Most Profitable</h4>
          </div>
          <Link
            href="/"
            className="flex flex-row justify-between gap-4 items-center"
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
        </div>
        <div className="w-full bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between items-start gap-4">
          <div className="w-full flex flex-row justify-end items-start gap-4">
            <FaBoxOpen className="text-2xl text-red-500 flex flex-row justify-start items-center gap-4" />
            <h4 className="text-md font-normal text-end">Least Profitable</h4>
          </div>
          <Link
            href="/"
            className="flex flex-row justify-between gap-4 items-center"
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
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-2xl font-medium">Detailed View</h3>
        <input
          type="text"
          placeholder="Search products..."
          className="border border-gray-300 rounded-md px-2 py-1 my-4 w-full"
        />
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-300 text-gray-500">
              <th colSpan={2} className="px-2 py-2 font-normal text-center">
                Product
              </th>
              <th className="px-2 py-2 font-normal">Units Sold</th>
              <th className="px-2 py-2 font-normal">Revenue</th>
              <th className="px-2 py-2 font-normal">COGS</th>
              <th className="px-2 py-2 font-normal">Profit</th>
              <th className="px-2 py-2 font-normal">Margin</th>
            </tr>
          </thead>
          <tbody>
            {productsData.map((product, index) => (
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
                <td className="px-2 py-4">
                  {product.price * product.stockQty}
                </td>
                <td className="px-2 py-4">
                  {product.price * product.stockQty}
                </td>
                <td className="px-2 py-4">
                  {product.price * product.stockQty}
                </td>
                <td className="px-2 py-4">51%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="w-full my-6 flex flex-row justify-between items-start gap-6">
        <div className="w-1/2 bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between">
          <div className="mb-4 flex flex-row justify-start items-center">
            <FaChartBar className="mr-6 text-xl" />
            <h4 className="text-lg font-semibold">Profit Trend</h4>
          </div>
          <Bar options={barChartOptions} data={barChartData} />
        </div>
        <div className="w-1/2 bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between">
          <div className="mb-4 flex flex-row justify-start items-center">
            <FaChartLine className="mr-6 text-xl" />
            <h4 className="text-lg font-semibold">Profit by Category</h4>
          </div>
          <Line options={lineChartOptions} data={lineChartData} />
        </div>
      </div>

      <div className="w-full my-6 flex flex-row justify-between items-start gap-6">
        <div className="w-5/7 bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between">
          <div className="mb-4 flex flex-row justify-start items-center">
            <FaChartBar className="mr-6 text-xl" />
            <h4 className="text-lg font-semibold">Top 10 Products by Profit</h4>
          </div>
          <Bar
            options={{ ...barChartOptions, indexAxis: "y" }}
            data={barChartData}
          />
        </div>
        <div className="w-2/7 aspect-square bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between">
          <div className="mb-4 flex flex-row justify-start items-center">
            <GrPieChart className="mr-6 text-xl" />
            <h4 className="text-lg font-semibold">
              Profit Margin Distribution
            </h4>
          </div>
          <Doughnut data={doughnutChartData} />
        </div>
      </div>
    </main>
  );
}
