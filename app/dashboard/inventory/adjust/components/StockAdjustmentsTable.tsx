import Loader from "@/components/ui/loaders/Loader";
import { InventoryMovementInterface } from "@/lib/interfaces/InventoryMovementInterface";
import { IProduct } from "@/public/data/productsData";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

export interface IStockAdjustmentsTableProps {
    data?: InventoryMovementInterface[];
    isLoading: boolean;
}

export function StockAdjustmentsTable(props: IStockAdjustmentsTableProps) {
    return (
        <div className="hidden md:block w-full bg-white rounded-2xl shadow-md p-6">
            <h4 className="text-lg font-semibold mb-4">Stock Adjustments</h4>
            {!props.isLoading ? (
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-gray-300 text-gray-500">
                            <th className="px-2 py-2 font-normal">
                                Date & Time
                            </th>
                            <th
                                colSpan={2}
                                className="px-2 py-2 font-normal text-center"
                            >
                                Product
                            </th>
                            <th className="px-2 py-2 font-normal">
                                Transaction Type
                            </th>
                            <th className="px-2 py-2 font-normal">Quantity</th>
                            <th className="px-2 py-2 font-normal">Value</th>
                            <th className="px-2 py-2 font-normal">
                                Source / Destination
                            </th>
                            <th className="px-2 py-2 font-normal">
                                Entered By
                            </th>
                            <th className="px-2 py-2 font-normal text-center">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {props?.data?.map((inventoryMovement) => (
                            <tr
                                key={inventoryMovement.id}
                                className="border-b border-gray-300 hover:bg-gray-50"
                            >
                                <td className="px-2 py-4">
                                    {inventoryMovement.updated_at}
                                </td>
                                <td className="px-2 py-4">
                                    <Link
                                        href={`/dashboard/products/${inventoryMovement.inventory.product.id}`}
                                    >
                                        <Image
                                            src={
                                                inventoryMovement.inventory
                                                    .product.image_url
                                            }
                                            alt={
                                                inventoryMovement.inventory
                                                    .product.name
                                            }
                                            width={60}
                                            height={40}
                                            className="aspect-3/2 object-cover rounded-lg"
                                        />
                                    </Link>
                                </td>
                                <td className="px-2 py-4 font-medium">
                                    <Link
                                        href={`/dashboard/products/${inventoryMovement.inventory.product.id}`}
                                    >
                                        {
                                            inventoryMovement.inventory.product
                                                .name
                                        }
                                        <br />
                                        {inventoryMovement.inventory.product
                                            .sku && (
                                            <>
                                                [
                                                {
                                                    inventoryMovement.inventory
                                                        .product.sku
                                                }
                                                ]
                                            </>
                                        )}
                                    </Link>
                                </td>
                                <td
                                    className={`px-2 py-4 text-${
                                        inventoryMovement.type != "stock_out"
                                            ? "green"
                                            : "red"
                                    }-500`}
                                >
                                    {inventoryMovement.type.toLocaleUpperCase()}
                                </td>
                                <td
                                    className={`px-2 py-4 text-${
                                        inventoryMovement.quantity <
                                        inventoryMovement.inventory
                                            .reorder_level
                                            ? "red"
                                            : "green"
                                    }-500`}
                                >
                                    {inventoryMovement.quantity}
                                </td>
                                <td
                                    className={`px-2 py-4 text-${
                                        inventoryMovement.quantity <
                                        inventoryMovement.inventory
                                            .reorder_level
                                            ? "red"
                                            : "green"
                                    }-500`}
                                >
                                    ${inventoryMovement.current_stock_value}
                                </td>
                                <td className="px-2 py-4">
                                    {inventoryMovement.reference_text}
                                </td>
                                <td className="px-2 py-4">
                                    {inventoryMovement?.performed_by?.name ??
                                        "N/A"}
                                </td>
                                <td className="px-2 py-4 flex justify-center gap-4">
                                    <Link
                                        href={"/"}
                                        className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white"
                                    >
                                        View
                                    </Link>
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
            ) : (
                <Loader />
            )}
        </div>
    );
}
