import { IProduct } from "@/public/data/productsData";
import * as React from "react";

export interface ISalesReportTableProps {
  data: IProduct[];
}

export function SalesReportTable(props: ISalesReportTableProps) {
  return (
    <table className="hidden md:table w-full text-left">
      <thead>
        <tr className="border-b border-gray-300 text-gray-500">
          <th className="px-2 py-2 font-normal">Order ID</th>
          <th className="px-2 py-2 font-normal">Date & Time</th>
          <th className="px-2 py-2 font-normal">Customer</th>
          <th className="px-2 py-2 font-normal">Items</th>
          <th className="px-2 py-2 font-normal">Total</th>
          <th className="px-2 py-2 font-normal">Payment</th>
          <th className="px-2 py-2 font-normal">Channel</th>
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
            <td className="px-2 py-4">Customer Name</td>
            <td className="px-2 py-4">{product.stockQty}</td>
            <td className="px-2 py-4">{product.price * product.stockQty}</td>
            <td className="px-2 py-4">{index < 2 ? "Cash" : "Card"}</td>
            <td className="px-2 py-4">{index % 2 == 0 ? "POS" : "Online"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
