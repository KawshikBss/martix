"use client";

import productsData from "@/public/data/productsData";
import Link from "next/link";
import * as React from "react";
import { ProductsTable } from "./components/ProductsTable/ProductsTable";
import { ProductsCatalog } from "./components/ProductsCatalog";
import { useProducts } from "@/lib/hooks/products/useProducts";
import { useCategories } from "@/lib/hooks/categories/useCategories";

export default function Products() {
    const [query, setQuery] = React.useState<string | undefined>(undefined);
    const onQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const [category, setCategory] = React.useState<string | undefined>(
        undefined
    );
    const onCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.target.value);
    };

    const [stockStatus, setStockStatus] = React.useState<string | undefined>(
        undefined
    );
    const onStockStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStockStatus(e.target.value);
    };

    const [minPrice, setMinPrice] = React.useState<string | undefined>(
        undefined
    );
    const onMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMinPrice(e.target.value);
    };

    const [maxPrice, setMaxPrice] = React.useState<string | undefined>(
        undefined
    );
    const onMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMaxPrice(e.target.value);
    };

    const {
        data: products,
        isLoading: productsIsLoading,
        isSuccess: productsIsSuccess,
    } = useProducts({ query, category, stockStatus, minPrice, maxPrice });

    const { data: categories } = useCategories();

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
                        className="border border-gray-300 rounded-md px-2 py-1 w-full md:w-2/5 mb-4 md:mb-0"
                    />
                    <div className="flex flex-row gap-4 flex-wrap md:flex-nowrap">
                        <select
                            onChange={onCategoryChange}
                            className="border border-gray-300 rounded-md px-2 py-1"
                        >
                            <option value="">Category</option>
                            {categories?.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        <select
                            onChange={onStockStatusChange}
                            className="border border-gray-300 rounded-md px-2 py-1"
                        >
                            <option value="">Stock Status</option>
                            <option value="in_stock">In Stock</option>
                            <option value="low_stock">Low Stock</option>
                            <option value="out_of_stock">Out of Stock</option>
                        </select>
                        <div className="flex flex-row items-center gap-2">
                            <input
                                onChange={onMinPriceChange}
                                type="number"
                                min="0"
                                placeholder="Min Price"
                                className="border border-gray-300 rounded-md px-2 py-1 w-24"
                            />
                            <span>-</span>
                            <input
                                onChange={onMaxPriceChange}
                                type="number"
                                min="0"
                                placeholder="Max Price"
                                className="border border-gray-300 rounded-md px-2 py-1 w-24"
                            />
                        </div>
                    </div>
                </div>
                <ProductsTable
                    data={products}
                    isLoading={productsIsLoading}
                    isSuccess={productsIsSuccess}
                    query={query}
                    category={category}
                    stockStatus={stockStatus}
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                />
            </div>
            <ProductsCatalog items={productsData} />
        </main>
    );
}
