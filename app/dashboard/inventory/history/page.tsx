"use client";
import categoriesData from "@/public/data/categoriesData";
import productsData from "@/public/data/productsData";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  FaChartBar,
  FaChartLine,
  FaHourglassHalf,
  FaTag,
} from "react-icons/fa";
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
  LineElement,
} from "chart.js";
import { GrPieChart } from "react-icons/gr";
import { FaMoneyBill1Wave, FaPerson } from "react-icons/fa6";
import KpiCard from "@/components/ui/KpiCard";
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

export default function AdjustmentsHistory() {
  return (
    <main className="p-8">
      <h3 className="text-2xl font-medium my-6">Adjustments History</h3>
      <div className="flex flex-row items-center justify-between mb-6 gap-4 flex-wrap">
        <div className="flex flex-row items-center gap-4 flex-wrap">
          <select className="bg-white border border-gray-300 rounded-md px-2 py-2">
            <option>Today</option>
            <option>Last 7 days</option>
            <option>This Month</option>
            <option>Custom</option>
          </select>
          <select className="bg-white border border-gray-300 rounded-md px-2 py-2">
            <option>All Type</option>
            <option>Damage</option>
            <option>Theft</option>
            <option>Loss</option>
          </select>
          <select className="bg-white border border-gray-300 rounded-md px-2 py-2">
            <option>All Categories</option>
            <option>Medicine</option>
            <option>Equipment</option>
            <option>Consumables</option>
          </select>
          <select className="bg-white border border-gray-300 rounded-md px-2 py-2">
            <option>All Staffs</option>
            <option>Staff A</option>
            <option>Staff B</option>
            <option>Staff C</option>
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
            className="bg-indigo-500 hover:bg-transparent text-white hover:text-indigo-500 border border-indigo-500 px-2 py-1 rounded-md"
          >
            + New Adjustment
          </Link>
        </div>
      </div>

      <div className="my-6 w-full flex flex-row justify-between gap-4">
        <KpiCard
          title="Total Adjusted"
          icon={<FaChartBar className="mr-2 text-xl text-green-500" />}
          value="10,000"
        />
        <KpiCard
          title="Total Value Loss"
          icon={<FaMoneyBill1Wave className="mr-2 text-xl text-red-500" />}
          value="10,000"
        />
        <KpiCard
          title="Most Adjusted Category"
          icon={<FaTag className="mr-2 text-lg text-orange-500" />}
          product={{
            name: productsData[0].name,
            image: productsData[0].image,
            id: productsData[0].id.toString(),
          }}
        />
        <KpiCard
          title="Top Staff Responsible"
          icon={<FaPerson className="mr-2 text-2xl text-blue-500" />}
          value={5}
        />
      </div>

      <div className="w-full bg-white rounded-2xl shadow-md p-6">
        <h4 className="text-lg font-semibold mb-4">Adjustment Details</h4>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-300 text-gray-500">
              <th className="px-2 py-2 font-normal">Date & Time</th>
              <th colSpan={3} className="px-2 py-2 font-normal text-center">
                Product
              </th>
              <th className="px-2 py-2 font-normal">Adjustment Type</th>
              <th className="px-2 py-2 font-normal">Quantity</th>
              <th className="px-2 py-2 font-normal">Value</th>
              <th className="px-2 py-2 font-normal">Notes</th>
              <th className="px-2 py-2 font-normal">Entered By</th>
              <th className="px-2 py-2 font-normal text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {productsData.map((product, index) => (
              <tr key={product.id} className="border-b border-gray-300">
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
                <td className="px-2 py-4 font-medium">{product.category}</td>
                <td className="px-2 py-4">
                  {index % 2 == 0 ? "Damaged" : "Theft"}
                </td>
                <td className="px-2 py-4">{product.stockQty}</td>
                <td className="px-2 py-4">
                  {product.stockQty * product.price}
                </td>
                <td className="px-2 py-4">Notes.....</td>
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

      <div className="w-full my-6 flex flex-row justify-between items-start gap-6">
        <div className="w-full h-full bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between">
          <div className="mb-4 flex flex-row justify-start items-center">
            <FaChartBar className="mr-6 text-xl" />
            <h4 className="text-lg font-semibold">Value Lost</h4>
          </div>
          <Bar options={barChartOptions} data={barChartData} />
        </div>
        <div className="w-4/7 aspect-square bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between">
          <div className="mb-4 flex flex-row justify-start items-center">
            <GrPieChart className="mr-6 text-xl" />
            <h4 className="text-lg font-semibold">Adjustment Types</h4>
          </div>
          <Doughnut data={doughnutChartData} />
        </div>
      </div>

      <div className="w-full h-full bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between">
        <div className="mb-4 flex flex-row justify-start items-center">
          <FaChartLine className="mr-6 text-xl" />
          <h4 className="text-lg font-semibold">Adjustments over time</h4>
        </div>
        <Line options={lineChartOptions} data={lineChartData} />
      </div>
    </main>
  );
}
