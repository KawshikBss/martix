import Loader from "@/components/ui/loaders/Loader";
import { PaginatedResponse } from "@/lib/core/PaginatedResponse";
import { InventoryMovementInterface } from "@/lib/interfaces/InventoryMovementInterface";
import { IProduct } from "@/public/data/productsData";
import { InfiniteData } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

export interface IInventoryMovementsTableProps {
    data?: InfiniteData<PaginatedResponse<InventoryMovementInterface>>;
}

export function InventoryMovementsTable({
    data,
}: IInventoryMovementsTableProps) {
    return data?.pages?.[0].total ? (
        <table className="hidden md:table w-full text-left mt-4">
            <thead>
                <tr className="border-b border-gray-300 text-gray-500">
                    <th className="px-2 py-2 font-normal">Date & Time</th>
                    <th className="px-2 py-2 font-normal text-center">
                        Product
                    </th>
                    <th className="px-2 py-2 font-normal">Variant</th>
                    <th className="px-2 py-2 font-normal">Store</th>
                    <th className="px-2 py-2 font-normal">Type</th>
                    <th className="px-2 py-2 font-normal">Quantity Change</th>
                    <th className="px-2 py-2 font-normal">Balance</th>
                    <th className="px-2 py-2 font-normal">Entered By</th>
                    <th className="px-2 py-2 font-normal">Reference</th>
                    <th className="px-2 py-2 font-normal text-center">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                {data?.pages?.map((page) =>
                    page?.data?.map((inventoryMovement) => (
                        <tr
                            key={inventoryMovement.id}
                            className="border-b border-gray-300 hover:bg-gray-50"
                        >
                            <td className="px-2 py-4">
                                {inventoryMovement.updated_at}
                            </td>
                            <td className="px-2 py-4 font-medium">
                                <Link
                                    href={`/dashboard/products/${inventoryMovement.inventory.product.id}`}
                                    className="flex items-center gap-4"
                                >
                                    <Image
                                        src={
                                            inventoryMovement.inventory.product
                                                .image_url
                                        }
                                        alt={
                                            inventoryMovement.inventory.product
                                                .name
                                        }
                                        width={60}
                                        height={40}
                                        className="aspect-3/2 object-cover rounded-lg"
                                    />
                                    {inventoryMovement.inventory.product.name}{" "}
                                    {inventoryMovement.inventory.product
                                        .sku && (
                                        <span>
                                            {"[ "}
                                            {
                                                inventoryMovement.inventory
                                                    .product.sku
                                            }
                                            {" ]"}
                                        </span>
                                    )}
                                </Link>
                            </td>
                            <td className="px-2 py-4">
                                {inventoryMovement.inventory.product
                                    .variation_meta != null ? (
                                    <>
                                        {inventoryMovement.inventory.product.variation_meta?.option?.toLocaleUpperCase()}
                                        {": "}
                                        {
                                            inventoryMovement.inventory.product
                                                .variation_meta?.value
                                        }
                                    </>
                                ) : (
                                    "Base Product"
                                )}
                            </td>
                            <td className="px-2 py-4">
                                {inventoryMovement.inventory.store.name}
                            </td>
                            <td className="px-2 py-4">
                                {inventoryMovement.type}
                            </td>
                            <td className="px-2 py-4">
                                {inventoryMovement.quantity}
                            </td>
                            <td className="px-2 py-4">
                                {inventoryMovement.inventory.quantity}
                            </td>
                            <td className="px-2 py-4">
                                {inventoryMovement?.performed_by?.name ?? "N/A"}
                            </td>
                            <td className="px-2 py-4">
                                {inventoryMovement.reference_text}
                            </td>
                            <td className="px-2 py-4 flex justify-center gap-4">
                                <Link
                                    href={"/"}
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
