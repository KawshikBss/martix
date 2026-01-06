"use client";

import { ProductInterface } from "@/lib/interfaces/ProductInterface";
import { SalesProduct, SalesVariant } from "@/lib/interfaces/SalesProduct";
import { useCart } from "@/lib/providers/CartProvider";
import Link from "next/link";
import { useState } from "react";
import { FaCartPlus } from "react-icons/fa";

type Props = {
    product?: SalesProduct;
};

const ProductGridItem = ({ product }: Props) => {
    const { inCart, addItem, removeItem } = useCart();

    const handleVariantSelect = (event: any, variant: SalesVariant) => {
        event.stopPropagation();
        if (inCart(variant.inventory_id)) removeItem(variant.inventory_id);
        addItem(variant, product!);
    };

    const [showVariants, setShowVariants] = useState<boolean>(false);
    const onAddToCart = () => {
        if (!product) return;
        if (product?.variants?.length > 1) {
            setShowVariants((prev) => !prev);
            return;
        }
        if (!inCart(product.variants?.[0]?.inventory_id))
            addItem(product.variants?.[0], product);
        else removeItem(product.variants?.[0]?.inventory_id);
    };
    return (
        <div
            onClick={onAddToCart}
            className={`border relative border-gray-300 bg-white cursor-pointer shadow-md hover:shadow-[#615cf6] transition-all duration-500 ease-in-out rounded-2xl p-4 flex flex-col`}
        >
            <div className="w-full aspect-3/2 relative bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                <img
                    src={product?.image}
                    alt={product?.name}
                    className="w-full h-full object-cover rounded-lg"
                />
                {/* {product?.stock_status && (
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
                )} */}
                <span className="absolute bottom-2 left-2 bg-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                    {product?.category?.name}
                </span>
            </div>
            <h4 className="text-xl font-semibold">{product?.name}</h4>
            {/* {product?.sku && (
                <p className="text-sm font-normal text-gray-600">
                    {" ["}
                    {product?.sku}
                    {"] "}
                </p>
            )} */}
            <div className="flex items-center justify-between mt-4">
                <p className="text-md text-gray-600">
                    {product?.price_range
                        ? `৳${product?.price_range.min} - ৳${product?.price_range.max}`
                        : "৳" +
                          (product?.price_range?.min ??
                              product?.price_range?.max ??
                              "0")}
                </p>
            </div>
            <div className="flex items-center justify-between mt-2">
                <p className="text-md text-gray-600">
                    Total Stock: {product?.total_stock}
                </p>
                <p className="text-md text-gray-600">Total Sales: {1000}</p>
            </div>
            {product?.variants?.length && showVariants ? (
                <div className="absolute left-0 right-0 top-full z-10 border border-gray-300 bg-white shadow-md rounded-2xl flex flex-col gap-1 p-2 mb-4">
                    {product?.variants?.map((variant) => (
                        <div
                            key={variant.inventory_id}
                            onClick={(e) => handleVariantSelect(e, variant)}
                            className={`flex items-center justify-between py-1 px-2 text-sm text-gray-600 hover:bg-gray-200 ${
                                inCart(variant?.inventory_id)
                                    ? "bg-[#615cf6] text-white"
                                    : ""
                            } rounded-full`}
                        >
                            {variant?.variation ? (
                                <p>
                                    {variant?.variation?.option?.toLocaleUpperCase()}
                                    :{" "}
                                    {variant?.variation?.value?.toLocaleUpperCase()}
                                </p>
                            ) : (
                                <p>BASE</p>
                            )}
                            <p>
                                Price:{" "}
                                {product?.price_range
                                    ? `৳${product?.price_range.min} - ৳${product?.price_range.max}`
                                    : "৳" +
                                      (product?.price_range?.min ??
                                          product?.price_range?.max ??
                                          "0")}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                ""
            )}
            <div className="flex justify-center gap-4 flex-wrap mt-4">
                <Link
                    href={`/dashboard/products/${product?.product_id}`}
                    className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white"
                >
                    View
                </Link>
                <button
                    onClick={onAddToCart}
                    className="ms-2 md:ms-4 bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md"
                >
                    <FaCartPlus />
                </button>
            </div>
        </div>
    );
};

export default ProductGridItem;
