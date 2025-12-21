"use client";

import Loader from "@/components/ui/loaders/Loader";
import Link from "next/link";
import ProductsTableItem from "./ProductsTableItem";
import { ProductInterface } from "@/lib/interfaces/ProductInterface";

export interface IProductsTableProps {
    data?: ProductInterface[];
    isLoading: boolean;
    isSuccess: boolean;
    query?: string;
    category?: string;
    stockStatus?: string;
    minPrice?: string;
    maxPrice?: string;
}

export function ProductsTable({
    data,
    isLoading,
    isSuccess,
    query,
    category,
    stockStatus,
    minPrice,
    maxPrice,
}: IProductsTableProps) {
    return !isLoading && isSuccess && data?.length ? (
        <table className="w-full text-left hidden md:table">
            <thead>
                <tr className="border-b border-gray-300 text-gray-500">
                    <th className="px-2 py-2">
                        <input type="checkbox" />
                    </th>
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
                {data?.map((product) => (
                    <ProductsTableItem key={product.id} product={product} />
                ))}
            </tbody>
        </table>
    ) : !isLoading && isSuccess && !data?.length ? (
        <p>
            No products{query?.length ? ` matching "${query}"` : ""}
            {category?.length ? " in that category" : ""}
            {stockStatus?.length
                ? ` "${stockStatus.replaceAll("_", " ")}"`
                : ""}
            {minPrice?.length ? ` more than $${minPrice}` : ""}
            {maxPrice?.length ? ` less than $${maxPrice}` : ""}{" "}
            <Link href="/dashboard/products/add" className="text-[#615cf6]">
                Add new
            </Link>
            ?
        </p>
    ) : (
        <Loader />
    );
}
