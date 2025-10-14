import { IProduct } from "@/public/data/productsData";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

export interface IStockAlertsTableProps {
  data: IProduct[];
}

export function StockAlertsTable(props: IStockAlertsTableProps) {
  return (
    <div className="hidden md:block w-full bg-white rounded-2xl shadow-md p-6">
      <h4 className="text-lg font-semibold mb-4">Stock Alerts</h4>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-300 text-gray-500">
            <th colSpan={3} className="px-2 py-2 font-normal text-center">
              Product
            </th>
            <th className="px-2 py-2 font-normal">Current Stock</th>
            <th className="px-2 py-2 font-normal">Low Stock Threshold</th>
            <th className="px-2 py-2 font-normal">Status</th>
            <th className="px-2 py-2 font-normal">Last Stock In</th>
            <th className="px-2 py-2 font-normal">Supplier</th>
            <th className="px-2 py-2 font-normal text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((product, index) => (
            <tr
              key={product.id}
              className="border-b border-gray-300"
              style={{
                backgroundColor:
                  index % 3 == 0
                    ? "#fef3c7"
                    : index % 2 == 0
                    ? "#fecaca"
                    : "#fed7aa",
              }}
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
                  {product.name} [{product.sku}]
                </Link>
              </td>
              <td className="px-2 py-4 font-medium">{product.category}</td>
              <td className="px-2 py-4">{product.stockQty}</td>
              <td className="px-2 py-4">{100 - product.stockQty}</td>
              <td
                className={`px-2 py-4 text-${
                  index % 3 == 0 ? "yellow" : index % 2 == 0 ? "red" : "orange"
                }-500`}
              >
                <span className="bg-white px-2 py-1 rounded-full text-sm font-medium">
                  {index % 3 == 0 ? "Low" : index % 2 == 0 ? "Out" : "Critical"}
                </span>
              </td>
              <td className="px-2 py-4">12 Aug, 2025</td>
              <td className="px-2 py-4">Supplier Name</td>
              <td className="px-2 py-4 flex justify-center gap-4">
                <Link
                  href={"/"}
                  className="bg-blue-200 px-2 py-1 rounded-md hover:bg-white"
                >
                  Reorder
                </Link>
                <Link
                  href={"/"}
                  className="bg-yellow-200 px-2 py-1 rounded-md hover:bg-white"
                >
                  Snooze
                </Link>
                <Link
                  href={"/"}
                  className="bg-green-200 px-2 py-1 rounded-md hover:bg-white"
                >
                  Resolved
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
