import productsData from "@/public/data/productsData";
import Link from "next/link";
import * as React from "react";
import { ReceiptsTable } from "./components/ReceiptsTable";
import { ReceiptsList } from "./components/ReceiptsList/ReceiptsList";

export default function SalesReceipt() {
  return (
    <main className="p-4 md:p-8">
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-2xl font-medium">Receipts / Invoices</h3>
        <div className="my-6 flex flex-row justify-between flex-wrap gap-4 md:gap-0">
          <div className="flex flex-row gap-4">
            <select className="bg-white border border-gray-300 rounded-md px-2 py-2">
              <option>All</option>
              <option>Sales Invoices</option>
              <option>Purchase Invoices</option>
            </select>
            <select className="bg-white border border-gray-300 rounded-md px-2 py-2">
              <option>All</option>
              <option>Paid</option>
              <option>Unpaid</option>
              <option>Partial</option>
            </select>
          </div>
          <input
            type="text"
            placeholder="Search products..."
            className="border border-gray-300 rounded-md px-2 py-1 w-2/5"
          />
          <div>
            <button className="bg-transparent hover:bg-green-500 text-green-500 hover:text-white border border-green-500 px-2 py-1 rounded-md cursor-pointer">
              Export All
            </button>
            <button className="mx-2 bg-transparent hover:bg-amber-500 text-amber-500 hover:text-white border border-amber-500 px-2 py-1 rounded-md cursor-pointerr">
              Print
            </button>
            <button className="bg-transparent hover:bg-blue-500 text-blue-500 hover:text-white border border-blue-500 px-2 py-1 rounded-md cursor-pointerr">
              Send
            </button>
          </div>
        </div>
        <ReceiptsTable data={productsData} />
        <ReceiptsList data={productsData} />
      </div>
    </main>
  );
}
