import { IProduct } from "@/public/data/productsData";
import Link from "next/link";
import * as React from "react";

export interface IReceiptsTableProps {
  data: IProduct[];
}

export function ReceiptsTable(props: IReceiptsTableProps) {
  return (
    <table className="hidden md:block w-full text-left">
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
        {props.data.map((product, index) => (
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
  );
}
