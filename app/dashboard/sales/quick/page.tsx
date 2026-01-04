"use client";

import productsData from "@/public/data/productsData";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import {
    FaCashRegister,
    FaFilter,
    FaMinusSquare,
    FaPercentage,
    FaShoppingCart,
} from "react-icons/fa";
import { PiEqualsFill } from "react-icons/pi";
import CartTable from "./components/CartTable";
import { CartList } from "./components/CartList/CartList";
import { MdClear, MdQrCode } from "react-icons/md";
import ProductsFilterModal from "../../products/components/ProductsFilterModal";
import { useSearchParams } from "next/navigation";
import { useProducts } from "@/lib/hooks/products/useProducts";
import ProductsGrid from "./components/ProductsGrid/ProductsGrid";
import { useCart } from "@/lib/providers/CartProvider";
import SideCart from "./components/SideCart/SideCart";

export default function QuickSale() {
    const [query, setQuery] = React.useState<string>("");
    const onQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };
    const clearQuery = () => setQuery("");

    const [showFilterModal, setShowFilterModal] =
        React.useState<boolean>(false);

    const openFilterModal = () => setShowFilterModal(true);
    const closeFilterModal = () => setShowFilterModal(false);

    const [showSideCart, setShowSideCart] = React.useState<boolean>(false);

    const openSideCart = () => setShowSideCart(true);
    const closeSideCart = () => setShowSideCart(false);

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
        isFetchingNextPage: productsIsFetching,
        isSuccess: productsIsSuccess,
        hasNextPage: productsHasNextPage,
        fetchNextPage: fetchNextProducts,
    } = useProducts({ query, filters });

    const { totalUniqueItems } = useCart();

    return (
        <main className="p-4 md:p-8 h-full">
            <h3 className="text-2xl font-medium">Quick Sale</h3>
            <div className="bg-white md:min-h-6/7 rounded-2xl shadow-md my-6 p-4 md:p-6">
                <h4 className="text-xl font-medium">Products</h4>
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
                        // onClick={openFilterModal}
                        className="ms-2 md:ms-4 bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md"
                    >
                        <MdQrCode />
                    </button>
                    <button
                        onClick={openFilterModal}
                        className="ms-2 md:ms-4 bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md"
                    >
                        <FaFilter />
                    </button>
                </div>

                <ProductsGrid data={products} />
            </div>
            <button
                onClick={openSideCart}
                className="absolute cursor-pointer bottom-4 right-4 w-12 h-12 text-center bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md"
            >
                <FaShoppingCart className="mx-auto text-xl" />
                {totalUniqueItems > 0 ? (
                    <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-400 border-[#615cf6] border-2 border-buffer rounded-full -top-2 -start-2">
                        {totalUniqueItems}
                    </div>
                ) : (
                    ""
                )}
            </button>
            <ProductsFilterModal
                show={showFilterModal}
                onClose={closeFilterModal}
            />
            <SideCart show={showSideCart} onClose={closeSideCart} />
        </main>
    );
}
