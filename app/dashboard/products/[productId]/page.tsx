"use client";

import Image from "next/image";
import * as React from "react";
import { FaMoneyBill1Wave, FaChartBar, FaCartShopping } from "react-icons/fa6";
import { CiShoppingTag } from "react-icons/ci";
import { PiWarningCircleFill } from "react-icons/pi";
import { MdNumbers, MdOutlineNumbers } from "react-icons/md";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useProduct } from "@/lib/hooks/products/useProduct";

export default function SingleProduct() {
    const { productId } = useParams();
    const { data: product } = useProduct(productId?.toString());

    return (
        <main className="p-8">
            <div className="w-full flex flex-row justify-between items-center bg-white rounded-2xl shadow-md p-6">
                <h3 className="text-2xl font-medium">Product Details</h3>
                <Link
                    href={`/dashboard/products/${productId}/edit`}
                    className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md"
                >
                    Edit Product
                </Link>
            </div>
            <div className="w-full mt-6 flex flex-row justify-between items-start gap-6">
                <div className="w-2/3 bg-white rounded-2xl shadow-md p-6">
                    <div className="w-full flex flex-row justify-start items-start gap-6 mb-6">
                        <div className="w-1/4 h-full rounded-2xl border border-gray-200 overflow-hidden">
                            <Image
                                src={product?.image_url ?? ""}
                                alt={product?.name ?? "N/A"}
                                width={300}
                                height={300}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <div className="w-1/2">
                            <h3 className="text-2xl font-bold mb-2">
                                {product?.name ?? "N/A"}
                            </h3>
                            <h5 className="text-md text-gray-500 mb-4">
                                {product?.sku ?? "N/A"}
                            </h5>
                            <p className="text-gray-700 mb-4">
                                {product?.category?.name ?? "N/A"}
                            </p>
                            {product?.tags ? (
                                <div className="mb-4 flex flex-row flex-wrap justify-start items-center gap-4">
                                    {product?.tags
                                        .split(",")
                                        .map((tag, index) => (
                                            <span
                                                key={index}
                                                className="px-4 py-1 rounded-full text-white bg-green-500"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </div>

                <div className="w-1/3 bg-white rounded-2xl shadow-md p-6 flex flex-col justify-start items-center gap-4">
                    <div className="w-full flex flex-col gap-4">
                        {/* Selling Price */}
                        <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-2 shadow-sm">
                            <FaMoneyBill1Wave className="text-green-500 text-2xl" />
                            <div className="text-xs text-gray-500">
                                Cost Price
                            </div>
                            <div className="text-lg font-bold text-gray-900">
                                ৳{product?.cost_price}
                            </div>
                        </div>
                        {/* Cost Price (if tracked) */}
                        {/* {product.price && (
                            <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-2 shadow-sm">
                                <CiShoppingTag className="text-blue-500 text-2xl" />
                                <div className="text-xs text-gray-500">
                                    Cost Price
                                </div>
                                <div className="text-lg font-bold text-gray-900">
                                    ৳{product.price}
                                </div>
                            </div>
                        )} */}
                        {/* Current Stock */}
                        <div
                            className={`flex items-center gap-3 rounded-xl p-2 shadow-sm ${
                                (product?.current_stock_quantity ?? 0) === 0
                                    ? "bg-red-50"
                                    : (product?.current_stock_quantity ?? 0) <
                                      10
                                    ? "bg-yellow-50"
                                    : "bg-gray-50"
                            }`}
                        >
                            <FaChartBar
                                className={`text-2xl ${
                                    (product?.current_stock_quantity ?? 0) === 0
                                        ? "text-red-500"
                                        : (product?.current_stock_quantity ??
                                              0) < 10
                                        ? "text-yellow-500"
                                        : "text-gray-500"
                                }`}
                            />
                            <div className="text-xs text-gray-500">
                                Current Stock
                            </div>
                            <div
                                className={`text-lg font-bold ${
                                    (product?.current_stock_quantity ?? 0) === 0
                                        ? "text-red-600"
                                        : (product?.current_stock_quantity ??
                                              0) < 10
                                        ? "text-yellow-700"
                                        : "text-gray-900"
                                }`}
                            >
                                {product?.current_stock_quantity ?? 0} units
                            </div>
                        </div>
                        {/* Total Sold */}
                        <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-2 shadow-sm">
                            <FaCartShopping className="text-purple-500 text-2xl" />
                            <div className="text-xs text-gray-500">
                                Total Sold
                            </div>
                            <div className="text-lg font-bold text-gray-900">
                                {/* {product.price} units */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-row justify-between items-start gap-6 my-6">
                <div className="w-1/2 bg-white rounded-2xl shadow-md p-6">
                    <div className="mb-4 relative">
                        <h3 className="text-xl font-bold mb-2">
                            Product Details
                        </h3>
                        <p
                            className={
                                "text-gray-600 pr-4 pb-4 max-h-[140px] overflow-y-scroll"
                            }
                        >
                            {product?.description ?? "N/A"}
                        </p>
                        <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-white to-transparent flex items-end justify-center pointer-events-none"></div>
                    </div>

                    <h3 className="text-xl font-bold my-2">Variants</h3>
                    <div className="relative max-h-[120px] overflow-y-scroll">
                        {product?.variants && product.variants.length > 0 ? (
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-gray-300 text-gray-500">
                                        <th className="px-2 py-2 font-normal text-center">
                                            Variant name
                                        </th>
                                        <th className="px-2 py-2 font-normal text-center">
                                            SKU / Barcode
                                        </th>
                                        <th className="px-2 py-2 font-normal text-center">
                                            Cost Price
                                        </th>
                                        <th className="px-2 py-2 font-normal text-center">
                                            Stock Qty
                                        </th>
                                        <th className="px-2 py-2 font-normal text-center">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {product?.variants.map((variant) => (
                                        <tr
                                            key={variant.id}
                                            className="border-b border-gray-300 hover:bg-gray-50"
                                        >
                                            <td className="px-1 py-2 text-center">
                                                {variant.name ?? "N/A"}
                                            </td>
                                            <td className="px-1 py-2 text-center">
                                                {variant.sku ?? "N/A"}
                                            </td>
                                            <td className="px-1 py-2 text-center">
                                                ${variant.cost_price ?? 0}
                                            </td>
                                            <td className="px-1 py-2 text-center">
                                                {variant.current_stock_quantity ??
                                                    "N/A"}
                                            </td>
                                            <td className="px-1 py-2 text-center">
                                                In Stock
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            ""
                        )}
                        <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-white to-transparent flex items-end justify-center pointer-events-none"></div>
                    </div>
                    <div className="my-2 w-full flex flex-row justify-between items-start gap-6">
                        <div className="w-1/2">
                            <h3 className="text-xl font-bold my-2">
                                Tax / VAT Settings
                            </h3>
                            <ul className="list-disc list-inside my-4">
                                <li>Tax Class: Standard</li>
                                <li>VAT Rate: 20%</li>
                            </ul>
                            <Link
                                href="/settings/tax"
                                className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md"
                            >
                                Edit Taxes
                            </Link>
                        </div>
                        <div className="w-1/2">
                            <h3 className="text-xl font-bold my-2">
                                Expiry / Batch Information
                            </h3>
                            <div className="my-4 bg-gray-50 rounded-xl p-2 shadow-sm">
                                <div className="flex items-center gap-3 mb-2">
                                    <PiWarningCircleFill className="text-red-500 text-2xl" />
                                    <div className="text-md font-bold text-gray-500">
                                        Next Expiry Date:
                                    </div>
                                    <div className="text-sm text-gray-900">
                                        12 Sept 2025
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <MdOutlineNumbers className="text-black-500 text-2xl" />
                                    <div className="text-md font-bold text-gray-500">
                                        Batch No:
                                    </div>
                                    <div className="text-sm text-gray-900">
                                        vb-001
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 bg-white rounded-2xl shadow-md p-6">
                    <h3 className="text-xl font-bold mb-2">
                        Inventory History
                    </h3>

                    <div className="relative max-h-[200px] overflow-y-scroll my-6">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-300 text-gray-500">
                                    <th className="px-2 py-2 font-normal text-center">
                                        Date
                                    </th>
                                    <th className="px-2 py-2 font-normal text-center">
                                        Action
                                    </th>
                                    <th className="px-2 py-2 font-normal text-center">
                                        Qty
                                    </th>
                                    <th className="px-2 py-2 font-normal text-center">
                                        Remaining
                                    </th>
                                    <th className="px-2 py-2 font-normal text-center">
                                        User
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-300 hover:bg-gray-50">
                                    <td className="px-1 py-2 text-center">
                                        18 Aug 25
                                    </td>
                                    <td className="px-1 py-2 text-center">
                                        Sale
                                    </td>
                                    <td className="px-1 py-2 text-center">
                                        -5
                                    </td>
                                    <td className="px-1 py-2 text-center">
                                        20
                                    </td>
                                    <td className="px-1 py-2 text-center">
                                        Staff A
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-300 hover:bg-gray-50">
                                    <td className="px-1 py-2 text-center">
                                        18 Aug 25
                                    </td>
                                    <td className="px-1 py-2 text-center">
                                        Sale
                                    </td>
                                    <td className="px-1 py-2 text-center">
                                        -5
                                    </td>
                                    <td className="px-1 py-2 text-center">
                                        20
                                    </td>
                                    <td className="px-1 py-2 text-center">
                                        Staff A
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-300 hover:bg-gray-50">
                                    <td className="px-1 py-2 text-center">
                                        18 Aug 25
                                    </td>
                                    <td className="px-1 py-2 text-center">
                                        Sale
                                    </td>
                                    <td className="px-1 py-2 text-center">
                                        -5
                                    </td>
                                    <td className="px-1 py-2 text-center">
                                        20
                                    </td>
                                    <td className="px-1 py-2 text-center">
                                        Staff A
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-300 hover:bg-gray-50">
                                    <td className="px-1 py-2 text-center">
                                        18 Aug 25
                                    </td>
                                    <td className="px-1 py-2 text-center">
                                        Sale
                                    </td>
                                    <td className="px-1 py-2 text-center">
                                        -5
                                    </td>
                                    <td className="px-1 py-2 text-center">
                                        20
                                    </td>
                                    <td className="px-1 py-2 text-center">
                                        Staff A
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-white to-transparent flex items-end justify-center pointer-events-none"></div>
                    </div>
                </div>
            </div>
        </main>
    );
}
