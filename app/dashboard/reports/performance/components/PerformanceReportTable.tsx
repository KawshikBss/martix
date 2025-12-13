import { IProduct } from "@/public/data/productsData";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

export interface IPerformanceReportTableProps {
  data: IProduct[];
}

export function PerformanceReportTable(props: IPerformanceReportTableProps) {
  return (
    <table className="hidden md:table w-full text-left">
      <thead>
        <tr className="border-b border-gray-300 text-gray-500">
          <th colSpan={2} className="px-2 py-2 font-normal text-center">
            Product
          </th>
          <th className="px-2 py-2 font-normal">Category</th>
          <th className="px-2 py-2 font-normal">Units Sold</th>
          <th className="px-2 py-2 font-normal">Sales</th>
          <th className="px-2 py-2 font-normal">Profit</th>
          <th className="px-2 py-2 font-normal">Margin</th>
          <th className="px-2 py-2 font-normal">Avg. Monthly Demand</th>
          <th className="px-2 py-2 font-normal">Turnover Rate</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((product, index) => (
          <tr
            key={product.id}
            className="border-b border-gray-300 hover:bg-gray-50"
          >
            <td className="px-2 py-4">
              <Link href={`/dashboard/products/${product.id}`}>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={60}
                  height={40}
                  className="aspect-3/2 object-cover rounded-lg"
                />
              </Link>
            </td>
            <td className="px-2 py-4 font-medium">
              <Link href={`/dashboard/products/${product.id}`}>
                {product.name}
              </Link>
            </td>
            <td className="px-2 py-4">{product.category}</td>
            <td className="px-2 py-4">{product.stockQty}</td>
            <td className="px-2 py-4">{product.price * product.stockQty}</td>
            <td className="px-2 py-4">{product.price * product.stockQty}</td>
            <td className="px-2 py-4">51%</td>
            <td className="px-2 py-4">51%</td>
            <td className="px-2 py-4">{index % 2 == 0 ? "High" : "Low"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
