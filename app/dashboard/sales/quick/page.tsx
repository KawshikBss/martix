"use client";

import * as React from "react";
import { FaFilter, FaShoppingCart } from "react-icons/fa";
import { MdClear, MdQrCode } from "react-icons/md";
import ProductsFilterModal from "../../products/components/ProductsFilterModal";
import { useSearchParams } from "next/navigation";
import ProductsGrid from "./components/ProductsGrid/ProductsGrid";
import { useCart } from "@/lib/providers/CartProvider";
import SideCart from "./components/SideCart/SideCart";
import { useSaleProducts } from "@/lib/hooks/sales/useSaleProducts";
import { useStores } from "@/lib/hooks/stores/useStores";
import { StoreInterface } from "@/lib/interfaces/StoreIntefrace";
import Loader from "@/components/ui/loaders/Loader";

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

    const [selectedStore, setSelectedStore] = React.useState<
        StoreInterface | undefined
    >(undefined);

    const { data: stores } = useStores({});

    const {
        data: products,
        isLoading: productsIsLoading,
        isFetchingNextPage: productsIsFetching,
        isSuccess: productsIsSuccess,
        hasNextPage: productsHasNextPage,
        fetchNextPage: fetchNextProducts,
    } = useSaleProducts({ query, storeId: selectedStore?.id, filters });

    const { totalUniqueItems } = useCart();

    return (
        <main className="p-4 md:p-8">
            <h3 className="text-2xl font-medium">Quick Sale</h3>
            <div className="bg-white md:min-h-6/7 rounded-2xl shadow-md my-6 p-4 md:p-6">
                <h4 className="text-xl font-medium">Products</h4>
                <div className="my-6 flex flex-row justify-between gap-2 md:gap-4">
                    <select
                        id="store"
                        name="store"
                        autoComplete="tax-type"
                        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    >
                        <option onClick={() => setSelectedStore(undefined)}>
                            None
                        </option>
                        {stores?.pages?.map((page) =>
                            page?.data?.map((store) => (
                                <option
                                    key={store.id}
                                    onClick={() => setSelectedStore(store)}
                                >
                                    {store.name}
                                </option>
                            ))
                        )}
                    </select>
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
                            className="bg-red-400 hover:bg-transparent text-white hover:text-red-400 border border-red-400 px-2 py-1 rounded-md"
                        >
                            <MdClear />
                        </button>
                    ) : (
                        ""
                    )}
                    <button
                        onClick={openFilterModal}
                        className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md"
                    >
                        <MdQrCode />
                    </button>
                    <button
                        onClick={openFilterModal}
                        className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md"
                    >
                        <FaFilter />
                    </button>
                </div>

                <ProductsGrid data={products} />

                {!selectedStore ? (
                    <p>Select a store to continue</p>
                ) : productsIsLoading || productsIsFetching ? (
                    <Loader />
                ) : !products?.pages?.[0].total ? (
                    <p>No Products</p>
                ) : productsHasNextPage ? (
                    <div
                        onClick={() => fetchNextProducts()}
                        className="bg-[#615cf6] hover:bg-transparent cursor-pointer text-white hover:text-[#615cf6] border border-[#615cf6] px-4 py-1 rounded-full w-fit mx-auto mt-4"
                    >
                        See More
                    </div>
                ) : (
                    ""
                )}
            </div>
            <button
                onClick={openSideCart}
                className="fixed cursor-pointer bottom-4 right-4 w-12 h-12 text-center bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md"
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
            <SideCart
                show={showSideCart}
                onClose={closeSideCart}
                selectedStore={selectedStore}
                setSelectedStore={setSelectedStore}
            />
        </main>
    );
}
