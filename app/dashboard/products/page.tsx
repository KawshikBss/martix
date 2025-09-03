import productsData from "@/public/data/productsData";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

export default function Products() {
  return (
    <main className="p-8">
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="w-full flex flex-row justify-between items-center">
          <h3 className="text-2xl font-medium">Products</h3>
          <Link
            href="/"
            className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md"
          >
            + Add New Product
          </Link>
        </div>
        <div className="my-6 flex flex-row justify-between">
          <input
            type="text"
            placeholder="Search products..."
            className="border border-gray-300 rounded-md px-2 py-1 w-2/5"
          />
          <div className="flex flex-row gap-4">
            <select className="border border-gray-300 rounded-md px-2 py-1">
              <option value="">Category</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="books">Books</option>
              {/* Add more categories as needed */}
            </select>
            <select className="border border-gray-300 rounded-md px-2 py-1">
              <option value="">Stock Status</option>
              <option value="in-stock">In Stock</option>
              <option value="low-stock">Low Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
            <div className="flex flex-row items-center gap-2">
              <input
                type="number"
                min="0"
                placeholder="Min Price"
                className="border border-gray-300 rounded-md px-2 py-1 w-24"
              />
              <span>-</span>
              <input
                type="number"
                min="0"
                placeholder="Max Price"
                className="border border-gray-300 rounded-md px-2 py-1 w-24"
              />
            </div>
          </div>
        </div>
        <table className="w-full text-left">
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
            {productsData.map((product) => (
              <tr className="border-b border-gray-300 hover:bg-gray-50">
                <td className="px-2 py-4">
                  <input type="checkbox" />
                </td>
                <td className="px-2 py-4">
                  <Link href={"/products/"}>
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
                  <Link href={"/products/"}>{product.name}</Link>
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
      </div>
    </main>
  );
}
