import KpiCard from "@/components/ui/KpiCard";
import ordersData from "@/public/data/ordersData";
import Link from "next/link";
import * as React from "react";
import { FaBan, FaCheckSquare, FaHourglassHalf, FaTruck } from "react-icons/fa";

export default function TransferStocks() {
  return (
    <main className="p-8">
      <div className="bg-white rounded-2xl shadow-md p-6 w-full flex flex-row justify-between items-center">
        <h3 className="text-2xl font-medium">Transfer Stock</h3>
        <button className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md">
          New Transfer
        </button>
      </div>
      <div className="my-6 w-full flex flex-row justify-between gap-4">
        <KpiCard
          title="In Transit"
          icon={<FaTruck className="mr-2 text-xl text-blue-500" />}
          value="+ 10,000"
        />
        <KpiCard
          title="Completed"
          icon={<FaCheckSquare className="mr-2 text-xl text-green-500" />}
          value="$ 10,000"
        />
        <KpiCard
          title="Pending Approval"
          icon={<FaHourglassHalf className="mr-2 text-xl text-gray-500" />}
          value="- 10,000"
        />
        <KpiCard
          title="Cancelled"
          icon={<FaBan className="mr-2 text-xl text-red-500" />}
          value="+ 10,000"
        />
      </div>
      <div className="bg-white rounded-2xl shadow-md p-6">
        <input
          type="text"
          placeholder="Search products..."
          className="border border-gray-300 rounded-md px-2 py-1 w-2/5"
        />
        <table className="w-full text-left mt-4">
          <thead>
            <tr className="border-b border-gray-300 text-gray-500">
              <th className="px-2 py-2 font-normal">Transfer ID</th>
              <th className="px-2 py-2 font-normal">From Location</th>
              <th className="px-2 py-2 font-normal">To Location</th>
              <th className="px-2 py-2 font-normal">Items Count</th>
              <th className="px-2 py-2 font-normal">Total Quantity</th>
              <th className="px-2 py-2 font-normal">Status</th>
              <th className="px-2 py-2 font-normal">Requested By</th>
              <th className="px-2 py-2 font-normal">Date Initiated</th>
              <th className="px-2 py-2 font-normal">Last Updated</th>
              <th className="px-2 py-2 font-normal">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ordersData.map((item, index) => (
              <tr
                key={item.id}
                className="border-b border-gray-300 hover:bg-gray-50"
              >
                <td className="px-2 py-4">TRF-{index}</td>
                <td className="px-2 py-4">Location {index}</td>
                <td className="px-2 py-4">Location {index + 1}</td>
                <td className="px-2 py-4">{item.totalAmount / 10}</td>
                <td className="px-2 py-4">{item.totalAmount}</td>
                <td className="px-2 py-4">
                  {index % 2 == 0 ? "Pending" : "Completed"}
                </td>
                <td className="px-2 py-4">Staff {index + 1}</td>
                <td className="px-2 py-4">12 Aug, 2025</td>
                <td className="px-2 py-4">12 Sep, 2025</td>
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
                    Approve
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
                    Print
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
