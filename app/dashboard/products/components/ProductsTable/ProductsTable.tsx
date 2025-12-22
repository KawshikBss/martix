"use client";

import Loader from "@/components/ui/loaders/Loader";
import Link from "next/link";
import ProductsTableItem from "./ProductsTableItem";
import { ProductInterface } from "@/lib/interfaces/ProductInterface";
import { useSearchParams } from "next/navigation";

export interface IProductsTableProps {
    data?: ProductInterface[];
    isLoading: boolean;
    isSuccess: boolean;
    query?: string;
}

export function ProductsTable({
    data,
    isLoading,
    isSuccess,
    query,
}: IProductsTableProps) {
    const searchParams = useSearchParams();

    const filters = {
        category: searchParams.get("category") ?? "",
        product_type: searchParams.get("product_type") ?? "",
        min_price: searchParams.get("min_price") ?? "",
        max_price: searchParams.get("max_price") ?? "",
        stock_level: searchParams.get("stock_level") ?? "",
        status: searchParams.get("status") ?? "",
        brand: searchParams.get("brand") ?? "",
        tag: searchParams.get("tag") ?? "",
        has_expiry_date: searchParams.get("has_expiry_date") ?? "false",
        expiring_soon: searchParams.get("expiring_soon") ?? "false",
        has_barcode: searchParams.get("has_barcode") ?? "false",
        has_variants: searchParams.get("has_variants") ?? "false",
        min_create_date: searchParams.get("min_create_date") ?? "",
        max_create_date: searchParams.get("max_create_date") ?? "",
        min_update_date: searchParams.get("min_update_date") ?? "",
        max_update_date: searchParams.get("max_update_date") ?? "",
    };

    return !isLoading && isSuccess && data?.length ? (
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
                {data?.map((product) => (
                    <ProductsTableItem key={product.id} product={product} />
                ))}
            </tbody>
        </table>
    ) : !isLoading && isSuccess && !data?.length ? (
        <p>
            No products{query?.length ? ` matching "${query}"` : ""}
            {filters?.category?.length ? " in that category" : ""}
            {filters?.product_type?.length
                ? ` with "${filters?.product_type?.replaceAll("_", " ")}"`
                : ""}
            {filters?.min_price?.length
                ? ` more than $${filters?.min_price}`
                : ""}
            {filters?.max_price?.length
                ? ` less than $${filters?.max_price}`
                : ""}
            {filters?.stock_level?.length
                ? ` "${filters?.stock_level?.replaceAll("_", " ")}"`
                : ""}
            {filters?.status?.length ? ` currently "${filters?.status}"` : ""}
            {filters?.brand?.length ? ` from "${filters?.brand}" brand` : ""}
            {filters?.tag?.length ? ` with "${filters?.tag}" in tags` : ""}
            {filters?.has_expiry_date == "true" ? " has expiry date" : ""}
            {filters?.expiring_soon == "true" ? " will be expiring soon" : ""}
            {filters?.has_barcode == "true" ? " has barcode" : ""}
            {filters?.has_variants == "true" ? " has variants" : ""}
            {filters?.min_create_date?.length &&
            filters?.max_create_date?.length
                ? ` created between ${filters?.min_create_date} and ${filters?.max_create_date}`
                : filters?.min_create_date?.length
                ? ` created after ${filters?.min_create_date}`
                : filters?.max_create_date?.length
                ? ` created before ${filters?.max_create_date}`
                : ""}
            {filters?.min_update_date?.length &&
            filters?.max_update_date?.length
                ? ` updated between ${filters?.min_update_date} and ${filters?.max_update_date}`
                : filters?.min_update_date?.length
                ? ` updated after ${filters?.min_update_date}`
                : filters?.max_update_date?.length
                ? ` updated before ${filters?.max_update_date}`
                : ""}{" "}
            <Link href="/dashboard/products/add" className="text-[#615cf6]">
                Add new
            </Link>
            ?
        </p>
    ) : (
        <Loader />
    );
}
