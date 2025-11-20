import { Order } from "@/public/data/ordersData";
import Link from "next/link";
import * as React from "react";

export interface ISuppliersTableProps {
  data: Order[];
}

export function SuppliersTable(props: ISuppliersTableProps) {
  return (
    <table className="hidden md:block w-full text-left">
      <thead>
        <tr className="border-b border-gray-300 text-gray-500">
          <th className="px-2 py-2 font-normal">Supplier</th>
          <th className="px-2 py-2 font-normal">Contact Person</th>
          <th className="px-2 py-2 font-normal">Phone</th>
          <th className="px-2 py-2 font-normal">Email</th>
          <th className="px-2 py-2 font-normal">Total Purchases</th>
          <th className="px-2 py-2 font-normal">Pending Payment</th>
          <th className="px-2 py-2 font-normal">Last Purchase</th>
          <th className="px-2 py-2 font-normal">Status</th>
          <th className="px-2 py-2 font-normal text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((item, index) => (
          <tr
            key={item.id}
            className="border-b border-gray-300 hover:bg-gray-50"
          >
            <td className="px-2 py-4">{item.customerName}</td>
            <td className="px-2 py-4">{item.customerName}</td>
            <td className="px-2 py-4">+880-1122-334455</td>
            <td className="px-2 py-4">supplier@gmail.com</td>
            <td className="px-2 py-4">{item.totalAmount}</td>
            <td className="px-2 py-4">{1000 - item.totalAmount}</td>
            <td className="px-2 py-4">12 Aug, 2025</td>
            <td className="px-2 py-4">
              {index % 2 === 0 ? "Active" : "Inactive"}
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
                Edit
              </Link>
              <Link
                href={"/"}
                className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white"
              >
                Disable
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
