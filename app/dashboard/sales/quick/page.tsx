import productsData from "@/public/data/productsData";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { FaCashRegister, FaMinusSquare, FaPercentage } from "react-icons/fa";
import { PiEqualsFill } from "react-icons/pi";
import CartTable from "./components/CartTable";
import { CartList } from "./components/CartList/CartList";

export default function QuickSale() {
  return (
    <main className="p-4 md:p-8">
      <h3 className="text-2xl font-medium">Quick Sale</h3>
      <div className="w-full bg-white rounded-2xl shadow-md my-6 p-6 flex flex-col md:flex-row md:justify-between gap-4 md:gap-0 items-center md:items-start">
        <div className="flex flex-row md:flex-col justify-between items-start md:items-end gap-4 w-full md:w-fit">
          <select className="bg-white border border-gray-300 rounded-md px-2 py-2 w-2/5 md:w-fit">
            <option>Walk-in Customer</option>
            <option>Customer A</option>
            <option>Customer B</option>
            <option>Customer C</option>
          </select>
          <Link
            href={"/"}
            className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md cursor-pointer"
          >
            + New Customer
          </Link>
        </div>
        <div className="flex flex-row md:flex-col justify-between items-start md:items-end gap-4">
          <div className="sm:col-span-3 flex flex-col md:flex-row items-start md:items-center gap-2">
            <label htmlFor="type" className="block text-sm/6 font-medium">
              Sale Type
            </label>
            <select className="bg-white border border-gray-300 rounded-md px-2 py-2">
              <option>Cash Sale</option>
              <option>Credit Sale</option>
            </select>
          </div>
          <div className="sm:col-span-3 flex flex-col md:flex-row items-start md:items-center gap-2">
            <label htmlFor="invoice" className="block text-sm/6 font-medium">
              Invoice
            </label>
            <input
              id="invoice"
              name="invoice"
              type="text"
              autoComplete="invoice"
              className="block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
            />
          </div>
        </div>
        <div className="w-full md:w-auto flex flex-col-reverse md:flex-col justify-between items-start md:items-end gap-4">
          <div className="flex flex-row items-center gap-4">
            <button className="bg-transparent hover:bg-red-500 text-red-500 hover:text-white border border-red-500 px-2 py-1 rounded-md cursor-pointer mx-2">
              Discard Changes
            </button>
            <button className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md cursor-pointer">
              Complete
            </button>
          </div>
          <div className="sm:col-span-3 flex flex-row items-center gap-2">
            <label htmlFor="date" className="block text-sm/6 font-medium">
              Date
            </label>
            <input
              id="date"
              name="date"
              type="text"
              autoComplete="date"
              className="block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
            />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row justify-between items-start gap-6 my-6">
        <div className="bg-white rounded-2xl shadow-md p-6 w-full md:w-2/3">
          <input
            type="text"
            placeholder="Search products..."
            className="border border-gray-300 rounded-md my-2 px-2 py-1 w-full"
          />
          <h4 className="text-2xl font-medium mt-6">Cart</h4>
          <CartTable data={productsData.slice(0, 4)} />
          <CartList data={productsData.slice(0, 4)} />
        </div>
        <div className="w-full md:w-1/3 h-fit md:aspect-square bg-white rounded-2xl shadow-md p-6 flex flex-col justify-start gap-4">
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
      <div className="w-full bg-white rounded-2xl shadow-md p-6">
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
            <label htmlFor="due_amount" className="block text-sm/6 font-medium">
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
    </main>
  );
}
