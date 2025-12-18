import productsData from "@/public/data/productsData";
import Link from "next/link";
import * as React from "react";
import { ProductsTable } from "./components/ProductsTable";
import { ProductsCatalog } from "./components/ProductsCatalog";

export default function Products() {
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
                        type="text"
                        placeholder="Search products..."
                        className="border border-gray-300 rounded-md px-2 py-1 w-full md:w-2/5 mb-4 md:mb-0"
                    />
                    <div className="flex flex-row gap-4 flex-wrap md:flex-nowrap">
                        <select className="border border-gray-300 rounded-md px-2 py-1">
                            <option value="">Category</option>
                            <option value="electronics">Electronics</option>
                            <option value="clothing">Clothing</option>
                            <option value="books">Books</option>
                            {/* Add more categories as needed */}
                        </select>
                        <select className="border border-gray-300 rounded-md px-2 py-1">
                            <option value="">Stock Status</option>
                            <option value="in-stock">In Stock</option>
                            <option value="low-stock">Low Stock</option>
                            <option value="out-of-stock">Out of Stock</option>
                        </select>
                        <div className="flex flex-row items-center gap-2">
                            <input
                                type="number"
                                min="0"
                                placeholder="Min Price"
                                className="border border-gray-300 rounded-md px-2 py-1 w-24"
                            />
                            <span>-</span>
                            <input
                                type="number"
                                min="0"
                                placeholder="Max Price"
                                className="border border-gray-300 rounded-md px-2 py-1 w-24"
                            />
                        </div>
                    </div>
                </div>
                <ProductsTable />
            </div>
            <ProductsCatalog items={productsData} />
        </main>
    );
}
