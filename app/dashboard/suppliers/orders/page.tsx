import KpiCard from "@/components/ui/KpiCard";
import categoriesData from "@/public/data/categoriesData";
import ordersData from "@/public/data/ordersData";
import Link from "next/link";
import * as React from "react";
import {
  FaCheckSquare,
  FaHourglassHalf,
  FaMoneyBill,
  FaTruck,
} from "react-icons/fa";

export default function PurchaseOrders() {
  return (
    <main className="p-8">
      <div className="bg-white rounded-2xl shadow-md p-6 w-full flex flex-row justify-between items-center">
        <h3 className="text-2xl font-medium">Purchase Orders</h3>
        <div className="flex flex-row gap-4">
          <button className="bg-green-500 hover:bg-transparent text-white hover:text-green-500 border border-green-500 px-2 py-1 rounded-md">
            Add Order
          </button>
          <button className="bg-blue-500 hover:bg-transparent text-white hover:text-blue-500 border border-blue-500 px-2 py-1 rounded-md">
            Import
          </button>
          <button className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md">
            Export
          </button>
          <input
            type="text"
            placeholder="Search orders..."
            className="border border-gray-300 rounded-md px-2 py-1 w-2/5"
          />
        </div>
      </div>
      <div className="my-6 w-full flex flex-row justify-between gap-4">
        <KpiCard
          title="Total Orders"
          icon={<FaTruck className="mr-2 text-xl text-blue-500" />}
          value="+ 10,000"
        />
        <KpiCard
          title="Pending Delivery"
          icon={<FaHourglassHalf className="mr-2 text-xl text-yellow-500" />}
          value="+ 10,000"
        />
        <KpiCard
          title="Completed"
          icon={<FaCheckSquare className="mr-2 text-xl text-green-500" />}
          value="+ 10,000"
        />
        <KpiCard
          title="Pending Payment"
          icon={<FaMoneyBill className="mr-2 text-xl text-orange-500" />}
          value="$ 10,000"
        />
      </div>
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="my-6 flex flex-row justify-start items-center gap-4">
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-600">Supplier</label>
            <select className="bg-white border border-gray-300 rounded-md px-2 py-2">
              <option>Supplier 1</option>
              <option>Supplier 2</option>
              <option>Supplier 3</option>
              <option>Supplier 4</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-600">Status</label>
            <select className="bg-white border border-gray-300 rounded-md px-2 py-2">
              <option>Pending</option>
              <option>Received</option>
              <option>Cancelled</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-600">Category</label>
            <select className="bg-white border border-gray-300 rounded-md px-2 py-2">
              <option>All</option>
              {categoriesData.map((category) => (
                <option key={category.name}>{category.name}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-600">
              Outstanding Balance (Above)
            </label>
            <input
              type="number"
              min={0}
              placeholder="Amount"
              className="bg-white border border-gray-300 rounded-md px-2 py-1"
            />
          </div>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-300 text-gray-500">
              <th className="px-2 py-2 font-normal">PO Number</th>
              <th className="px-2 py-2 font-normal">Supplier</th>
              <th className="px-2 py-2 font-normal">Order Date</th>
              <th className="px-2 py-2 font-normal">Expected Delivery</th>
              <th className="px-2 py-2 font-normal">Status</th>
              <th className="px-2 py-2 font-normal">Total</th>
              <th className="px-2 py-2 font-normal">Paid</th>
              <th className="px-2 py-2 font-normal">Balance</th>
              <th className="px-2 py-2 font-normal text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ordersData.map((item, index) => (
              <tr
                key={item.id}
                className="border-b border-gray-300 hover:bg-gray-50"
              >
                <td className="px-2 py-4">PO-{index}</td>
                <td className="px-2 py-4">{item.customerName}</td>
                <td className="px-2 py-4">12 Aug, 2025</td>
                <td className="px-2 py-4">12 Sep, 2025</td>
                <td className="px-2 py-4">
                  {index % 2 === 0 ? "Received" : "Pending"}
                </td>
                <td className="px-2 py-4">{1000 + item.totalAmount}</td>
                <td className="px-2 py-4">{1000 - item.totalAmount}</td>
                <td className="px-2 py-4">{item.totalAmount}</td>
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
                    Receive
                  </Link>
                  <Link
                    href={"/"}
                    className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white"
                  >
                    Cancel
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
