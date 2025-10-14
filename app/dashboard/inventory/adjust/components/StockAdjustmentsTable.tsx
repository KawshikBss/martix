import { IProduct } from "@/public/data/productsData";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

export interface IStockAdjustmentsTableProps {
  data: IProduct[];
}

export function StockAdjustmentsTable(props: IStockAdjustmentsTableProps) {
  return (
    <div className="hidden md:block w-full bg-white rounded-2xl shadow-md p-6">
      <h4 className="text-lg font-semibold mb-4">Stock Adjustments</h4>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-300 text-gray-500">
            <th className="px-2 py-2 font-normal">Date & Time</th>
            <th colSpan={2} className="px-2 py-2 font-normal text-center">
              Product
            </th>
            <th className="px-2 py-2 font-normal">Transaction Type</th>
            <th className="px-2 py-2 font-normal">Quantity</th>
            <th className="px-2 py-2 font-normal">Value</th>
            <th className="px-2 py-2 font-normal">Source / Destination</th>
            <th className="px-2 py-2 font-normal">Entered By</th>
            <th className="px-2 py-2 font-normal text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((product) => (
            <tr
              key={product.id}
              className="border-b border-gray-300 hover:bg-gray-50"
            >
              <td className="px-2 py-4">12 Aug, 2025</td>
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
              <td
                className={`px-2 py-4 text-${
                  product.stockQty % 2 == 0 ? "green" : "red"
                }-500`}
              >
                {product.stockQty % 2 == 0 ? "Stock In" : "Stock Out"}
              </td>
              <td
                className={`px-2 py-4 text-${
                  product.stockQty % 2 == 0 ? "green" : "red"
                }-500`}
              >
                {product.stockQty}
              </td>
              <td
                className={`px-2 py-4 text-${
                  product.stockQty % 2 == 0 ? "green" : "red"
                }-500`}
              >
                {product.stockQty * product.price}
              </td>
              <td className="px-2 py-4">
                {product.stockQty % 2 == 0 ? "Supplier Name" : "Sale"}
              </td>
              <td className="px-2 py-4">Staff Name</td>
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
    </div>
  );
}
