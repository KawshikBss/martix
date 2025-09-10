"use client";
import productsData from "@/public/data/productsData";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import {
  FaChartBar,
  FaChartLine,
  FaCheckCircle,
  FaHourglass,
  FaHourglassHalf,
  FaShoppingCart,
} from "react-icons/fa";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
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
import { GrPieChart } from "react-icons/gr";
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

export default function Orders() {
  return (
    <main className="p-8">
      <div className="my-6 w-full flex flex-row justify-between gap-4">
        <KpiCard
          title="Total Orders"
          icon={<FaShoppingCart className="mr-2 text-xl text-blue-500" />}
          value="+ 10,000"
        />
        <KpiCard
          title="Total Orders Value"
          icon={<FaMoneyBill1Wave className="mr-2 text-xl text-green-500" />}
          value="$ 10,000"
        />
        <KpiCard
          title="Pending"
          icon={<FaHourglassHalf className="mr-2 text-xl text-yellow-500" />}
          value="+ 10,000"
        />
        <KpiCard
          title="Completed"
          icon={<FaCheckCircle className="mr-2 text-xl text-green-500" />}
          value="+ 10,000"
        />
        <KpiCard
          title="Cancelled"
          icon={<MdCancel className="mr-2 text-xl text-red-500" />}
          value="- 10,000"
        />
      </div>
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="w-full flex flex-row justify-between items-center">
          <h3 className="text-2xl font-medium">Orders</h3>
          <Link
            href="/"
            className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md"
          >
            + New Order
          </Link>
        </div>
        <div className="my-6 flex flex-row justify-between">
          <div className="flex flex-row gap-4">
            <select className="bg-white border border-gray-300 rounded-md px-2 py-2">
              <option>Today</option>
              <option>Last 7 days</option>
              <option>This Month</option>
              <option>Custom</option>
            </select>
            <select className="bg-white border border-gray-300 rounded-md px-2 py-2">
              <option>All</option>
              <option>Sales</option>
              <option>Purchase</option>
              <option>Online</option>
            </select>
            <select className="bg-white border border-gray-300 rounded-md px-2 py-2">
              <option>All</option>
              <option>Pending</option>
              <option>Processing</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
            <select className="bg-white border border-gray-300 rounded-md px-2 py-2">
              <option>All</option>
              <option>Paid</option>
              <option>Unpaid</option>
              <option>Partial</option>
            </select>
            <select className="bg-white border border-gray-300 rounded-md px-2 py-2">
              <option>All Suppliers</option>
              <option>Supplier A</option>
              <option>Supplier B</option>
              <option>Supplier C</option>
            </select>
          </div>
          <input
            type="text"
            placeholder="Search products..."
            className="border border-gray-300 rounded-md px-2 py-1 w-2/5"
          />
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-300 text-gray-500">
              <th className="px-2 py-2 font-normal">Invoice No</th>
              <th className="px-2 py-2 font-normal">Date & Time</th>
              <th className="px-2 py-2 font-normal">Customer / Supplier</th>
              <th className="px-2 py-2 font-normal">Type</th>
              <th className="px-2 py-2 font-normal text-center">Products</th>
              <th className="px-2 py-2 font-normal">Total</th>
              <th className="px-2 py-2 font-normal">Status</th>
              <th className="px-2 py-2 font-normal text-end">Payment Status</th>
              <th className="px-2 py-2 font-normal text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {productsData.map((product, index) => (
              <tr
                key={product.id}
                className="border-b border-gray-300 hover:bg-gray-50"
              >
                <td className="px-2 py-4">{product.sku}</td>
                <td className="px-2 py-4">12 Aug, 2025</td>
                <td className="px-2 py-4">
                  {index % 2 == 0 ? "Customer" : "Supplier"} Name
                </td>
                <td className="px-2 py-4">
                  {index % 3 == 0
                    ? "Online"
                    : index % 2 == 0
                    ? "Purchase"
                    : "Sale"}
                </td>
                <td className="px-2 py-4 font-medium">
                  <Link href={`/dashboard/products/${product.id}`}>
                    {product.name}
                  </Link>
                  {" X "} {product.stockQty}
                </td>
                <td className="px-2 py-4">{product.price}</td>
                <td className="px-2 py-4">
                  {index < 2 ? "Pending" : "Completed"}
                </td>
                <td className="px-2 py-4">{index < 2 ? "Paid" : "Unpaid"}</td>
                <td className="px-2 py-4 flex flex-wrap justify-center gap-4">
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
                    Cancel
                  </Link>
                  <Link
                    href={"/"}
                    className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white"
                  >
                    Print Invoice
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
            <h4 className="text-lg font-semibold">
              Sales/Purchase/Online Orders
            </h4>
          </div>
          <Bar options={barChartOptions} data={barChartData} />
        </div>
        <div className="w-4/7 aspect-square bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between">
          <div className="mb-4 flex flex-row justify-start items-center">
            <GrPieChart className="mr-6 text-xl" />
            <h4 className="text-lg font-semibold">Orders by Status</h4>
          </div>
          <Doughnut data={doughnutChartData} />
        </div>
      </div>

      <div className="w-full h-full bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between">
        <div className="mb-4 flex flex-row justify-start items-center">
          <FaChartLine className="mr-6 text-xl" />
          <h4 className="text-lg font-semibold">Orders over time</h4>
        </div>
        <Line options={lineChartOptions} data={lineChartData} />
      </div>
    </main>
  );
}
