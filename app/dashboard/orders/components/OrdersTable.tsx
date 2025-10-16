import { IProduct } from "@/public/data/productsData";
import Link from "next/link";
import * as React from "react";

export interface IOrdersTableProps {
  data: IProduct[];
}

export function OrdersTable(props: IOrdersTableProps) {
  return (
    <table className="hidden md:block w-full text-left">
      <thead>
        <tr className="border-b border-gray-300 text-gray-500">
          <th className="px-2 py-2 font-normal">Invoice No</th>
          <th className="px-2 py-2 font-normal">Date & Time</th>
          <th className="px-2 py-2 font-normal">Customer / Supplier</th>
          <th className="px-2 py-2 font-normal">Type</th>
          <th className="px-2 py-2 font-normal text-center">Products</th>
          <th className="px-2 py-2 font-normal">Total</th>
          <th className="px-2 py-2 font-normal">Status</th>
          <th className="px-2 py-2 font-normal text-end">Payment Status</th>
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
            <td className="px-2 py-4">12 Aug, 2025</td>
            <td className="px-2 py-4">
              {index % 2 == 0 ? "Customer" : "Supplier"} Name
            </td>
            <td className="px-2 py-4">
              {index % 3 == 0 ? "Online" : index % 2 == 0 ? "Purchase" : "Sale"}
            </td>
            <td className="px-2 py-4 font-medium">
              <Link href={`/dashboard/products/${product.id}`}>
                {product.name}
              </Link>
              {" X "} {product.stockQty}
            </td>
            <td className="px-2 py-4">{product.price}</td>
            <td className="px-2 py-4">{index < 2 ? "Pending" : "Completed"}</td>
            <td className="px-2 py-4">{index < 2 ? "Paid" : "Unpaid"}</td>
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
                Cancel
              </Link>
              <Link
                href={"/"}
                className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white"
              >
                Print Invoice
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
