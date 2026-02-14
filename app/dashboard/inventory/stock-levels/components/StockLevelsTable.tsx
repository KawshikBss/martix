import Loader from "@/components/ui/loaders/Loader";
import { PaginatedResponse } from "@/lib/core/PaginatedResponse";
import { InventoryInterface } from "@/lib/interfaces/InventoryInterface";
import { InfiniteData } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

export interface IStockLevelsTableProps {
    data?: InfiniteData<PaginatedResponse<InventoryInterface>>;
}

export function StockLevelsTable({ data }: IStockLevelsTableProps) {
    return data?.pages?.[0].total ? (
        <table className="hidden md:table w-full text-left">
            <thead>
                <tr className="border-b border-gray-300 text-gray-500">
                    <th className="px-2 py-2 font-normal text-center">
                        Product
                    </th>
                    <th className="px-2 py-2 font-normal">Variation</th>
                    <th className="px-2 py-2 font-normal">Store</th>
                    <th className="px-2 py-2 font-normal">Stock</th>
                    <th className="px-2 py-2 font-normal">Reorder Point</th>
                    <th className="px-2 py-2 font-normal">Expiry</th>
                    <th className="px-2 py-2 font-normal">Status</th>
                    <th className="px-2 py-2 font-normal text-center">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                {data?.pages?.map((page) =>
                    page.data.map((inventory) => (
                        <tr
                            key={inventory.id}
                            className="border-b border-gray-300 hover:bg-gray-50"
                        >
                            <td className="px-2 py-4 font-medium">
                                <Link
                                    href={`/dashboard/products/${inventory.product.id}`}
                                    className="flex items-center gap-4"
                                >
                                    <Image
                                        src={inventory.product.image_url}
                                        alt={inventory.product.name}
                                        width={60}
                                        height={40}
                                        className="aspect-3/2 object-cover rounded-lg"
                                    />
                                    {inventory.product.name}{" "}
                                    {inventory.product.sku && (
                                        <span>
                                            {"[ "}
                                            {inventory.product.sku}
                                            {" ]"}
                                        </span>
                                    )}
                                </Link>
                            </td>
                            <td className="px-2 py-4">
                                {inventory.product.variation_meta != null ? (
                                    <>
                                        {inventory.product.variation_meta?.option?.toLocaleUpperCase()}
                                        {": "}
                                        {
                                            inventory.product.variation_meta
                                                ?.value
                                        }
                                    </>
                                ) : (
                                    "Base Product"
                                )}
                            </td>
                            <td className="px-2 py-4">
                                <Link
                                    href={`/dashboard/stores/${inventory.store.id}`}
                                >
                                    {inventory.store.name}
                                </Link>
                            </td>
                            <td className="px-2 py-4">
                                {inventory.quantity} /{" "}
                                {inventory.initial_quantity}
                            </td>
                            <td className="px-2 py-4">
                                {inventory.reorder_level}
                            </td>
                            <td className="px-2 py-4">
                                {inventory.expiry_date}
                            </td>
                            <td className="px-2 py-4">
                                {inventory.quantity <= 0
                                    ? "Out of"
                                    : inventory.quantity <
                                        inventory.reorder_level
                                      ? "Low"
                                      : "In"}{" "}
                                Stock
                            </td>
                            <td className="px-2 py-4 flex justify-center gap-4">
                                <Link
                                    href={`/dashboard/inventory/stock-levels/${inventory.id}/adjust`}
                                    className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white"
                                >
                                    Adjust Stock
                                </Link>
                                <Link
                                    href={"/"}
                                    className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white"
                                >
                                    {inventory.quantity <
                                    inventory.reorder_level
                                        ? "Reorder"
                                        : "Stock In"}
                                </Link>
                            </td>
                        </tr>
                    )),
                )}
            </tbody>
        </table>
    ) : (
        ""
    );
}
