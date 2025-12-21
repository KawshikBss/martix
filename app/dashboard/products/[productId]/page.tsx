"use client";

import Image from "next/image";
import { FaMoneyBill1Wave, FaChartBar, FaCartShopping } from "react-icons/fa6";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useProduct } from "@/lib/hooks/products/useProduct";
import { HiReceiptTax } from "react-icons/hi";
import { FaBoxes, FaUser } from "react-icons/fa";

export default function SingleProduct() {
    const { productId } = useParams();
    const { data: product } = useProduct(productId?.toString());
    const { back } = useRouter();

    return (
        <main className="p-4 md:p-8">
            <div className="w-full flex flex-row justify-between items-center bg-white rounded-2xl shadow-md p-6">
                <h3 className="text-2xl font-medium">Product Details</h3>
                <div className="flex flex-row gap-4">
                    <button
                        onClick={back}
                        className="bg-transparent hover:bg-gray-500 text-gray-500 hover:text-white border border-gray-500 px-2 py-1 rounded-md cursor-pointer mr-2"
                    >
                        Go Back
                    </button>
                    <Link
                        href={`/dashboard/products/${productId}/edit`}
                        className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md"
                    >
                        Edit Product
                    </Link>
                </div>
            </div>
            <div className="w-full mt-6 grid grid-cols-1 md:grid-cols-6 gap-6">
                <div className="col-span-1 md:col-span-4 bg-white rounded-2xl shadow-md p-4 md:p-6 flex flex-col gap-6">
                    <div className="w-full flex flex-col md:flex-row justify-start items-start gap-6">
                        <div className="w-full md:w-3/4 h-full aspect-video rounded-2xl border border-gray-200 overflow-hidden">
                            <Image
                                src={
                                    product?.image_url ??
                                    "/profiles/default.png"
                                }
                                alt={product?.name ?? "N/A"}
                                width={300}
                                height={300}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <div className="w-1/2">
                            <h3 className="text-3xl font-bold mb-4">
                                {product?.name ?? "N/A"}
                            </h3>
                            <h5 className="text-md text-gray-500 mb-2">
                                <span className="font-semibold">SKU:</span>{" "}
                                {product?.sku ?? "N/A"}
                            </h5>
                            <h5 className="text-md text-gray-500 mb-2">
                                <span className="font-semibold">Brand:</span>{" "}
                                {product?.brand ?? "N/A"}
                            </h5>
                            <p className="text-gray-500 mb-4">
                                <span className="font-semibold">Category:</span>{" "}
                                {product?.category?.name ?? "N/A"}
                            </p>
                            <div className="flex flex-row justify-start items-center gap-2 mb-6">
                                <div
                                    className={`w-4 h-4 rounded-full bg-${
                                        product?.is_active
                                            ? "green-500"
                                            : "red-400"
                                    }`}
                                />
                                <span className="text-md font-regular text-gray-700">
                                    {product?.is_active ? "Active" : "Inactive"}
                                </span>
                            </div>
                            {product?.tags ? (
                                <div className="flex flex-row flex-wrap justify-start items-center gap-4">
                                    {product?.tags
                                        .split(",")
                                        .map((tag, index) => (
                                            <span
                                                key={index}
                                                className="px-4 py-1 rounded-full text-white text-sm text-nowrap bg-green-500"
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
                    <div className="mb-2 relative">
                        <h3 className="text-xl font-bold mb-2">Details</h3>
                        <p
                            className={
                                "text-gray-600 pr-4 pb-4 max-h-[140px] overflow-y-scroll"
                            }
                        >
                            {product?.description ?? "N/A"}
                        </p>
                        <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-white to-transparent flex items-end justify-center pointer-events-none" />
                    </div>
                    <div className="flex flex-row flex-wrap gap-4">
                        <Link
                            href={`/dashboard/products/${productId}/edit`}
                            className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md"
                        >
                            Edit
                        </Link>
                        <Link
                            href={`/dashboard/products/${productId}/edit`}
                            className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md"
                        >
                            Duplicate
                        </Link>
                        <Link
                            href={`/dashboard/products/${productId}/edit`}
                            className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md"
                        >
                            Deactivate
                        </Link>
                    </div>
                </div>

                <div className="col-span-1 md:col-span-2 bg-white rounded-2xl shadow-md p-4 md:p-6">
                    <div className="w-full flex flex-col gap-4">
                        <div className="flex items-center gap-6 bg-gray-50 rounded-xl p-4 shadow-sm">
                            <FaUser className="text-blue-500 text-3xl" />
                            <div className="text-sm font-semibold text-gray-500">
                                Created By:
                            </div>
                            <div className="text-lg text-gray-900">
                                {product?.owner?.name ?? "N/A"}
                            </div>
                        </div>
                        <div className="flex items-center gap-6 bg-gray-50 rounded-xl p-4 shadow-sm">
                            <FaBoxes className="text-purple-500 text-3xl" />
                            <div className="text-sm font-semibold text-gray-500">
                                {product?.variation_meta
                                    ? product?.variation_meta?.option?.toLocaleUpperCase()
                                    : "Variation"}
                                :
                            </div>
                            <div className="text-lg text-gray-900">
                                {product?.variation_meta
                                    ? product?.variation_meta?.value
                                    : "Main"}
                            </div>
                        </div>
                        <div className="flex items-center gap-6 bg-gray-50 rounded-xl p-4 shadow-sm">
                            <FaMoneyBill1Wave className="text-green-500 text-3xl" />
                            <div className="text-sm font-semibold text-gray-500">
                                Cost Price:
                            </div>
                            <div className="text-lg text-gray-900">
                                ৳{product?.cost_price ?? "N/A"}
                            </div>
                        </div>
                        <div className="flex items-center gap-6 bg-gray-50 rounded-xl p-4 shadow-sm">
                            <HiReceiptTax className="text-orange-500 text-3xl" />
                            <div className="text-sm font-semibold text-gray-500">
                                Tax:
                            </div>
                            <div className="text-lg text-gray-900">
                                {product?.tax_type ?? "N/A"}-{" "}
                                {product?.tax_rate ?? "N/A"}
                            </div>
                        </div>
                        <div
                            className={`flex items-center gap-6 rounded-xl p-4 shadow-sm ${
                                (product?.current_stock_quantity ?? 0) === 0
                                    ? "bg-red-100"
                                    : (product?.current_stock_quantity ?? 0) <
                                      10
                                    ? "bg-yellow-100"
                                    : "bg-emerald-100"
                            }`}
                        >
                            <FaChartBar
                                className={`text-3xl ${
                                    (product?.current_stock_quantity ?? 0) === 0
                                        ? "text-red-500"
                                        : (product?.current_stock_quantity ??
                                              0) < 10
                                        ? "text-yellow-500"
                                        : "text-emerald-500"
                                }`}
                            />
                            <div className="text-sm font-semibold text-gray-500">
                                Current Stock:
                            </div>
                            <div
                                className={`text-lg ${
                                    (product?.current_stock_quantity ?? 0) === 0
                                        ? "text-red-600"
                                        : (product?.current_stock_quantity ??
                                              0) < 10
                                        ? "text-yellow-700"
                                        : "text-emerald-900"
                                }`}
                            >
                                {product?.current_stock_quantity ?? 0} units
                            </div>
                        </div>
                        <div className="flex items-center gap-6 bg-gray-50 rounded-xl p-4 shadow-sm">
                            <FaCartShopping className="text-amber-500 text-3xl" />
                            <div className="text-sm font-semibold text-gray-500">
                                Total Sold:
                            </div>
                            <div className="text-lg text-gray-900">
                                {/* {product.price} units */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 my-6">
                <h3 className="text-2xl font-bold mb-8">Variations</h3>
                {product?.variants?.length ? (
                    <div className="relative">
                        <div className="max-h-[200px] overflow-y-scroll">
                            <table className="w-full text-left hidden md:table">
                                <thead>
                                    <tr className="border-b border-gray-300 text-gray-500">
                                        <th
                                            colSpan={2}
                                            className="px-2 py-2 font-normal text-center"
                                        >
                                            Variant
                                        </th>
                                        <th className="px-2 py-2 font-normal">
                                            SKU
                                        </th>
                                        <th className="px-2 py-2 font-normal">
                                            Options
                                        </th>
                                        <th className="px-2 py-2 font-normal">
                                            Total Stock
                                        </th>
                                        <th className="px-2 py-2 font-normal text-end">
                                            Status
                                        </th>
                                        <th className="px-2 py-2 font-normal text-center">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {product?.variants?.map((variant) => (
                                        <tr
                                            key={variant.id}
                                            className="border-b border-gray-300 hover:bg-gray-50"
                                        >
                                            <td className="px-2 py-4">
                                                <Link
                                                    href={`/dashboard/products/${variant?.id}`}
                                                >
                                                    <Image
                                                        src={variant?.image_url}
                                                        alt={variant?.name}
                                                        width={60}
                                                        height={40}
                                                        className="aspect-3/2 object-cover rounded-lg"
                                                    />
                                                </Link>
                                            </td>
                                            <td className="px-2 py-4">
                                                {variant.name ?? "N/A"}
                                            </td>
                                            <td className="px-2 py-4">
                                                {variant.sku ?? "N/A"}
                                            </td>
                                            <td className="px-2 py-4">
                                                {variant.variation_meta.option.toLocaleUpperCase() ??
                                                    "N/A"}
                                                :{" "}
                                                {variant.variation_meta.value ??
                                                    "N/A"}
                                            </td>
                                            <td className="px-2 py-4">
                                                {variant.current_stock_quantity ??
                                                    "N/A"}
                                            </td>
                                            <td className="px-2 py-4">
                                                {variant.is_active
                                                    ? "Active"
                                                    : "Inactive"}
                                            </td>
                                            <td className="px-2 py-4 flex justify-center gap-4 flex-wrap">
                                                <Link
                                                    href={`/dashboard/products/${variant.id}`}
                                                    className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white"
                                                >
                                                    View
                                                </Link>
                                                <Link
                                                    href={`/dashboard/products/${variant.id}/edit`}
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
                        <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-white to-transparent flex items-end justify-center pointer-events-none" />
                    </div>
                ) : (
                    <div className="text-lg text-gray-900">No Variations</div>
                )}
            </div>
            <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 my-6">
                <h3 className="text-2xl font-bold mb-8">Pricing & Tax</h3>
                <h4 className="text-xl font-semibold mb-2">Default Tax:</h4>
                <p className="text-gray-500 mb-6">
                    <span className="font-semibold">
                        {product?.tax_type ?? "N/A"} -
                    </span>{" "}
                    {product?.tax_rate ?? "N/A"}
                </p>
                <h4 className="text-xl font-semibold mb-2">Store Pricings:</h4>
                {product?.inventories.length ||
                product?.variants.filter(
                    (variant) => variant.inventories.length > 0
                ).length ? (
                    <div className="flex flex-col gap-4 text-gray-500 text-lg">
                        {product?.inventories?.map((stock) => (
                            <div
                                key={stock.id}
                                className="w-full grid grid-cols-4 md:grid-cols-5 items-center"
                            >
                                <div className="col-span-4 md:col-span-1">
                                    <span className="font-semibold">
                                        Store:
                                    </span>{" "}
                                    {stock?.store.name ?? "N/A"}
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                    <span className="font-semibold">
                                        Variant:
                                    </span>{" "}
                                    Main
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                    <span className="font-semibold">
                                        Price:
                                    </span>{" "}
                                    ${stock?.selling_price ?? "N/A"}
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                    <span className="font-semibold">Tax:</span>{" "}
                                    {product?.tax_type ?? "N/A"}-{" "}
                                    {product?.tax_rate ?? "N/A"}
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                    <span className="font-semibold">
                                        Total:
                                    </span>{" "}
                                    ${stock.selling_price ?? "N/A"}
                                </div>
                            </div>
                        ))}
                        {product?.variants?.map((variant) =>
                            variant.inventories.map((stock) => (
                                <div
                                    key={stock.id}
                                    className="w-full grid grid-cols-4 md:grid-cols-5 items-center"
                                >
                                    <div className="col-span-4 md:col-span-1">
                                        <span className="font-semibold">
                                            Store:
                                        </span>{" "}
                                        {stock?.store.name ?? "N/A"}
                                    </div>
                                    <div className="col-span-2 md:col-span-1">
                                        <span className="font-semibold">
                                            {variant?.variation_meta?.option?.toLocaleUpperCase()}
                                            :
                                        </span>{" "}
                                        {variant?.variation_meta?.value}
                                    </div>
                                    <div className="col-span-2 md:col-span-1">
                                        <span className="font-semibold">
                                            Price:
                                        </span>{" "}
                                        ${stock?.selling_price ?? "N/A"}
                                    </div>
                                    <div className="col-span-2 md:col-span-1">
                                        <span className="font-semibold">
                                            Tax:
                                        </span>{" "}
                                        {variant?.tax_type ?? "N/A"}-{" "}
                                        {variant?.tax_rate ?? "N/A"}
                                    </div>
                                    <div className="col-span-2 md:col-span-1">
                                        <span className="font-semibold">
                                            Total:
                                        </span>{" "}
                                        ${stock.selling_price ?? "N/A"}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                ) : (
                    <div className="text-lg text-gray-900">
                        No Store Listings
                    </div>
                )}
            </div>
            <div className="w-full bg-white rounded-2xl shadow-md p-4 md:p-6 my-6 grid grid-cols-4 md:grid-cols-4 items-center">
                <div className="text-center col-span-2 md:col-span-1">
                    <span className="font-semibold">Created at:</span>{" "}
                    {product?.created_at ?? "N/A"}
                </div>
                <div className="text-center col-span-2 md:col-span-1">
                    <span className="font-semibold">Updated at:</span>{" "}
                    {product?.updated_at ?? "N/A"}
                </div>
                <div className="text-center col-span-2 md:col-span-1">
                    <span className="font-semibold">Owner:</span>{" "}
                    {product?.owner?.name ?? "N/A"}
                </div>
                <div className="text-center col-span-2 md:col-span-1">
                    <span className="font-semibold">Product Id:</span>{" "}
                    {product?.id ?? "N/A"}
                </div>
            </div>
        </main>
    );
}
