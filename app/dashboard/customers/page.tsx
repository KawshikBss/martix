import KpiCard from "@/components/ui/KpiCard";
import ordersData from "@/public/data/ordersData";
import Link from "next/link";
import * as React from "react";
import { FaCheckSquare, FaMoneyBill, FaPlusSquare } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { CustomersList } from "./components/CustomersList/CustomersList";
import { CustomersTable } from "./components/CustomersTable";

export default function CustomersListView() {
  return (
    <main className="p-4 md:p-8">
      <div className="bg-white rounded-2xl shadow-md p-6 w-full flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
        <h3 className="text-2xl font-medium self-start">Customers</h3>
        <div className="flex flex-row flex-wrap gap-4">
          <button className="bg-green-500 hover:bg-transparent text-white hover:text-green-500 border border-green-500 px-2 py-1 rounded-md">
            Add Customer
          </button>
          <button className="bg-blue-500 hover:bg-transparent text-white hover:text-blue-500 border border-blue-500 px-2 py-1 rounded-md">
            Import
          </button>
          <button className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md">
            Export
          </button>
          <input
            type="text"
            placeholder="Search customers..."
            className="border border-gray-300 rounded-md px-2 py-1 w-full md:w-2/5"
          />
        </div>
      </div>
      <div className="my-6 w-full flex flex-col md:flex-row justify-between gap-4">
        <KpiCard
          title="Total Customers"
          icon={<FaUserGroup className="mr-2 text-xl text-blue-500" />}
          value="+ 10,000"
        />
        <KpiCard
          title="New This Month"
          icon={<FaPlusSquare className="mr-2 text-xl text-green-500" />}
          value="+ 10,000"
        />
        <KpiCard
          title="Outstanding Receivables"
          icon={<FaMoneyBill className="mr-2 text-xl text-orange-500" />}
          value="$ 10,000"
        />
        <KpiCard
          title="Active Customers"
          icon={<FaCheckSquare className="mr-2 text-xl text-green-500" />}
          value="+ 10,000"
        />
      </div>
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="my-6 flex flex-col md:flex-row justify-start items-center gap-4">
          <div className="flex flex-col w-full md:w-fit">
            <label className="mb-1 text-sm text-gray-600">Type</label>
            <select className="bg-white border border-gray-300 rounded-md px-2 py-2">
              <option>Retail</option>
              <option>Wholesale</option>
              <option>Distributor</option>
              <option>Other</option>
            </select>
          </div>
          <div className="flex flex-col w-full md:w-fit">
            <label className="mb-1 text-sm text-gray-600">Status</label>
            <select className="bg-white border border-gray-300 rounded-md px-2 py-2">
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
          <div className="flex flex-col w-full md:w-fit">
            <label className="mb-1 text-sm text-gray-600">
              Outstanding Balance
            </label>
            <select className="bg-white border border-gray-300 rounded-md px-2 py-2">
              <option>Has Due</option>
              <option>No Due</option>
            </select>
          </div>
          <div className="flex flex-col w-full md:w-fit">
            <label className="mb-1 text-sm text-gray-600">Location</label>
            <select className="bg-white border border-gray-300 rounded-md px-2 py-2">
              <option>All</option>
              <option>District</option>
              <option>Division</option>
            </select>
          </div>
        </div>
        <CustomersTable data={ordersData} />
      </div>
      <CustomersList data={ordersData} />
    </main>
  );
}
