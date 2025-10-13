import { IProduct } from "@/public/data/productsData";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

export interface IProductsTableProps {
  items?: IProduct[];
}

export function ProductsTable(props: IProductsTableProps) {
  if (!props.items || props.items.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        No products available.
      </div>
    );
  }

  return (
    <table className="w-full text-left hidden md:table">
      <thead>
        <tr className="border-b border-gray-300 text-gray-500">
          <th className="px-2 py-2">
            <input type="checkbox" />
          </th>
          <th colSpan={2} className="px-2 py-2 font-normal text-center">
            Product
          </th>
          <th className="px-2 py-2 font-normal">SKU / Barcode</th>
          <th className="px-2 py-2 font-normal">Category</th>
          <th className="px-2 py-2 font-normal">Price</th>
          <th className="px-2 py-2 font-normal text-end">Stock Qty</th>
          <th className="px-2 py-2 font-normal text-end">Total Sales</th>
          <th className="px-2 py-2 font-normal text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.items?.map((product) => (
          <tr
            key={product.id}
            className="border-b border-gray-300 hover:bg-gray-50"
          >
            <td className="px-2 py-4">
              <input type="checkbox" />
            </td>
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
            <td className="px-2 py-4">{product.sku}</td>
            <td className="px-2 py-4">{product.category}</td>
            <td className="px-2 py-4">${product.price}</td>
            <td className="px-2 py-4 text-end">{product.stockQty}</td>
            <td className="px-2 py-4 text-end">120</td>
            <td className="px-2 py-4 flex justify-center gap-4">
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
