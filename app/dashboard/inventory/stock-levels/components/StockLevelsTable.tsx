import Loader from "@/components/ui/loaders/Loader";
import { InventoryInterface } from "@/lib/interfaces/InventoryInterface";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

export interface IStockLevelsTableProps {
    data: InventoryInterface[] | undefined;
    isLoading: boolean;
}

export function StockLevelsTable(props: IStockLevelsTableProps) {
    return (
        <div className="hidden md:block w-full bg-white rounded-2xl shadow-md p-6">
            <h4 className="text-lg font-semibold mb-4">Stock Details</h4>
            {!props.isLoading ? (
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-gray-300 text-gray-500">
                            <th
                                colSpan={2}
                                className="px-2 py-2 font-normal text-center"
                            >
                                Product
                            </th>
                            <th className="px-2 py-2 font-normal">Stock</th>
                            <th className="px-2 py-2 font-normal">
                                Reorder Point
                            </th>
                            <th className="px-2 py-2 font-normal">Expiry</th>
                            <th className="px-2 py-2 font-normal text-center">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {props?.data?.map((inventory) => (
                            <tr
                                key={inventory.id}
                                className="border-b border-gray-300 hover:bg-gray-50"
                            >
                                <td className="px-2 py-4">
                                    <Link
                                        href={`/dashboard/products/${inventory.id}`}
                                    >
                                        <Image
                                            src={inventory.product.image_url}
                                            alt={inventory.product.name}
                                            width={60}
                                            height={40}
                                            className="aspect-3/2 object-cover rounded-lg"
                                        />
                                    </Link>
                                </td>
                                <td className="px-2 py-4 font-medium">
                                    <Link
                                        href={`/dashboard/products/${inventory.product.id}`}
                                    >
                                        {inventory.product.name}
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
                                <td className="px-2 py-4 flex justify-center gap-4">
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
                        ))}
                    </tbody>
                </table>
            ) : (
                <Loader />
            )}
        </div>
    );
}
