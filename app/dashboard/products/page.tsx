"use client";

import productsData from "@/public/data/productsData";
import Link from "next/link";
import * as React from "react";
import { ProductsTable } from "./components/ProductsTable/ProductsTable";
import { ProductsCatalog } from "./components/ProductsCatalog";
import { useProducts } from "@/lib/hooks/products/useProducts";
import ProductsFilterModal from "./components/ProductsFilterModal";
import { FaFilter } from "react-icons/fa";
import { useSearchParams } from "next/navigation";

export default function Products() {
    const [query, setQuery] = React.useState<string | undefined>(undefined);
    const onQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

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
        <main className="p-8">
            <div className="bg-white rounded-2xl shadow-md p-6">
                <div className="w-full flex flex-row justify-between items-center">
                    <h3 className="text-2xl font-medium">Products</h3>
                    <Link
                        href="/dashboard/products/add"
                        className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md"
                    >
                        + New Product
                    </Link>
                </div>
                <div className="mt-6 md:my-6 flex flex-col md:flex-row justify-between">
                    <input
                        onChange={onQueryChange}
                        type="text"
                        placeholder="Search products..."
                        className="border border-gray-300 rounded-md px-2 py-1 w-full mb-4 md:mb-0"
                    />
                    <button
                        onClick={openFilterModal}
                        className="ms-6 bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md"
                    >
                        <FaFilter />
                    </button>
                </div>
                <ProductsTable
                    data={products}
                    isLoading={productsIsLoading}
                    isSuccess={productsIsSuccess}
                    query={query}
                />
            </div>
            <ProductsCatalog items={productsData} />
            <ProductsFilterModal
                show={showFilterModal}
                onClose={closeFilterModal}
            />
        </main>
    );
}
