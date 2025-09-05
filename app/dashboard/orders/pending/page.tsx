import productsData from "@/public/data/productsData";
import Link from "next/link";
import * as React from "react";
import { FaBox, FaHourglassHalf, FaTruck } from "react-icons/fa";
import { FaMoneyBill1Wave } from "react-icons/fa6";

export default function PendingOrders() {
  return (
    <main className="p-8">
      <div className="my-6 w-full flex flex-row justify-between gap-4">
        <div className="w-full bg-white rounded-2xl shadow-md p-4 flex flex-col items-start gap-4">
          <div className="w-full flex flex-row justify-end items-center gap-4">
            <FaHourglassHalf className="text-2xl text-yellow-500 flex flex-row justify-start items-center gap-4" />
            <h4 className="text-md font-normal text-end">Total Pending</h4>
          </div>
          <h3 className="text-xl font-semibold text-end">+ 10,000</h3>
        </div>
        <div className="w-full bg-white rounded-2xl shadow-md p-4 flex flex-col items-start gap-4">
          <div className="w-full flex flex-row justify-end items-center gap-4">
            <FaMoneyBill1Wave className="text-2xl text-green-500 flex flex-row justify-start items-center gap-4" />
            <h4 className="text-md font-normal text-end">Awaiting Payment</h4>
          </div>
          <h3 className="text-xl font-semibold text-end">$ 10,000</h3>
        </div>
        <div className="w-full bg-white rounded-2xl shadow-md p-4 flex flex-col items-start gap-4">
          <div className="w-full flex flex-row justify-end items-center gap-4">
            <FaBox className="text-2xl text-amber-500 flex flex-row justify-start items-center gap-4" />
            <h4 className="text-md font-normal text-end">Awaiting Shipment</h4>
          </div>
          <h3 className="text-xl font-semibold text-end">+ 10,000</h3>
        </div>
        <div className="w-full bg-white rounded-2xl shadow-md p-4 flex flex-col items-start gap-4">
          <div className="w-full flex flex-row justify-end items-center gap-4">
            <FaTruck className="text-2xl text-blue-500 flex flex-row justify-start items-center gap-4" />
            <h4 className="text-md font-normal text-end">
              Ready for Pickup / Delivery
            </h4>
          </div>
          <h3 className="text-xl font-semibold text-end">+ 10,000</h3>
        </div>
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
              <option>All Customers</option>
              <option>Customer A</option>
              <option>Customer B</option>
              <option>Customer C</option>
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
              <th className="px-2 py-2 font-normal">Order ID</th>
              <th className="px-2 py-2 font-normal">Customer / Vendor</th>
              <th className="px-2 py-2 font-normal">Date & Time</th>
              <th className="px-2 py-2 font-normal">Items</th>
              <th className="px-2 py-2 font-normal">Total</th>
              <th className="px-2 py-2 font-normal">Payment</th>
              <th className="px-2 py-2 font-normal">Status</th>
              <th className="px-2 py-2 font-normal">Expected Delivery Date</th>
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
                <td className="px-2 py-4">
                  {index % 2 == 0 ? "Customer" : "Vendor"} Name
                </td>
                <td className="px-2 py-4">12 Aug, 2025</td>
                <td className="px-2 py-4">{product.stockQty} items</td>
                <td className="px-2 py-4">
                  {product.price * product.stockQty}
                </td>
                <td className="px-2 py-4">{index < 2 ? "Paid" : "Unpaid"}</td>
                <td className="px-2 py-4">
                  {index < 2 ? "Pending" : "Completed"}
                </td>
                <td className="px-2 py-4">12 Aug, 2025</td>
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
                    Approve
                  </Link>
                  <Link
                    href={"/"}
                    className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white"
                  >
                    Mark Paid
                  </Link>
                  <Link
                    href={"/"}
                    className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white"
                  >
                    Ship
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
