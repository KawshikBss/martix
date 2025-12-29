"use client";

import { PaginatedResponse } from "@/lib/core/PaginatedResponse";
import ProductsTableItem from "./ProductsTableItem";
import { ProductInterface } from "@/lib/interfaces/ProductInterface";
import { InfiniteData } from "@tanstack/react-query";

export interface IProductsTableProps {
    data?: InfiniteData<PaginatedResponse<ProductInterface>>;
}

export function ProductsTable({ data }: IProductsTableProps) {
    return data?.pages?.[0].total ? (
        <table className="w-full text-left hidden md:table">
            <thead>
                <tr className="border-b border-gray-300 text-gray-500">
                    <th
                        colSpan={2}
                        className="px-2 py-2 font-normal text-center"
                    >
                        Product
                    </th>
                    <th className="px-2 py-2 font-normal">SKU / Barcode</th>
                    <th className="px-2 py-2 font-normal">Category</th>
                    <th className="px-2 py-2 font-normal">Price Range</th>
                    <th className="px-2 py-2 font-normal text-end">
                        Stock Qty
                    </th>
                    <th className="px-2 py-2 font-normal text-end">
                        Total Sales
                    </th>
                    <th className="px-2 py-2 font-normal text-center">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                {data?.pages?.map((page) =>
                    page?.data?.map((product) => (
                        <ProductsTableItem key={product.id} product={product} />
                    ))
                )}
            </tbody>
        </table>
    ) : (
        ""
    );
}
