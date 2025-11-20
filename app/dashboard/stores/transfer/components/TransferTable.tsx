import { Order } from "@/public/data/ordersData";
import Link from "next/link";
import * as React from "react";

export interface ITransferTableProps {
  data: Order[];
}

export function TransferTable(props: ITransferTableProps) {
  return (
    <table className="hidden md:block w-full text-left mt-4">
      <thead>
        <tr className="border-b border-gray-300 text-gray-500">
          <th className="px-2 py-2 font-normal">Transfer ID</th>
          <th className="px-2 py-2 font-normal">From Location</th>
          <th className="px-2 py-2 font-normal">To Location</th>
          <th className="px-2 py-2 font-normal">Items Count</th>
          <th className="px-2 py-2 font-normal">Total Quantity</th>
          <th className="px-2 py-2 font-normal">Status</th>
          <th className="px-2 py-2 font-normal">Requested By</th>
          <th className="px-2 py-2 font-normal">Date Initiated</th>
          <th className="px-2 py-2 font-normal">Last Updated</th>
          <th className="px-2 py-2 font-normal">Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((item, index) => (
          <tr
            key={item.id}
            className="border-b border-gray-300 hover:bg-gray-50"
          >
            <td className="px-2 py-4">TRF-{index}</td>
            <td className="px-2 py-4">Location {index}</td>
            <td className="px-2 py-4">Location {index + 1}</td>
            <td className="px-2 py-4">{item.totalAmount / 10}</td>
            <td className="px-2 py-4">{item.totalAmount}</td>
            <td className="px-2 py-4">
              {index % 2 == 0 ? "Pending" : "Completed"}
            </td>
            <td className="px-2 py-4">Staff {index + 1}</td>
            <td className="px-2 py-4">12 Aug, 2025</td>
            <td className="px-2 py-4">12 Sep, 2025</td>
            <td className="px-2 py-4 flex justify-center gap-4">
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
                Approve
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
                Print
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
