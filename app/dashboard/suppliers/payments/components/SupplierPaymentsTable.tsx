import { Order } from "@/public/data/ordersData";
import Link from "next/link";
import * as React from "react";

export interface ISupplierPaymentsTableProps {
  data: Order[];
}

export function SupplierPaymentsTable(props: ISupplierPaymentsTableProps) {
  return (
    <table className="hidden md:table w-full text-left">
      <thead>
        <tr className="border-b border-gray-300 text-gray-500">
          <th className="px-2 py-2 font-normal">Payment ID</th>
          <th className="px-2 py-2 font-normal">Date</th>
          <th className="px-2 py-2 font-normal">Supplier</th>
          <th className="px-2 py-2 font-normal">Related PO</th>
          <th className="px-2 py-2 font-normal">Amount</th>
          <th className="px-2 py-2 font-normal">Payment Method</th>
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
            <td className="px-2 py-4">PAY-{index}</td>
            <td className="px-2 py-4">12 Aug, 2025</td>
            <td className="px-2 py-4">{item.customerName}</td>
            <td className="px-2 py-4">PO-{index}</td>
            <td className="px-2 py-4">{item.totalAmount}</td>
            <td className="px-2 py-4">{index % 2 === 0 ? "Card" : "Cash"}</td>
            <td className="px-2 py-4">
              {index % 2 === 0 ? "Cleared" : "Partial"}
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
                Delete
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
