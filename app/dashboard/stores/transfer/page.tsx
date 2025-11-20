import KpiCard from "@/components/ui/KpiCard";
import ordersData from "@/public/data/ordersData";
import Link from "next/link";
import * as React from "react";
import { FaBan, FaCheckSquare, FaHourglassHalf, FaTruck } from "react-icons/fa";
import { TransferList } from "./components/TransferList/TransferList";
import { TransferTable } from "./components/TransferTable";

export default function TransferStocks() {
  return (
    <main className="p-4 md:p-8">
      <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 w-full flex flex-row justify-between items-center">
        <h3 className="text-2xl font-medium">Transfer Stock</h3>
        <button className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md">
          New Transfer
        </button>
      </div>
      <div className="my-6 w-full flex flex-col md:flex-row justify-between gap-4">
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
          placeholder="Search transfers..."
          className="border border-gray-300 rounded-md px-2 py-1 w-full md:w-2/5"
        />
        <TransferTable data={ordersData} />
        <TransferList data={ordersData} />
      </div>
    </main>
  );
}
