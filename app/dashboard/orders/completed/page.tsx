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

export default function CompletedOrders() {
  return (
    <main className="p-8">
      <div className="my-6 w-full flex flex-row justify-between gap-4">
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
        <div className="my-6 flex flex-row justify-between">
          <div className="flex flex-row gap-4">
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
              <th className="px-2 py-2 font-normal">Delivery Method</th>
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
                <td className="px-2 py-4">Santa Claus</td>
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
