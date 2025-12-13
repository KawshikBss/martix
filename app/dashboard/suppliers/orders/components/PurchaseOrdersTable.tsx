import { Order } from "@/public/data/ordersData";
import Link from "next/link";
import * as React from "react";

export interface IPurchaseOrdersTableProps {
  data: Order[];
}

export function PurchaseOrdersTable(props: IPurchaseOrdersTableProps) {
  return (
    <table className="hidden md:table w-full text-left">
      <thead>
        <tr className="border-b border-gray-300 text-gray-500">
          <th className="px-2 py-2 font-normal">PO Number</th>
          <th className="px-2 py-2 font-normal">Supplier</th>
          <th className="px-2 py-2 font-normal">Order Date</th>
          <th className="px-2 py-2 font-normal">Expected Delivery</th>
          <th className="px-2 py-2 font-normal">Status</th>
          <th className="px-2 py-2 font-normal">Total</th>
          <th className="px-2 py-2 font-normal">Paid</th>
          <th className="px-2 py-2 font-normal">Balance</th>
          <th className="px-2 py-2 font-normal text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((item, index) => (
          <tr
            key={item.id}
            className="border-b border-gray-300 hover:bg-gray-50"
          >
            <td className="px-2 py-4">PO-{index}</td>
            <td className="px-2 py-4">{item.customerName}</td>
            <td className="px-2 py-4">12 Aug, 2025</td>
            <td className="px-2 py-4">12 Sep, 2025</td>
            <td className="px-2 py-4">
              {index % 2 === 0 ? "Received" : "Pending"}
            </td>
            <td className="px-2 py-4">{1000 + item.totalAmount}</td>
            <td className="px-2 py-4">{1000 - item.totalAmount}</td>
            <td className="px-2 py-4">{item.totalAmount}</td>
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
                Receive
              </Link>
              <Link
                href={"/"}
                className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white"
              >
                Cancel
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
