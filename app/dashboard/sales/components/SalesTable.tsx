import { PaginatedResponse } from "@/lib/core/PaginatedResponse";
import { SaleInterface } from "@/lib/interfaces/SaleInterface";
import { InfiniteData } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

type Props = {
    data?: InfiniteData<PaginatedResponse<SaleInterface>>;
};

const SalesTable = ({ data }: Props) => {
    return data?.pages?.[0].total ? (
        <table className="hidden md:table w-full text-left mt-4">
            <thead>
                <tr className="border-b border-gray-300 text-gray-500">
                    <th className="px-2 py-2 font-normal">Sale No</th>
                    <th className="px-2 py-2 font-normal">Date</th>
                    <th className="px-2 py-2 font-normal">Store</th>
                    <th className="px-2 py-2 font-normal">Customer</th>
                    <th className="px-2 py-2 font-normal">Items</th>
                    <th className="px-2 py-2 font-normal">Total</th>
                    <th className="px-2 py-2 font-normal">Payment</th>
                    <th className="px-2 py-2 font-normal">Status</th>
                    <th className="px-2 py-2 font-normal">Actions</th>
                </tr>
            </thead>
            <tbody>
                {data?.pages?.map((page) =>
                    page.data.map((item, index) => (
                        <tr
                            key={item.id}
                            className="border-b border-gray-300 hover:bg-gray-50"
                        >
                            <td className="px-2 py-4">{item.sale_number}</td>
                            <td className="px-2 py-4">{item.created_at}</td>
                            <td className="px-2 py-4">
                                {item.store?.name} - {item.store?.branch}
                            </td>
                            <td className="px-2 py-4">
                                {item.customer?.name ?? "Walk In Customer"}
                            </td>
                            <td className="px-2 py-4">
                                {item.items.map((saleItem, index) => (
                                    <p key={index}>
                                        [{index + 1}]{" "}
                                        <Link
                                            href={`/dashboard/products/${saleItem?.product?.id}`}
                                        >
                                            {saleItem?.product?.name}
                                        </Link>
                                    </p>
                                ))}
                            </td>
                            <td className="px-2 py-4">${item.grand_total}</td>
                            <td className="px-2 py-4">{item.payment_status}</td>
                            <td className="px-2 py-4">{item.status}</td>
                            <td className="px-2 py-4 flex flex-wrap gap-2">
                                <Link
                                    href={`/dashboard/sales/${item.id}`}
                                    className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white"
                                >
                                    View
                                </Link>
                                <Link
                                    href={`/dashboard/sales/${item.id}`}
                                    className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white"
                                >
                                    Print
                                </Link>
                                {item?.status === "pending" && (
                                    <Link
                                        href={`/dashboard/sales/${item.id}`}
                                        className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white"
                                    >
                                        Refund
                                    </Link>
                                )}
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    ) : (
        ""
    );
};

export default SalesTable;
