"use client";

import * as React from "react";

export default function ExportReports() {
  const [orderType, setOrderType] = React.useState("Sales");
  return (
    <main className="p-8">
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="w-full flex flex-row justify-between items-center">
          <h3 className="text-2xl font-medium">Sales Reports</h3>
          <div className="flex flex-row gap-4">
            <select className="bg-white border border-gray-300 rounded-md px-2 py-2">
              <option>PDF</option>
              <option>Excel (XLSX)</option>
              <option>CSV</option>
            </select>
            <select className="bg-white border border-gray-300 rounded-md px-2 py-2">
              <option>Charts + Tables</option>
              <option>Only Tables</option>
            </select>
            <button className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md">
              Download Now
            </button>
            <button className="bg-blue-500 hover:bg-transparent text-white hover:text-blue-500 border border-blue-500 px-2 py-1 rounded-md">
              Send
            </button>
          </div>
        </div>
        <div className="mt-4 flex flex-row justify-between gap-4">
          <select className="bg-white border border-gray-300 rounded-md px-2 py-2 w-1/6">
            <option>Sales</option>
            <option>Profit & Loss</option>
            <option>Product Performance</option>
            <option>Inventory</option>
            <option>Purchase</option>
            <option>Customer</option>
            <option>Supplier</option>
            <option>Tax/VAT</option>
          </select>
          <select className="bg-white border border-gray-300 rounded-md px-2 py-2 w-1/6">
            <option>Today</option>
            <option>Last 7 days</option>
            <option>This Month</option>
            <option>Custom</option>
          </select>
          <select className="bg-white border border-gray-300 rounded-md px-2 py-2 w-1/6">
            <option>All</option>
            <option>Medicine</option>
            <option>Electronics</option>
            <option>Home</option>
          </select>
          <select className="bg-white border border-gray-300 rounded-md px-2 py-2 w-1/6">
            <option>All Suppliers</option>
            <option>Supplier A</option>
            <option>Supplier B</option>
            <option>Supplier C</option>
          </select>
          <select className="bg-white border border-gray-300 rounded-md px-2 py-2 w-1/6">
            <option>All Customers</option>
            <option>Customer A</option>
            <option>Customer B</option>
            <option>Customer C</option>
          </select>
          <select className="bg-white border border-gray-300 rounded-md px-2 py-2 w-1/6">
            <option>All</option>
            <option>POS</option>
            <option>Online</option>
            <option>Wholesale</option>
          </select>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-md p-6 my-6">
        <h3 className="text-2xl font-medium">Preview</h3>
        <div className="mt-4 p-4 border-2 border-dashed border-gray-300 rounded-md"></div>
      </div>
    </main>
  );
}
