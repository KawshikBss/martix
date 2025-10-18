import KpiCard from "@/components/ui/KpiCard";
import productsData from "@/public/data/productsData";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import {
  FaBox,
  FaCheck,
  FaHourglassHalf,
  FaTrophy,
  FaTruck,
} from "react-icons/fa";
import { FaMoneyBill1Wave, FaPerson } from "react-icons/fa6";
import { CompletedOrdersTable } from "./components/CompletedOrdersTable";
import { CompletedOrdersList } from "./components/CompletedOrdersList/CompletedOrdersList";

export default function CompletedOrders() {
  return (
    <main className="p-4 md:p-8">
      <div className="my-6 w-full flex flex-col md:flex-row justify-between gap-4">
        <KpiCard
          title="Total Completed"
          icon={<FaCheck className="text-xl text-blue-500" />}
          value="+ 10,000"
        />
        <KpiCard
          title="Revenue Collected"
          icon={<FaMoneyBill1Wave className="text-xl text-green-500" />}
          value="$ 10,000"
        />
        <KpiCard
          title="Top Customers"
          icon={<FaPerson className="text-xl text-orange-500" />}
          user={{
            id: "",
            name: "Rober California",
            image: "/images/user-placeholder.jpg",
          }}
        />
        <KpiCard
          title="Top Sold"
          icon={<FaTrophy className="text-xl text-yellow-500" />}
          product={{
            name: productsData[0].name,
            image: productsData[0].image,
            id: productsData[0].id.toString(),
          }}
        />
      </div>
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="w-full flex flex-row justify-between items-center">
          <h3 className="text-2xl font-medium">Completed Orders</h3>
          <Link
            href="/"
            className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md"
          >
            + New Order
          </Link>
        </div>
        <div className="my-6 flex flex-col md:flex-row gap-4 md:gap-0 justify-between">
          <div className="flex flex-row flex-wrap gap-4">
            <select className="bg-white border border-gray-300 rounded-md px-2 py-2">
              <option>Today</option>
              <option>Last 7 days</option>
              <option>This Month</option>
              <option>Custom</option>
            </select>
            <select className="bg-white border border-gray-300 rounded-md px-2 py-2">
              <option>All Customers</option>
              <option>Customer A</option>
              <option>Customer B</option>
              <option>Customer C</option>
            </select>
            <select className="bg-white border border-gray-300 rounded-md px-2 py-2">
              <option>All</option>
              <option>Cash</option>
              <option>Credit Card</option>
              <option>PayPal</option>
            </select>
            <select className="bg-white border border-gray-300 rounded-md px-2 py-2">
              <option>All</option>
              <option>In-Store</option>
              <option>Pickup</option>
              <option>Courier</option>
            </select>
          </div>
          <input
            type="text"
            placeholder="Search products..."
            className="border border-gray-300 rounded-md px-2 py-1 w-full md:w-2/5"
          />
        </div>
        <CompletedOrdersTable data={productsData} />
      </div>
      <CompletedOrdersList data={productsData} />
    </main>
  );
}
