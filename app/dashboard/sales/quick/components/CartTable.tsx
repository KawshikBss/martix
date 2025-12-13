import { IProduct } from "@/public/data/productsData";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

export interface ICartTableProps {
  data: IProduct[];
}

export default function CartTable(props: ICartTableProps) {
  return (
    <table className="hidden md:table w-full text-left my-2">
      <thead>
        <tr className="border-b border-gray-300 text-gray-500">
          <th colSpan={2} className="px-2 py-2 font-normal text-center">
            Product
          </th>
          <th className="px-2 py-2 font-normal">Qty</th>
          <th className="px-2 py-2 font-normal">Price</th>
          <th className="px-2 py-2 font-normal">Discount</th>
          <th className="px-2 py-2 font-normal">Tax</th>
          <th className="px-2 py-2 font-normal">Total</th>
          <th className="px-2 py-2 font-normal">Actions</th>
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
            </td>
            <td className="px-2 py-4">{product.stockQty}</td>
            <td className="px-2 py-4">${product.price}</td>
            <td className="px-2 py-4">$0.00</td>
            <td className="px-2 py-4">$0.00</td>
            <td className="px-2 py-4">${product.price * product.stockQty}</td>
            <td className="px-2 py-4 flex justify-center gap-4">
              <Link
                href={"/"}
                className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white"
              >
                View
              </Link>
              <button className="bg-red-200 px-2 py-1 rounded-md hover:bg-white">
                Remove
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
