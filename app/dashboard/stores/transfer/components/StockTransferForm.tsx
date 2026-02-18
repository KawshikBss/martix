import { useProducts } from "@/lib/hooks/products/useProducts";
import { useStores } from "@/lib/hooks/stores/useStores";
import { ProductInterface } from "@/lib/interfaces/ProductInterface";
import { StoreInterface } from "@/lib/interfaces/StoreIntefrace";
import React, { useEffect, useState } from "react";
import { MdClear, MdQrCode } from "react-icons/md";
import { TbTransferVertical } from "react-icons/tb";
import { toast } from "react-toastify";
import { InventoryInterface } from "@/lib/interfaces/InventoryInterface";
import { inventoryService } from "@/lib/services/inventoryService";
import { useStockTransfer } from "@/lib/hooks/inventories/useStockTransfer";

type Props = {};

const StockTransferForm = (props: Props) => {
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
    const [selectedVariant, setSelectedVariant] = useState<string | undefined>(
        undefined,
    );
    const [quantity, setQuantity] = useState<string>("");
    const onQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (!/^\d*$/.test(value)) {
            return;
        }
        if (inventory && parseInt(value) > inventory.quantity) {
            toast.error("Quantity cannot exceed available inventory.");
            return;
        }
        setQuantity(value);
    };

    const [inventory, setInventory] = useState<InventoryInterface | null>(null);

    useEffect(() => {
        setSelectedVariant(selectedProduct?.id ?? undefined);
    }, [selectedProduct]);

    useEffect(() => {
        if (!selectedVariant && !selectedStore) return;
        fetchInventory();
    }, [selectedVariant, selectedStore]);

    const fetchInventory = async () => {
        const res = (await inventoryService.findInventory(
            selectedStore?.id!,
            selectedVariant!,
        )) as
            | { inventory: InventoryInterface }
            | { message: string }
            | undefined;
        if (res) {
            if ("inventory" in res) {
                toast.success(
                    "Inventory found, you can proceed with the transfer.",
                );
                setInventory(res.inventory);
                setQuantity(res.inventory.quantity.toString());
            } else if ("message" in res) {
                setInventory(null);
                toast.error(res.message);
            }
        }
    };

    const [receivingStoreQuery, setreceivingStoreQuery] = useState<string>("");
    const onReceivingStoreQueryChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setreceivingStoreQuery(e.target.value);
    };
    const clearReceivingStoreQuery = () => {
        setSelectedReceivingStore(null);
        setreceivingStoreQuery("");
    };
    const { data: receivingStores } = useStores({
        query: receivingStoreQuery,
    });
    const [selectedReceivingStore, setSelectedReceivingStore] =
        useState<StoreInterface | null>(null);

    const { mutateAsync: transferInventoryMutation } = useStockTransfer();

    const handleTransfer = async () => {
        if (!selectedProduct || !selectedStore || !selectedReceivingStore) {
            toast.error(
                "Please select product, source store and destination store.",
            );
            return;
        }
        if (!inventory) {
            toast.error("No inventory available to transfer.");
            return;
        }
        if (!quantity || parseInt(quantity) <= 0) {
            toast.error("Please enter a valid quantity to transfer.");
            return;
        }
        try {
            const res = await transferInventoryMutation({
                inventory: inventory?.id!,
                receiving_store: selectedReceivingStore.id,
                quantity: parseInt(quantity),
            });
            console.log(res);
            if (res?.error) {
                toast.error(res.error);
                return;
            } else if (res?.message) {
                toast.success(res.message);
                setSelectedProduct(null);
                setSelectedStore(null);
                setSelectedReceivingStore(null);
                setQuantity("");
                setInventory(null);
                setProductQuery("");
                setStoreQuery("");
                setreceivingStoreQuery("");
                return;
            }

            toast.success("Inventory transferred successfully.");
        } catch (error) {
            toast.error("Failed to transfer inventory.");
        }
    };

    return (
        <div className="w-full bg-white rounded-2xl shadow-md mt-6 p-6">
            <div className="py-12 px-6 border-2 border-green-500 rounded-2xl relative">
                <h3 className="text-xl font-medium mb-2">Source</h3>
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                                <div className="absolute top-full mt-2 bg-white rounded-md p-2 border border-gray-400 shadow-md w-full z-10">
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
                                <option
                                    value={selectedProduct?.id}
                                    onClick={() =>
                                        setSelectedVariant(selectedProduct?.id)
                                    }
                                >
                                    Base
                                </option>
                                {selectedProduct?.variants?.map((variant) => (
                                    <option
                                        key={variant.id}
                                        value={variant.id}
                                        onClick={() =>
                                            setSelectedVariant(variant?.id)
                                        }
                                    >
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
                                <div className="absolute top-full mt-2 bg-white rounded-md p-2 border border-gray-400 shadow-md w-full z-10">
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
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label
                            htmlFor="quantity"
                            className="block text-sm/6 font-medium"
                        >
                            Available Quantity
                        </label>
                        <div className="mt-2 flex gap-2">
                            <input
                                id="quantity"
                                name="quantity"
                                type="text"
                                readOnly
                                disabled
                                value={inventory?.quantity.toString() ?? "0"}
                                onChange={() => {}}
                                autoComplete="off"
                                className="border border-gray-300 rounded-md px-2 py-1 w-full"
                                placeholder="Enter quantity"
                            />
                        </div>
                    </div>
                </div>
                <button
                    onClick={handleTransfer}
                    className="bg-[#615cf6] hover:bg-white text-white hover:text-[#615cf6] hover:scale-115 hover:-rotate-12 transition-all duration-300 border border-[#615cf6] rounded-full cursor-pointer my-4 mx-auto block h-22 aspect-square absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-10"
                >
                    <TbTransferVertical className="text-2xl mx-auto" />
                    Transfer
                </button>
            </div>
            <div className="py-12 px-6 border-2 border-red-500 rounded-2xl mt-6">
                <h3 className="text-xl font-medium mb-2">Destination</h3>
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <label
                            htmlFor="store"
                            className="block text-sm/6 font-medium"
                        >
                            Store
                        </label>
                        <div className="mt-2 relative">
                            <div className="flex flex-row justify-between gap-2 md:gap-4">
                                {selectedReceivingStore ? (
                                    <span className="border border-gray-300 rounded-md px-2 py-1 w-full">
                                        {selectedReceivingStore.name}
                                    </span>
                                ) : (
                                    <input
                                        value={receivingStoreQuery}
                                        onChange={onReceivingStoreQueryChange}
                                        type="text"
                                        placeholder="Search stores..."
                                        className="border border-gray-300 rounded-md px-2 py-1 w-full"
                                    />
                                )}
                                {receivingStoreQuery.length ? (
                                    <button
                                        onClick={clearReceivingStoreQuery}
                                        className="bg-red-400 hover:bg-transparent text-white hover:text-red-400 border border-red-400 px-2 py-1 rounded-md"
                                    >
                                        <MdClear />
                                    </button>
                                ) : (
                                    ""
                                )}
                                {!selectedReceivingStore && (
                                    <button className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md">
                                        <MdQrCode />
                                    </button>
                                )}
                            </div>
                            {!selectedReceivingStore &&
                            receivingStoreQuery?.length > 0 ? (
                                <div className="absolute top-full mt-2 bg-white rounded-md p-2 border border-gray-400 shadow-md w-full z-10">
                                    {receivingStores?.pages?.[0].data
                                        ?.length ? (
                                        receivingStores?.pages?.map((page) =>
                                            page?.data?.map((store) => (
                                                <div
                                                    key={store.id}
                                                    onClick={() =>
                                                        setSelectedReceivingStore(
                                                            store,
                                                        )
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
                                value={quantity}
                                onChange={onQuantityChange}
                                autoComplete="off"
                                className="border border-gray-300 rounded-md px-2 py-1 w-full"
                                placeholder="Enter quantity"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StockTransferForm;
