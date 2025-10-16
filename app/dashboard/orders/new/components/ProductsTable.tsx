import { IProduct } from "@/public/data/productsData";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

export interface IProductsTableProps {
  data: IProduct[];
}

export function ProductsTable(props: IProductsTableProps) {
  return (
    <table className="hidden md:block w-full text-left my-4">
      <thead>
        <tr className="border-b border-gray-300 text-gray-500">
          <th colSpan={2} className="px-2 py-2">
            <input
              type="text"
              placeholder="Search products..."
              className="border border-gray-300 rounded-md px-2 py-1 w-full"
            />
          </th>
          <th className="px-2 py-2 font-normal">Qty</th>
          <th className="px-2 py-2 font-normal">Price</th>
          <th className="px-2 py-2 font-normal text-end">Discount</th>
          <th className="px-2 py-2 font-normal text-end">Tax</th>
          <th className="px-2 py-2 font-normal text-center">Total</th>
          <th className="px-2 py-2 font-normal text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((product) => (
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
              [{product.sku}]
            </td>
            <td className="px-2 py-4">{product.stockQty}</td>
            <td className="px-2 py-4">${product.price}</td>
            <td className="px-2 py-4 text-end">0</td>
            <td className="px-2 py-4 text-end">0</td>
            <td className="px-2 py-4 text-end">
              {product.price * product.stockQty}
            </td>
            <td className="px-2 py-4 flex justify-center gap-4">
              <Link
                href={"/"}
                className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white"
              >
                View
              </Link>
              <button className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white">
                Remove
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
