import { useProducts } from "@/lib/hooks/products/useProducts";
import { useStores } from "@/lib/hooks/stores/useStores";
import { ProductInterface } from "@/lib/interfaces/ProductInterface";
import { StoreInterface } from "@/lib/interfaces/StoreIntefrace";
import React, { RefObject, useState } from "react";
import { MdClear, MdQrCode } from "react-icons/md";

type Props = {
    ref: RefObject<HTMLFormElement | null>;
};

const StockAdjustForm = ({ ref }: Props) => {
    const [productQuery, setProductQuery] = useState<string>("");
    const onProductQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductQuery(e.target.value);
    };
    const clearProductQuery = () => {
        setSelectedProduct(null);
        setProductQuery("");
    };
    const { data: products } = useProducts({ query: productQuery });
    const [storeQuery, setStoreQuery] = useState<string>("");
    const onStoreQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStoreQuery(e.target.value);
    };
    const clearStoreQuery = () => {
        setSelectedStore(null);
        setStoreQuery("");
    };
    const { data: stores } = useStores({ query: storeQuery });
    const [selectedProduct, setSelectedProduct] =
        useState<ProductInterface | null>(null);
    const [selectedStore, setSelectedStore] = useState<StoreInterface | null>(
        null,
    );

    const onReset = () => {
        setSelectedProduct(null);
        setSelectedStore(null);
        setProductQuery("");
        setStoreQuery("");
    };

    return (
        <form ref={ref} onReset={onReset}>
            <div className="w-full bg-white rounded-2xl shadow-md mt-6 p-6">
                <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <label
                            htmlFor="product"
                            className="block text-sm/6 font-medium"
                        >
                            Product
                        </label>
                        <div className="mt-2 relative">
                            <div className="flex flex-row justify-between gap-2 md:gap-4">
                                {selectedProduct ? (
                                    <span className="border border-gray-300 rounded-md px-2 py-1 w-full">
                                        {selectedProduct.name}
                                    </span>
                                ) : (
                                    <input
                                        value={productQuery}
                                        onChange={onProductQueryChange}
                                        type="text"
                                        placeholder="Search products..."
                                        className="border border-gray-300 rounded-md px-2 py-1 w-full"
                                    />
                                )}
                                {productQuery.length ? (
                                    <button
                                        onClick={clearProductQuery}
                                        className="bg-red-400 hover:bg-transparent text-white hover:text-red-400 border border-red-400 px-2 py-1 rounded-md"
                                    >
                                        <MdClear />
                                    </button>
                                ) : (
                                    ""
                                )}
                                {!selectedProduct && (
                                    <button className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md">
                                        <MdQrCode />
                                    </button>
                                )}
                            </div>
                            {!selectedProduct && productQuery?.length > 0 ? (
                                <div className="absolute top-full mt-2 bg-white rounded-md p-2 border border-gray-400 shadow-md w-full">
                                    {products?.pages?.[0].data?.length ? (
                                        products?.pages?.map((page) =>
                                            page?.data?.map((product) => (
                                                <div
                                                    key={product.id}
                                                    onClick={() =>
                                                        setSelectedProduct(
                                                            product,
                                                        )
                                                    }
                                                    className="p-2 hover:bg-gray-200 cursor-pointer rounded-md"
                                                >
                                                    {product?.name}
                                                </div>
                                            )),
                                        )
                                    ) : (
                                        <p>No matching products found</p>
                                    )}
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label
                            htmlFor="variant"
                            className="block text-sm/6 font-medium"
                        >
                            Variant
                        </label>
                        <div className="mt-2 grid grid-cols-1">
                            <select
                                id="variant"
                                name="variant"
                                autoComplete="variant"
                                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            >
                                <option value={selectedProduct?.id}>
                                    Base
                                </option>
                                {selectedProduct?.variants?.map((variant) => (
                                    <option value={variant.id}>
                                        {variant?.variation_meta?.option?.toLocaleUpperCase()}
                                        {": "}
                                        {variant?.variation_meta?.value}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label
                            htmlFor="store"
                            className="block text-sm/6 font-medium"
                        >
                            Store
                        </label>
                        <div className="mt-2 relative">
                            <div className="flex flex-row justify-between gap-2 md:gap-4">
                                {selectedStore ? (
                                    <span className="border border-gray-300 rounded-md px-2 py-1 w-full">
                                        {selectedStore.name}
                                    </span>
                                ) : (
                                    <input
                                        value={storeQuery}
                                        onChange={onStoreQueryChange}
                                        type="text"
                                        placeholder="Search stores..."
                                        className="border border-gray-300 rounded-md px-2 py-1 w-full"
                                    />
                                )}
                                {storeQuery.length ? (
                                    <button
                                        onClick={clearStoreQuery}
                                        className="bg-red-400 hover:bg-transparent text-white hover:text-red-400 border border-red-400 px-2 py-1 rounded-md"
                                    >
                                        <MdClear />
                                    </button>
                                ) : (
                                    ""
                                )}
                                {!selectedStore && (
                                    <button className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md">
                                        <MdQrCode />
                                    </button>
                                )}
                            </div>
                            {!selectedStore && storeQuery?.length > 0 ? (
                                <div className="absolute top-full mt-2 bg-white rounded-md p-2 border border-gray-400 shadow-md w-full">
                                    {stores?.pages?.[0].data?.length ? (
                                        stores?.pages?.map((page) =>
                                            page?.data?.map((store) => (
                                                <div
                                                    key={store.id}
                                                    onClick={() =>
                                                        setSelectedStore(store)
                                                    }
                                                    className="p-2 hover:bg-gray-200 cursor-pointer rounded-md"
                                                >
                                                    {store?.name}
                                                </div>
                                            )),
                                        )
                                    ) : (
                                        <p>No matching stores found</p>
                                    )}
                                </div>
                            ) : (
                                ""
                            )}
                            <input
                                type="text"
                                hidden
                                name="store"
                                value={selectedStore?.id || ""}
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label
                            htmlFor="adjustment_type"
                            className="block text-sm/6 font-medium"
                        >
                            Adjustment Type
                        </label>
                        <div className="mt-2 grid grid-cols-1">
                            <select
                                id="adjustment_type"
                                name="adjustment_type"
                                autoComplete="adjustment_type"
                                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            >
                                <option value="increase">
                                    Increase (Stock In)
                                </option>
                                <option value="decrease">
                                    Decrease (Stock Out)
                                </option>
                                <option value="exact">
                                    Set Exact Quantity (Correction)
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label
                            htmlFor="quantity"
                            className="block text-sm/6 font-medium"
                        >
                            Quantity
                        </label>
                        <div className="mt-2 flex gap-2">
                            <input
                                id="quantity"
                                name="quantity"
                                type="text"
                                autoComplete="off"
                                className="border border-gray-300 rounded-md px-2 py-1 w-full"
                                placeholder="Enter quantity"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label
                            htmlFor="reason"
                            className="block text-sm/6 font-medium"
                        >
                            Reason
                        </label>
                        <div className="mt-2 grid grid-cols-1">
                            <select
                                id="reason"
                                name="reason"
                                autoComplete="reason"
                                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            >
                                <option value="damaged">Damaged</option>
                                <option value="lost">Lost</option>
                                <option value="expired">Expired</option>
                                <option value="manual_correction">
                                    Manual Correction
                                </option>
                                <option value="return">Return</option>
                                <option value="found_extra">Found Extra</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-span-full">
                        <label
                            htmlFor="notes"
                            className="block text-sm/6 font-medium text-gray-900"
                        >
                            Notes
                        </label>
                        <div className="mt-2">
                            <textarea
                                id="notes"
                                name="notes"
                                rows={3}
                                className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                        <p className="mt-3 text-sm/6 text-gray-600">
                            Write a few sentences about the adjustment.
                        </p>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default StockAdjustForm;
