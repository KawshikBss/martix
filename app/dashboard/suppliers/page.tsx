import KpiCard from "@/components/ui/KpiCard";
import categoriesData from "@/public/data/categoriesData";
import ordersData from "@/public/data/ordersData";
import productsData from "@/public/data/productsData";
import Link from "next/link";
import * as React from "react";
import { FaCheckSquare, FaMoneyBill, FaTrophy, FaTruck } from "react-icons/fa";

export default function AllSuppliers() {
  return (
    <main className="p-8">
      <div className="bg-white rounded-2xl shadow-md p-6 w-full flex flex-row justify-between items-center">
        <h3 className="text-2xl font-medium">Sales Reports</h3>
        <div className="flex flex-row gap-4">
          <button className="bg-green-500 hover:bg-transparent text-white hover:text-green-500 border border-green-500 px-2 py-1 rounded-md">
            Add Supplier
          </button>
          <button className="bg-blue-500 hover:bg-transparent text-white hover:text-blue-500 border border-blue-500 px-2 py-1 rounded-md">
            Import
          </button>
          <button className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md">
            Export
          </button>
          <input
            type="text"
            placeholder="Search suppliers..."
            className="border border-gray-300 rounded-md px-2 py-1 w-2/5"
          />
        </div>
      </div>
      <div className="my-6 w-full flex flex-row justify-between gap-4">
        <KpiCard
          title="Total Suppliers"
          icon={<FaTruck className="mr-2 text-xl text-blue-500" />}
          value="+ 10,000"
        />
        <KpiCard
          title="Active Suppliers"
          icon={<FaCheckSquare className="mr-2 text-xl text-green-500" />}
          value="+ 10,000"
        />
        <KpiCard
          title="Outstanding Payables"
          icon={<FaMoneyBill className="mr-2 text-xl text-orange-500" />}
          value="$ 10,000"
        />
        <KpiCard
          title="Top Supplier"
          icon={<FaTrophy className="mr-2 text-xl text-yellow-500" />}
          user={{
            id: "",
            name: "Rober California",
            image: "/images/user-placeholder.jpg",
          }}
        />
      </div>
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="my-6 flex flex-row justify-start gap-4">
          <select className="bg-white border border-gray-300 rounded-md px-2 py-2">
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <select className="bg-white border border-gray-300 rounded-md px-2 py-2">
            <option>All</option>
            {categoriesData.map((category) => (
              <option key={category.name}>{category.name}</option>
            ))}
          </select>
          <select className="bg-white border border-gray-300 rounded-md px-2 py-2">
            <option>All</option>
            <option>District</option>
            <option>Division</option>
          </select>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-300 text-gray-500">
              <th className="px-2 py-2 font-normal">Supplier</th>
              <th className="px-2 py-2 font-normal">Contact Person</th>
              <th className="px-2 py-2 font-normal">Phone</th>
              <th className="px-2 py-2 font-normal">Email</th>
              <th className="px-2 py-2 font-normal">Total Purchases</th>
              <th className="px-2 py-2 font-normal">Pending Payment</th>
              <th className="px-2 py-2 font-normal">Last Purchase</th>
              <th className="px-2 py-2 font-normal">Status</th>
              <th className="px-2 py-2 font-normal text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ordersData.map((item, index) => (
              <tr
                key={item.id}
                className="border-b border-gray-300 hover:bg-gray-50"
              >
                <td className="px-2 py-4">{item.customerName}</td>
                <td className="px-2 py-4">{item.customerName}</td>
                <td className="px-2 py-4">+880-1122-334455</td>
                <td className="px-2 py-4">supplier@gmail.com</td>
                <td className="px-2 py-4">{item.totalAmount}</td>
                <td className="px-2 py-4">{1000 - item.totalAmount}</td>
                <td className="px-2 py-4">12 Aug, 2025</td>
                <td className="px-2 py-4">
                  {index % 2 === 0 ? "Active" : "Inactive"}
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
                    Edit
                  </Link>
                  <Link
                    href={"/"}
                    className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white"
                  >
                    Disable
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
