import { ProductInterface } from "@/lib/interfaces/ProductInterface";
import Link from "next/link";
import * as React from "react";
import { useState } from "react";

export interface IProductCardProps {
    product?: ProductInterface;
}

export function ProductCard({ product }: IProductCardProps) {
    const [showVariants, setShowVariants] = useState<boolean>(false);
    const toggleShowVariants = () => setShowVariants((prev) => !prev);

    return (
        <React.Fragment>
            <div
                className={`border border-gray-300 bg-white shadow-sm ${
                    product?.is_variation && "shadow-[#615cf6]"
                } rounded-2xl p-4 flex flex-col`}
            >
                <div className="w-full aspect-3/2 relative bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                    <img
                        src={product?.image_url}
                        alt={product?.name}
                        className="w-full h-full object-cover rounded-lg"
                    />
                    {product?.is_variation ? (
                        <span className="absolute top-2 left-2 bg-teal-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                            Variation
                        </span>
                    ) : (
                        ""
                    )}
                    {product?.stock_status && (
                        <span
                            className={`absolute top-2 right-2 ${
                                product?.stock_status === "Out Of Stock"
                                    ? "bg-red-500"
                                    : product?.stock_status === "Low Stock"
                                    ? "bg-yellow-500"
                                    : "bg-green-500"
                            } text-white text-xs font-semibold px-3 py-1 rounded-full shadow`}
                        >
                            {product?.stock_status}
                        </span>
                    )}
                    <span className="absolute bottom-2 left-2 bg-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                        {product?.category?.name}
                    </span>
                </div>
                <h4 className="text-xl font-semibold">{product?.name}</h4>
                {product?.sku && (
                    <p className="text-sm font-normal text-gray-600">
                        {" ["}
                        {product?.sku}
                        {"] "}
                    </p>
                )}
                <div className="flex items-center justify-between mt-4">
                    <p className="text-md text-gray-600">
                        {product?.min_selling_price &&
                        product?.max_selling_price
                            ? `৳${product?.min_selling_price} - ৳${product?.max_selling_price}`
                            : "৳" +
                              (product?.min_selling_price ??
                                  product?.max_selling_price ??
                                  "0")}
                    </p>
                    {product?.variation_meta != null && (
                        <p className="text-md text-gray-600">
                            {product?.variation_meta?.option?.toLocaleUpperCase()}
                            {": "}
                            {product?.variation_meta?.value}
                        </p>
                    )}
                </div>
                <div className="flex items-center justify-between mt-2">
                    <p className="text-md text-gray-600">
                        Total Stock: {product?.current_stock_quantity}
                    </p>
                    <p className="text-md text-gray-600">Total Sales: {1000}</p>
                </div>
                <div className="flex justify-center gap-4 flex-wrap mt-4">
                    <Link
                        href={`/dashboard/products/${product?.id}`}
                        className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white"
                    >
                        View
                    </Link>
                    <Link
                        href={`/dashboard/products/${product?.id}/edit`}
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
                    {product?.variants?.length ? (
                        <span
                            onClick={toggleShowVariants}
                            className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white cursor-pointer"
                        >
                            {showVariants ? "Hide" : "Show"} Variations
                        </span>
                    ) : (
                        ""
                    )}
                </div>
            </div>

            {showVariants && product?.variants?.length
                ? product.variants.map((variant) => (
                      <ProductCard key={variant.id} product={variant} />
                  ))
                : ""}
        </React.Fragment>
    );
}
