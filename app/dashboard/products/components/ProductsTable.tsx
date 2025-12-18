"use client";

import Loader from "@/components/ui/loaders/Loader";
import { useProducts } from "@/lib/hooks/products/useProducts";
import Image from "next/image";
import Link from "next/link";

export interface IProductsTableProps {}

export function ProductsTable(props: IProductsTableProps) {
    const {
        data: products,
        isLoading: productsIsLoading,
        isSuccess: productsIsSuccess,
    } = useProducts();

    return !productsIsLoading && productsIsSuccess && products.length ? (
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
                    <th className="px-2 py-2 font-normal">Price</th>
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
                {products?.map((product) => (
                    <tr
                        key={product.id}
                        className="border-b border-gray-300 hover:bg-gray-50"
                    >
                        <td className="px-2 py-4">
                            <input type="checkbox" />
                        </td>
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
                            </Link>
                        </td>
                        <td className="px-2 py-4">{product?.sku ?? "N/A"}</td>
                        <td className="px-2 py-4">
                            {product?.category?.name ?? "N/A"}
                        </td>
                        <td className="px-2 py-4">
                            ${product?.cost_price ?? "N/A"}
                        </td>
                        <td className="px-2 py-4 text-end">10</td>
                        <td className="px-2 py-4 text-end">120</td>
                        <td className="px-2 py-4 flex justify-center gap-4">
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
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    ) : !productsIsLoading && productsIsSuccess && !products?.length ? (
        <p>
            No products yet{" "}
            <Link href="/dashboard/products/add" className="text-[#615cf6]">
                Add new
            </Link>
            ?
        </p>
    ) : (
        <Loader />
    );
}
