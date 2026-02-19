import { PaginatedResponse } from "@/lib/core/PaginatedResponse";
import { InventoryTransferInterface } from "@/lib/interfaces/InventoryTransferInterface";
import { InfiniteData } from "@tanstack/react-query";
import Link from "next/link";
import * as React from "react";

export interface IInventoryTransferTableProps {
    data?: InfiniteData<PaginatedResponse<InventoryTransferInterface>>;
}

export function InventoryTransferTable({ data }: IInventoryTransferTableProps) {
    return data?.pages?.[0].total ? (
        <table className="hidden md:table w-full text-left mt-4">
            <thead>
                <tr className="border-b border-gray-300 text-gray-500">
                    <th className="px-2 py-2 font-normal">Transfer No</th>
                    <th className="px-2 py-2 font-normal">Source</th>
                    <th className="px-2 py-2 font-normal">Destination</th>
                    <th className="px-2 py-2 font-normal">Product</th>
                    <th className="px-2 py-2 font-normal">Total Quantity</th>
                    <th className="px-2 py-2 font-normal">Status</th>
                    <th className="px-2 py-2 font-normal">Created By</th>
                    <th className="px-2 py-2 font-normal">Date Initiated</th>
                    <th className="px-2 py-2 font-normal">Actions</th>
                </tr>
            </thead>
            <tbody>
                {data?.pages?.map((page) =>
                    page?.data?.map((inventoryTransfer) => (
                        <tr
                            key={inventoryTransfer?.id}
                            className="border-b border-gray-300 hover:bg-gray-50"
                        >
                            <td className="px-2 py-4">
                                {inventoryTransfer.transfer_number ?? "N/A"}
                            </td>
                            <td className="px-2 py-4">
                                {inventoryTransfer.source_inventory?.store
                                    ?.name ?? "N/A"}
                            </td>
                            <td className="px-2 py-4">
                                {inventoryTransfer.destination_inventory?.store
                                    ?.name ?? "N/A"}
                            </td>
                            <td className="px-2 py-4">
                                {inventoryTransfer.source_inventory?.product
                                    ?.name ?? "N/A"}
                            </td>
                            <td className="px-2 py-4">
                                {inventoryTransfer.destination_inventory
                                    ?.quantity ?? "N/A"}
                            </td>
                            <td className="px-2 py-4">
                                {inventoryTransfer.status ?? "N/A"}
                            </td>
                            <td className="px-2 py-4">
                                {inventoryTransfer.created_by?.name ?? "N/A"}
                            </td>
                            <td className="px-2 py-4">
                                {inventoryTransfer.created_at ?? "N/A"}
                            </td>
                            <td className="px-2 py-4 flex flex-wrap gap-2">
                                <Link
                                    href={`/`}
                                    className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white"
                                >
                                    View
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
