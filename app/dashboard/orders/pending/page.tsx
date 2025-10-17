import KpiCard from "@/components/ui/KpiCard";
import productsData from "@/public/data/productsData";
import Link from "next/link";
import * as React from "react";
import { FaBox, FaHourglassHalf, FaTruck } from "react-icons/fa";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { PendingOrdersTable } from "./components/PendingOrdersTable";
import { PendingOrdersList } from "./components/PendingOrdersList/PendingOrdersList";

export default function PendingOrders() {
  return (
    <main className="p-4 md:p-8">
      <div className="my-6 w-full flex flex-col md:flex-row justify-between gap-4">
        <KpiCard
          title="Total Pending"
          icon={<FaHourglassHalf className="text-xl text-yellow-500" />}
          value="+ 10,000"
        />
        <KpiCard
          title="Awaiting Payment"
          icon={<FaMoneyBill1Wave className="text-xl text-green-500" />}
          value="$ 10,000"
        />
        <KpiCard
          title="Awaiting Shipment"
          icon={<FaBox className="text-xl text-amber-500" />}
          value="+ 10,000"
        />
        <KpiCard
          title="Ready for Pickup / Delivery"
          icon={<FaTruck className="text-xl text-blue-500" />}
          value="+ 10,000"
        />
      </div>
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="w-full flex flex-row justify-between items-center">
          <h3 className="text-2xl font-medium">Pending Orders</h3>
          <Link
            href="/"
            className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md"
          >
            + New Order
          </Link>
        </div>
        <div className="my-6 flex flex-col md:flex-row gap-4 md:gap-0 justify-between">
          <div className="flex flex-row gap-4 flex-wrap md:flex-nowrap">
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
              <option>All Customers</option>
              <option>Customer A</option>
              <option>Customer B</option>
              <option>Customer C</option>
            </select>
          </div>
          <input
            type="text"
            placeholder="Search products..."
            className="border border-gray-300 rounded-md px-2 py-1 w-full md:w-2/5"
          />
        </div>
        <PendingOrdersTable data={productsData} />
      </div>
      <PendingOrdersList data={productsData} />
    </main>
  );
}
