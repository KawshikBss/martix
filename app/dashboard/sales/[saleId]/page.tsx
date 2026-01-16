"use client";

import { useSale } from "@/lib/hooks/sales/useSale";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import {
    FaCashRegister,
    FaCreditCard,
    FaEquals,
    FaMobile,
    FaPercentage,
    FaPhone,
} from "react-icons/fa";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { TbCashRegister, TbTax } from "react-icons/tb";
import ItemsTable from "./components/ItemsTable";
import ItemsList from "./components/ItemsList";

type Props = {};

const SingleSale = (props: Props) => {
    const { saleId } = useParams();
    const { data: sale } = useSale(saleId?.toString());

    const { back } = useRouter();

    return (
        <main className="p-4 md:p-8">
            <div className="w-full bg-white rounded-2xl shadow-md p-4 md:p-6 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
                <div className="flex flex-row justify-start items-start gap-2">
                    <div>
                        <h3 className="text-2xl font-medium">
                            {sale?.sale_number ?? "N/A"}
                        </h3>
                        <p className="text-sm text-gray-500">
                            {sale?.created_at}
                        </p>
                    </div>
                    <div className="flex flex-row justify-start items-center gap-2">
                        <div
                            className={`w-4 h-4 ms-4 rounded-full bg-${
                                sale?.status == "pending"
                                    ? "yellow-500"
                                    : sale?.status == "completed"
                                    ? "green-500"
                                    : "red-400"
                            }`}
                        />
                        <span className="text-md font-regular text-gray-700">
                            {sale?.status ?? "N/A"}
                        </span>
                    </div>
                </div>
                <div className="flex flex-row gap-4">
                    <button
                        onClick={back}
                        className="bg-transparent hover:bg-gray-500 text-gray-500 hover:text-white border border-gray-500 px-2 py-1 rounded-md cursor-pointer mr-2"
                    >
                        Go Back
                    </button>
                    <Link
                        href={`/dashboard/stores/${saleId}/edit`}
                        className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md"
                    >
                        Invoice
                    </Link>
                    <button className="bg-blue-500 hover:bg-transparent text-white hover:text-blue-500 border border-blue-500 px-2 py-1 rounded-md cursor-pointer mr-2">
                        Print
                    </button>
                    <button className="bg-yellow-500 hover:bg-transparent text-white hover:text-yellow-500 border border-yellow-500 px-2 py-1 rounded-md">
                        Refund
                    </button>
                </div>
            </div>

            <div className="w-full mt-6 grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="col-span-1 md:col-span-2 bg-white rounded-2xl shadow-md p-4 md:p-6">
                    <h3 className="text-lg font-bold mb-2">Store</h3>
                    <h5 className="text-2xl mb-0.5">
                        {sale?.store?.name ?? "N/A"}
                    </h5>
                    <p className="text-xl text-gray-500 mb-4">
                        {sale?.store?.branch ?? "N/A"}
                    </p>
                    <h3 className="text-lg font-bold mb-2">Sold by</h3>
                    <div className="mb-4">
                        <Link
                            href="/dashboard/profile"
                            className="flex flex-row items-center gap-4"
                        >
                            <Image
                                src={
                                    sale?.user?.image_url ??
                                    "/images/user-placeholder.jpg"
                                }
                                alt={sale?.user?.name ?? "User"}
                                className="rounded-full w-[40px] h-[40px] object-cover mb-4"
                                width={40}
                                height={40}
                            />
                            <span className="ms-2 text-gray-700 font-semibold">
                                {sale?.user?.name}
                            </span>
                        </Link>
                        <p className="text-gray-700 mb-2">
                            <FaPhone className="text-blue-600 text-lg inline me-2" />
                            {sale?.user?.phone ?? "N/A"}
                        </p>
                        <p className="text-gray-700">
                            <MdEmail className="text-blue-600 text-lg inline me-2" />
                            {sale?.user?.email ?? "N/A"}
                        </p>
                    </div>
                    {sale?.customer ? (
                        <>
                            <h3 className="text-lg font-bold mb-2">Customer</h3>
                            <div className="mb-4">
                                <Link
                                    href="/dashboard/profile"
                                    className="text-gray-700 font-semibold"
                                >
                                    {sale?.customer?.name}
                                </Link>
                                <p className="text-gray-700 mb-2">
                                    <FaPhone className="text-blue-600 text-lg inline me-2" />
                                    {sale?.customer?.phone ?? "N/A"}
                                </p>
                                <p className="text-gray-700">
                                    <MdEmail className="text-blue-600 text-lg inline me-2" />
                                    {sale?.customer?.email ?? "N/A"}
                                </p>
                            </div>
                        </>
                    ) : (
                        ""
                    )}
                    <div className="flex flex-row items-center gap-6">
                        <div>
                            <h3 className="text-lg font-bold mb-2">
                                Payment Method
                            </h3>
                            <p className="text-xl w-fit px-4 py-2 rounded-md bg-blue-200 text-blue-600 mb-4">
                                {sale?.payment_method == "cash" ? (
                                    <FaMoneyBill1Wave className="text-lg inline me-2" />
                                ) : sale?.payment_method == "card" ? (
                                    <FaCreditCard className="text-lg inline me-2" />
                                ) : sale?.payment_method == "mobile" ? (
                                    <FaMobile className="text-lg inline me-2" />
                                ) : (
                                    <TbCashRegister className="text-lg inline me-2" />
                                )}
                                {sale?.payment_method ?? "N/A"}
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold mb-2">
                                Payment Status
                            </h3>
                            <p
                                className={`text-xl ${
                                    sale?.payment_status == "unpaid"
                                        ? "text-yellow-600 bg-yellow-200"
                                        : sale?.payment_status == "paid"
                                        ? "text-green-600 bg-green-200"
                                        : "text-red-600 bg-red-200"
                                } w-fit px-4 py-2 rounded-md mb-4`}
                            >
                                <FaCashRegister
                                    className={`${
                                        sale?.payment_status == "unpaid"
                                            ? "text-yellow-600"
                                            : sale?.payment_status == "paid"
                                            ? "text-green-600"
                                            : "text-red-600"
                                    } text-lg inline me-2`}
                                />
                                {sale?.payment_status ?? "N/A"}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-span-1 md:col-span-2 bg-white rounded-2xl shadow-md p-4 md:p-6 flex flex-col justify-start items-start gap-6">
                    <div className="bg-gray-200 p-4 rounded-md w-full flex flex-row justify-between items-center">
                        <h5 className="text-lg mb-0.5">
                            <TbCashRegister className="inline me-2" />
                            Subtotal:
                        </h5>
                        <span className="text-gray-700">
                            {sale?.sub_total ?? "N/A"}
                        </span>
                    </div>
                    <div className="bg-gray-200 p-4 rounded-md w-full flex flex-row justify-between items-center">
                        <h5 className="text-lg mb-0.5">
                            <TbTax className="inline me-2" />
                            Tax:
                        </h5>
                        <span className="text-gray-700">
                            {sale?.tax_total ?? "N/A"}
                        </span>
                    </div>
                    <div className="bg-gray-200 p-4 rounded-md w-full flex flex-row justify-between items-center">
                        <h5 className="text-lg mb-0.5">
                            <FaPercentage className="inline me-2" />
                            Discount:
                        </h5>
                        <span className="text-gray-700">
                            {sale?.discount_total ?? "N/A"}
                        </span>
                    </div>
                    <div className="bg-gray-200 p-4 rounded-md w-full flex flex-row justify-between items-center">
                        <h5 className="text-lg mb-0.5">
                            <FaEquals className="inline me-2" />
                            Total:
                        </h5>
                        <span className="text-gray-700">
                            {sale?.grand_total ?? "N/A"}
                        </span>
                    </div>
                    <div className="bg-gray-200 p-4 rounded-md w-full flex flex-row justify-between items-center">
                        <h5 className="text-lg mb-0.5">
                            <FaMoneyBill1Wave className="inline me-2" />
                            Amount Paid:
                        </h5>
                        <span className="text-gray-700">
                            {sale?.paid_amount ?? "N/A"}
                        </span>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 mt-6">
                <ItemsTable data={sale?.items} />
                <ItemsList data={sale?.items} />
            </div>
        </main>
    );
};

export default SingleSale;
