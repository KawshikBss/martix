import productsData from "@/public/data/productsData";
import Link from "next/link";
import * as React from "react";

export default function SalesReceipt() {
  return (
    <main className="p-8">
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-2xl font-medium">Receipts / Invoices</h3>
        <div className="my-6 flex flex-row justify-between">
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
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-300 text-gray-500">
              <th className="px-2 py-2 font-normal">Invoice No</th>
              <th className="px-2 py-2 font-normal">Linked Order ID</th>
              <th className="px-2 py-2 font-normal">Customer / Vendor</th>
              <th className="px-2 py-2 font-normal">Date</th>
              <th className="px-2 py-2 font-normal">Total</th>
              <th className="px-2 py-2 font-normal">Payment Status</th>
              <th className="px-2 py-2 font-normal">Payment Method</th>
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
                <td className="px-2 py-4">{product.sku}</td>
                <td className="px-2 py-4">
                  {index % 2 == 0 ? "Customer" : "Vendor"} Name
                </td>
                <td className="px-2 py-4">12 Aug, 2025</td>
                <td className="px-2 py-4">{product.price}</td>
                <td className="px-2 py-4">{index < 2 ? "Paid" : "Unpaid"}</td>
                <td className="px-2 py-4">
                  {index % 3 == 0 ? "Cash" : index % 2 == 0 ? "Card" : "PayPal"}
                </td>
                <td className="px-2 py-4 flex flex-wrap justify-center gap-4">
                  <Link
                    href={"/"}
                    className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white"
                  >
                    View
                  </Link>
                  <button className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white">
                    Download
                  </button>
                  <button className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white">
                    Print
                  </button>
                  <button className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white">
                    Send Invoice
                  </button>
                  {!(index < 2) && (
                    <button className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white">
                      Mark as Paid
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
