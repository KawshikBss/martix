"use client";

import Link from "next/link";
import * as React from "react";
import { ProductsTable } from "./components/ProductsTable/ProductsTable";
import { ProductsCatalog } from "./components/ProductsCatalog";
import { useProducts } from "@/lib/hooks/products/useProducts";
import ProductsFilterModal from "./components/ProductsFilterModal";
import { FaFilter } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import { MdClear } from "react-icons/md";
import Loader from "@/components/ui/loaders/Loader";

export default function Products() {
    const [query, setQuery] = React.useState<string>("");
    const onQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };
    const clearQuery = () => setQuery("");

    const [showFilterModal, setShowFilterModal] =
        React.useState<boolean>(false);

    const openFilterModal = () => setShowFilterModal(true);
    const closeFilterModal = () => setShowFilterModal(false);

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

    const {
        data: products,
        isLoading: productsIsLoading,
        isSuccess: productsIsSuccess,
    } = useProducts({ query, filters });

    return (
        <main className="p-4 md:p-8">
            <div className="bg-white rounded-2xl shadow-md p-4 md:p-6">
                <div className="w-full flex flex-row justify-between items-center">
                    <h3 className="text-2xl font-medium">Products</h3>
                    <Link
                        href="/dashboard/products/add"
                        className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md"
                    >
                        + New Product
                    </Link>
                </div>
                <div className="my-6 flex flex-row justify-between">
                    <input
                        value={query}
                        onChange={onQueryChange}
                        type="text"
                        placeholder="Search products..."
                        className="border border-gray-300 rounded-md px-2 py-1 w-full"
                    />
                    {query?.length ? (
                        <button
                            onClick={clearQuery}
                            className="ms-2 md:ms-4 bg-red-400 hover:bg-transparent text-white hover:text-red-400 border border-red-400 px-2 py-1 rounded-md"
                        >
                            <MdClear />
                        </button>
                    ) : (
                        ""
                    )}
                    <button
                        onClick={openFilterModal}
                        className="ms-2 md:ms-4 bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md"
                    >
                        <FaFilter />
                    </button>
                </div>
                <ProductsTable data={products} />
                <ProductsCatalog data={products} />
                {productsIsLoading ? (
                    <Loader />
                ) : !productsIsLoading &&
                  productsIsSuccess &&
                  !products?.length ? (
                    <p>
                        No products{query?.length ? ` matching "${query}"` : ""}
                        {filters?.category?.length ? " in that category" : ""}
                        {filters?.product_type?.length
                            ? ` with "${filters?.product_type?.replaceAll(
                                  "_",
                                  " "
                              )}"`
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
                        {filters?.status?.length
                            ? ` currently "${filters?.status}"`
                            : ""}
                        {filters?.brand?.length
                            ? ` from "${filters?.brand}" brand`
                            : ""}
                        {filters?.tag?.length
                            ? ` with "${filters?.tag}" in tags`
                            : ""}
                        {filters?.has_expiry_date == "true"
                            ? " has expiry date"
                            : ""}
                        {filters?.expiring_soon == "true"
                            ? " will be expiring soon"
                            : ""}
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
                        <Link
                            href="/dashboard/products/add"
                            className="text-[#615cf6]"
                        >
                            Add new
                        </Link>
                        ?
                    </p>
                ) : (
                    ""
                )}
            </div>
            <ProductsFilterModal
                show={showFilterModal}
                onClose={closeFilterModal}
            />
        </main>
    );
}
