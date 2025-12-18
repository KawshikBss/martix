"use client";

import Loader from "@/components/ui/loaders/Loader";
import { useProducts } from "@/lib/hooks/products/useProducts";
import Image from "next/image";
import Link from "next/link";
import ProductsTableItem from "./ProductsTableItem";

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
                    <ProductsTableItem key={product.id} product={product} />
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
