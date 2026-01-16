import { SaleItemInterface } from "@/lib/interfaces/SaleItemInterface";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
    data?: SaleItemInterface[];
};

const ItemsTable = ({ data }: Props) => {
    return (
        <table className="w-full text-left hidden md:table">
            <thead>
                <tr className="border-b border-gray-300 text-gray-500">
                    <th
                        colSpan={2}
                        className="px-2 py-2 font-normal text-center"
                    >
                        Item
                    </th>
                    <th className="px-2 py-2 font-normal">Variant</th>
                    <th className="px-2 py-2 font-normal">Qty</th>
                    <th className="px-2 py-2 font-normal">Price</th>
                    <th className="px-2 py-2 font-normal text-end">Total</th>
                </tr>
            </thead>
            <tbody>
                {data?.map((item) => (
                    <tr
                        key={item.id}
                        className="border-b border-gray-300 hover:bg-gray-50"
                    >
                        <td className="px-2 py-4">
                            <Link
                                href={`/dashboard/products/${item.product.id}`}
                            >
                                <Image
                                    src={item.product.image_url}
                                    alt={item.product.name}
                                    width={60}
                                    height={40}
                                    className="aspect-3/2 object-cover rounded-lg"
                                />
                            </Link>
                        </td>
                        <td className="px-2 py-4 font-medium">
                            <Link
                                href={`/dashboard/products/${item.product.id}`}
                            >
                                {item.product.name}
                            </Link>
                        </td>
                        <td className="px-2 py-4">
                            {item.product.variation_meta ? (
                                <>
                                    <br />
                                    {item.product.variation_meta.option.toLocaleUpperCase()}
                                    : {item.product.variation_meta.value}
                                </>
                            ) : (
                                "Main"
                            )}
                        </td>
                        <td className="px-2 py-4">{item.quantity ?? "N/A"}</td>
                        <td className="px-2 py-4">{item.price}</td>
                        <td className="px-2 py-4 text-end">
                            {item.total ?? "N/A"}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ItemsTable;
