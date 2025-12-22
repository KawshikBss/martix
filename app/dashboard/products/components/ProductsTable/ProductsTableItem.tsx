"use client";

import { ProductInterface } from "@/lib/interfaces/ProductInterface";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useState } from "react";

type Props = {
    product: ProductInterface;
};

const ProductsTableItem = ({ product }: Props) => {
    const [showVariants, setShowVariants] = useState<boolean>(false);
    const toggleShowVariants = () => setShowVariants((prev) => !prev);

    return (
        <Fragment>
            <tr className="border-b border-gray-300 hover:bg-gray-50">
                <td className="px-2 py-4">
                    <Link href={`/dashboard/products/${product.id}`}>
                        <Image
                            src={product.image_url}
                            alt={product.name}
                            width={60}
                            height={40}
                            className="aspect-3/2 object-cover rounded-lg"
                        />
                    </Link>
                </td>
                <td className="px-2 py-4 font-medium">
                    <Link href={`/dashboard/products/${product.id}`}>
                        {product.name}
                        {product.variation_meta && (
                            <>
                                <br />
                                {product.variation_meta.option.toLocaleUpperCase()}
                                : {product.variation_meta.value}
                            </>
                        )}
                    </Link>
                </td>
                <td className="px-2 py-4">{product?.sku ?? "N/A"}</td>
                <td className="px-2 py-4">
                    {product?.category?.name ?? "N/A"}
                </td>
                <td className="px-2 py-4">
                    {product?.min_selling_price && product?.max_selling_price
                        ? `৳${product?.min_selling_price} - ৳${product?.max_selling_price}`
                        : "৳" +
                          (product?.min_selling_price ??
                              product?.max_selling_price ??
                              "0")}
                </td>
                <td className="px-2 py-4 text-end">
                    {product?.current_stock_quantity ?? "N/A"}
                </td>
                <td className="px-2 py-4 text-end">$120</td>
                <td className="px-2 py-4 flex justify-center gap-4 flex-wrap">
                    <Link
                        href={`/dashboard/products/${product.id}`}
                        className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white"
                    >
                        View
                    </Link>
                    <Link
                        href={`/dashboard/products/${product.id}/edit`}
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
                    {product?.variants?.length > 0 && (
                        <span
                            onClick={toggleShowVariants}
                            className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white cursor-pointer"
                        >
                            Show Variations
                        </span>
                    )}
                </td>
            </tr>
            {showVariants &&
                product?.variants?.length > 0 &&
                product.variants.map((variant) => (
                    <ProductsTableItem key={variant.id} product={variant} />
                ))}
        </Fragment>
    );
};

export default ProductsTableItem;
