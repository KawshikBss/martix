import KpiCard from "@/components/ui/KpiCard";
import ordersData from "@/public/data/ordersData";
import Link from "next/link";
import * as React from "react";
import {
  FaCheckSquare,
  FaHourglassHalf,
  FaMoneyBill,
  FaPlusSquare,
} from "react-icons/fa";
import { FaBoxesStacked, FaUserGroup } from "react-icons/fa6";

export default function CustomerOrderHistory() {
  return (
    <main className="p-8">
      <div className="bg-white rounded-2xl shadow-md p-6 w-full flex flex-row justify-between items-center">
        <h3 className="text-2xl font-medium">Customer Order History</h3>
        <div className="flex flex-row gap-4">
          <button className="bg-green-500 hover:bg-transparent text-white hover:text-green-500 border border-green-500 px-2 py-1 rounded-md">
            New Order
          </button>
          <button className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md">
            Export
          </button>
          <input
            type="text"
            placeholder="Search customers..."
            className="border border-gray-300 rounded-md px-2 py-1 w-2/5"
          />
        </div>
      </div>
      <div className="my-6 w-full flex flex-row justify-between gap-4">
        <KpiCard
          title="Total Orders"
          icon={<FaBoxesStacked className="mr-2 text-xl text-blue-500" />}
          value="+ 10,000"
        />
        <KpiCard
          title="Total Sales Value"
          icon={<FaMoneyBill className="mr-2 text-xl text-green-500" />}
          value="$ 10,000"
        />
        <KpiCard
          title="Pending Payments"
          icon={<FaHourglassHalf className="mr-2 text-xl text-orange-500" />}
          value="+ 10,000"
        />
        <KpiCard
          title="Completed Orders"
          icon={<FaCheckSquare className="mr-2 text-xl text-green-500" />}
          value="+ 10,000"
        />
      </div>
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="my-6 flex flex-row justify-start items-center gap-4">
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-600">Customer</label>
            <select className="bg-white border border-gray-300 rounded-md px-2 py-2">
              <option>Customer A</option>
              <option>Customer B</option>
              <option>Customer C</option>
              <option>Customer D</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-600">Payment Status</label>
            <select className="bg-white border border-gray-300 rounded-md px-2 py-2">
              <option>Paid</option>
              <option>Partial</option>
              <option>Unpaid</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-600">Status</label>
            <select className="bg-white border border-gray-300 rounded-md px-2 py-2">
              <option>Pending</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-600">Type</label>
            <select className="bg-white border border-gray-300 rounded-md px-2 py-2">
              <option>Retail</option>
              <option>Wholesale</option>
              <option>Distributor</option>
              <option>Other</option>
            </select>
          </div>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-300 text-gray-500">
              <th className="px-2 py-2 font-normal">Order ID</th>
              <th className="px-2 py-2 font-normal">Date</th>
              <th className="px-2 py-2 font-normal">Customer</th>
              <th className="px-2 py-2 font-normal">Type</th>
              <th className="px-2 py-2 font-normal">Total</th>
              <th className="px-2 py-2 font-normal">Paid</th>
              <th className="px-2 py-2 font-normal">Balance</th>
              <th className="px-2 py-2 font-normal">Payment Status</th>
              <th className="px-2 py-2 font-normal">Fulfillment</th>
              <th className="px-2 py-2 font-normal text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ordersData.map((item, index) => (
              <tr
                key={item.id}
                className="border-b border-gray-300 hover:bg-gray-50"
              >
                <td className="px-2 py-4">ORD-{index}</td>
                <td className="px-2 py-4">12 Aug, 2025</td>
                <td className="px-2 py-4">{item.customerName}</td>
                <td className="px-2 py-4">
                  {index % 2 == 0 ? "Retail" : "Wholesale"}
                </td>
                <td className="px-2 py-4">{1000 + item.totalAmount}</td>
                <td className="px-2 py-4">{item.totalAmount}</td>
                <td className="px-2 py-4">{1000 - item.totalAmount}</td>
                <td className="px-2 py-4">
                  {index % 2 == 0 ? "Paid" : "Unpaid"}
                </td>
                <td className="px-2 py-4">
                  {index % 2 == 0 ? "Delivered" : "Processing"}
                </td>
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
                    Invoice
                  </Link>
                  <Link
                    href={"/"}
                    className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white"
                  >
                    Collect Payment
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
