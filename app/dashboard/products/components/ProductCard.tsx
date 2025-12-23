import { ProductInterface } from "@/lib/interfaces/ProductInterface";
import Link from "next/link";
import * as React from "react";

export interface IProductCardProps {
    product?: ProductInterface;
}

export function ProductCard({ product }: IProductCardProps) {
    return (
        <div className="border border-gray-300 bg-white shadow-sm rounded-2xl p-4 flex flex-col">
            <div className="w-full aspect-3/2 relative bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                <img
                    src={product?.image_url}
                    alt={product?.name}
                    className="w-full h-full object-cover rounded-lg"
                />
                <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                    {/* {product?.stockQty % 2 === 0 ? "In Stock" : "Low Stock"} */}
                </span>
            </div>
            <h4 className="text-xl font-semibold mb-2">
                {product?.name}
                <span className="text-sm font-normal text-gray-600 mb-4">
                    {" ["}
                    {product?.sku}
                    {"] "}
                </span>
            </h4>
            <div className="flex items-center justify-between mb-2">
                <p className="text-md text-gray-600">
                    {product?.min_selling_price && product?.max_selling_price
                        ? `৳${product?.min_selling_price} - ৳${product?.max_selling_price}`
                        : "৳" +
                          (product?.min_selling_price ??
                              product?.max_selling_price ??
                              "0")}
                </p>
                <p className="text-md text-gray-600">
                    {"("}
                    {product?.category?.name}
                    {")"}
                </p>
            </div>
            <div className="flex items-center justify-between mb-4">
                <p className="text-md text-gray-600">
                    Stock: {product?.current_stock_quantity}
                </p>
                <p className="text-md text-gray-600">Total Sales: {1000}</p>
            </div>
            <div className="flex justify-center gap-4">
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
            </div>
        </div>
    );
}
