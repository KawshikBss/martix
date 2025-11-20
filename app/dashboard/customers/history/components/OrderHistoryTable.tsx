import { Order } from "@/public/data/ordersData";
import Link from "next/link";
import * as React from "react";

export interface OrderHistoryTableProps {
  data: Order[];
}

export function OrderHistoryTable(props: OrderHistoryTableProps) {
  return (
    <table className="hidden md:block w-full text-left">
      <thead>
        <tr className="border-b border-gray-300 text-gray-500">
          <th className="px-2 py-2 font-normal">Order ID</th>
          <th className="px-2 py-2 font-normal">Date</th>
          <th className="px-2 py-2 font-normal">Customer</th>
          <th className="px-2 py-2 font-normal">Type</th>
          <th className="px-2 py-2 font-normal">Total</th>
          <th className="px-2 py-2 font-normal">Paid</th>
          <th className="px-2 py-2 font-normal">Balance</th>
          <th className="px-2 py-2 font-normal">Payment Status</th>
          <th className="px-2 py-2 font-normal">Fulfillment</th>
          <th className="px-2 py-2 font-normal text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((item, index) => (
          <tr
            key={item.id}
            className="border-b border-gray-300 hover:bg-gray-50"
          >
            <td className="px-2 py-4">ORD-{index}</td>
            <td className="px-2 py-4">12 Aug, 2025</td>
            <td className="px-2 py-4">{item.customerName}</td>
            <td className="px-2 py-4">
              {index % 2 == 0 ? "Retail" : "Wholesale"}
            </td>
            <td className="px-2 py-4">{1000 + item.totalAmount}</td>
            <td className="px-2 py-4">{item.totalAmount}</td>
            <td className="px-2 py-4">{1000 - item.totalAmount}</td>
            <td className="px-2 py-4">{index % 2 == 0 ? "Paid" : "Unpaid"}</td>
            <td className="px-2 py-4">
              {index % 2 == 0 ? "Delivered" : "Processing"}
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
                Invoice
              </Link>
              <Link
                href={"/"}
                className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white"
              >
                Collect Payment
              </Link>
              <Link
                href={"/"}
                className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white"
              >
                Delete
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
