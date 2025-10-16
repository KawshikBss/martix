"use client";
import productsData from "@/public/data/productsData";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { FaCashRegister, FaMinusSquare, FaPercentage } from "react-icons/fa";
import { PiEqualsFill } from "react-icons/pi";

export default function NewOrder() {
  const [orderType, setOrderType] = React.useState("Sales");
  return (
    <main className="p-4 md:p-8">
      <div className="w-full bg-white rounded-2xl shadow-md p-6 flex flex-row justify-between items-start md:items-center">
        <h3 className="text-2xl font-medium">New Order</h3>
        <div className="flex flex-col md:flex-row gap-2">
          <select className="bg-white border border-gray-300 rounded-md px-2 py-2">
            <option onClick={() => setOrderType("Sales")}>Sales</option>
            <option onClick={() => setOrderType("Purchase")}>Purchase</option>
          </select>
          <button className="bg-transparent hover:bg-red-500 text-red-500 hover:text-white border border-red-500 px-2 py-1 rounded-md cursor-pointer">
            Discard Changes
          </button>
          <button className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md cursor-pointer">
            Save
          </button>
        </div>
      </div>
      {orderType === "Sales" ? (
        <div className="w-full bg-white rounded-2xl shadow-md p-6 my-6">
          <h3 className="text-2xl font-medium">Customer</h3>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="name" className="block text-sm/6 font-medium">
                Customer Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="phone" className="block text-sm/6 font-medium">
                Phone
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  autoComplete="phone"
                  className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="email" className="block text-sm/6 font-medium">
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
                  className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="address" className="block text-sm/6 font-medium">
                Address
              </label>
              <div className="mt-2">
                <input
                  id="address"
                  name="address"
                  type="text"
                  autoComplete="address"
                  className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full bg-white rounded-2xl shadow-md p-6 my-6">
          <h3 className="text-2xl font-medium">Supplier</h3>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="name" className="block text-sm/6 font-medium">
                Supplier Name
              </label>
              <div className="mt-2 flex flex-row gap-2">
                <select className="bg-white border border-gray-300 rounded-md px-2 py-2 w-full">
                  <option>Supplier A</option>
                  <option>Supplier B</option>
                  <option>Supplier C</option>
                </select>
                <Link
                  href="/"
                  className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md"
                >
                  New
                </Link>
              </div>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="contact" className="block text-sm/6 font-medium">
                Contact Person
              </label>
              <div className="mt-2">
                <input
                  id="contact"
                  name="contact"
                  type="text"
                  autoComplete="contact"
                  className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="phone" className="block text-sm/6 font-medium">
                Phone
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  autoComplete="phone"
                  className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="email" className="block text-sm/6 font-medium">
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
                  className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="address" className="block text-sm/6 font-medium">
                Address
              </label>
              <div className="mt-2">
                <input
                  id="address"
                  name="address"
                  type="text"
                  autoComplete="address"
                  className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-row gap-6 my-6">
        <div className="w-full md:w-2/3 bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-2xl font-medium">Order Details</h3>
          <table className="w-full text-left my-4">
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
              {productsData.map((product) => (
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
          <Link
            href="/dashboard/products/add"
            className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md"
          >
            + Add Product
          </Link>
        </div>
        <div className="w-full md:w-1/3 h-fit aspect-square bg-white rounded-2xl shadow-md p-6 flex flex-col justify-start gap-4">
          <div className="w-full flex items-center gap-3 bg-gray-50 rounded-xl p-2 shadow-sm">
            <FaCashRegister className="text-green-500 text-2xl" />
            <div className="text-xs text-gray-500">Selling Price</div>
            <div className="text-lg font-bold text-gray-900">৳ 200.00</div>
          </div>
          <div className="w-full flex items-center gap-3 bg-gray-50 rounded-xl p-2 shadow-sm">
            <FaPercentage className="text-green-500 text-2xl" />
            <div className="text-xs text-gray-500">Tax</div>
            <div className="text-lg font-bold text-gray-900">৳ 20.00</div>
          </div>
          <div className="w-full flex items-center gap-3 bg-gray-50 rounded-xl p-2 shadow-sm">
            <FaMinusSquare className="text-green-500 text-2xl" />
            <div className="text-xs text-gray-500">Discount</div>
            <div className="text-lg font-bold text-gray-900">৳ 30.00</div>
          </div>
          <div className="w-full flex items-center gap-3 bg-gray-50 rounded-xl p-2 shadow-sm">
            <PiEqualsFill className="text-green-500 text-2xl" />
            <div className="text-xs text-gray-500">Total</div>
            <div className="text-lg font-bold text-gray-900">৳ 190.00</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-6 my-6">
        <div className="w-full md:w-2/3 bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-2xl font-medium">Payment Details</h3>
          <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-2">
              <label
                htmlFor="payment_method"
                className="block text-sm/6 font-medium"
              >
                Payment Method
              </label>
              <select className="mt-2 bg-white border border-gray-300 rounded-md px-2 py-2 w-full">
                <option>Cash</option>
                <option>Credit Card</option>
                <option>Bank Transfer</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="paid_amount"
                className="block text-sm/6 font-medium"
              >
                Amount Paid
              </label>
              <div className="mt-2">
                <input
                  id="paid_amount"
                  name="paid_amount"
                  type="text"
                  autoComplete="paid_amount"
                  className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="pay_back" className="block text-sm/6 font-medium">
                Pay Back
              </label>
              <div className="mt-2">
                <input
                  id="pay_back"
                  name="pay_back"
                  type="text"
                  autoComplete="pay_back"
                  className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="payment_status"
                className="block text-sm/6 font-medium"
              >
                Payment Status
              </label>
              <select className="mt-2 bg-white border border-gray-300 rounded-md px-2 py-2 w-full">
                <option>Paid</option>
                <option>Partial</option>
                <option>Unpaid</option>
              </select>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="due_amount"
                className="block text-sm/6 font-medium"
              >
                Amount Due
              </label>
              <div className="mt-2">
                <input
                  id="due_amount"
                  name="due_amount"
                  type="text"
                  autoComplete="due_amount"
                  className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-2xl font-medium">Notes & Attachments</h3>
          <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="notes"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Notes
              </label>
              <div className="mt-2">
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  defaultValue={""}
                />
              </div>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="attachments"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Attachments
              </label>
              <div className="mt-2">
                <input
                  id="attachments"
                  name="attachments"
                  type="file"
                  multiple
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-[#615cf6] file:text-white
                    hover:file:bg-indigo-700
                  "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
