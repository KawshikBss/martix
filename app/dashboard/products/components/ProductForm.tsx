import { useCategories } from "@/lib/hooks/categories/useCategories";
import { useStores } from "@/lib/hooks/stores/useStores";
import { ProductInterface } from "@/lib/interfaces/ProductInterface";
import { StoreInterface } from "@/lib/interfaces/StoreIntefrace";
import Image from "next/image";
import Link from "next/link";
import React, { RefObject } from "react";
import { FaCamera } from "react-icons/fa";

interface ProductVariation {
    option: string;
    value: string;
}

interface ProductStock {
    store: StoreInterface;
    variant: ProductVariation | null;
    barcode: string;
    selling_price: number;
    quantity: number;
    reorder_level: number;
    expiry_date: string;
}

type Props = {
    ref: RefObject<HTMLFormElement | null>;
    product?: ProductInterface;
    imagePreview: string | undefined | null;
    setImagePreview: React.Dispatch<React.SetStateAction<string | null>>;
    enableTax: boolean;
    toggleEnableTax: (e: React.ChangeEvent<HTMLInputElement>) => void;
    productStocks: ProductStock[];
    setProductStocks: React.Dispatch<React.SetStateAction<ProductStock[]>>;
    productVariations: ProductVariation[];
    setProductVariations: React.Dispatch<
        React.SetStateAction<ProductVariation[]>
    >;
    enableVariations: boolean;
    setEnableVariations: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProductForm = ({
    ref,
    product,
    imagePreview,
    setImagePreview,
    enableTax,
    toggleEnableTax,
    productStocks,
    setProductStocks,
    enableVariations,
    setEnableVariations,
    productVariations,
    setProductVariations,
}: Props) => {
    const imageInputRef = React.useRef<HTMLInputElement | null>(null);

    const handleImageClick = () => imageInputRef.current?.click();
    const handleImageChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        setImagePreview(url);
    };

    const { data: categories } = useCategories();

    const [selectedStore, setSelectedStore] = React.useState<
        StoreInterface | undefined | null
    >(null);

    const [selectedVariation, setSelectedVariation] =
        React.useState<ProductVariation | null>(null);

    const { data: stores } = useStores({});

    const addToProductStocks = () => {
        if (!ref || !selectedStore) return;

        const formElements = ref.current?.elements;
        const quantity = (
            formElements?.namedItem("quantity") as HTMLInputElement
        ).value;
        const reorder_level = (
            formElements?.namedItem("reorder_level") as HTMLInputElement
        ).value;
        const selling_price = (
            formElements?.namedItem("selling_price") as HTMLInputElement
        ).value;
        const barcode = (formElements?.namedItem("barcode") as HTMLInputElement)
            .value;
        const expiry_date = (
            formElements?.namedItem("expiry_date") as HTMLInputElement
        ).value;

        setProductStocks((prev) => [
            ...prev,
            {
                store: selectedStore,
                variant: selectedVariation,
                quantity: Number(quantity),
                reorder_level: Number(reorder_level),
                selling_price: Number(selling_price),
                barcode,
                expiry_date,
            },
        ]);
    };

    const removeFromProductStocks = (stock: ProductStock) => {
        setProductStocks((prev) => prev.filter((item) => item != stock));
    };

    const toggleEnableVariations = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.currentTarget.checked;
        setEnableVariations(checked);
    };

    const addToProductVariations = () => {
        if (!ref || !enableVariations) return;

        const formElements = ref.current?.elements;
        const option = (
            formElements?.namedItem("variation_option") as HTMLInputElement
        ).value;
        const value = (
            formElements?.namedItem("variation_value") as HTMLInputElement
        ).value;
        setProductVariations((prev) => [...prev, { option, value }]);
    };

    const removeFromProductVariations = (variant: ProductVariation) => {
        setProductVariations((prev) =>
            prev.filter(
                (variation) =>
                    variation.option != variant.option &&
                    variation.value != variant.value
            )
        );
    };

    return (
        <form ref={ref}>
            <div className="flex flex-col md:flex-row gap-6 mt-6 md:mb-6">
                <div className="w-full md:w-1/2 bg-white rounded-2xl shadow-md p-6">
                    <h3 className="text-2xl font-medium">
                        General Information
                    </h3>
                    <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="col-span-full">
                            <label
                                htmlFor="cover-photo"
                                className="block text-sm/6 font-medium text-gray-900"
                            >
                                Product Image
                            </label>
                            <div
                                onClick={handleImageClick}
                                className="cursor-pointer relative aspect-video overflow-hidden mt-2 flex justify-center rounded-lg bg-gray-100 outline-1 -outline-offset-1 outline-gray-300 px-6 py-10"
                            >
                                <div className="text-center flex flex-col justify-center items-center">
                                    <FaCamera
                                        aria-hidden="true"
                                        className="mx-auto size-12 text-gray-300"
                                    />
                                    <div className="mt-4 flex text-sm/6 text-gray-600">
                                        <label
                                            htmlFor="image"
                                            className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-600 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-600 hover:text-indigo-500"
                                        >
                                            <span>Upload a file</span>
                                            <input
                                                ref={imageInputRef}
                                                onChange={handleImageChange}
                                                id="image"
                                                name="image"
                                                type="file"
                                                className="sr-only"
                                            />
                                        </label>
                                    </div>
                                    <p className="text-xs/5 text-gray-600">
                                        PNG, JPG, GIF up to 10MB
                                    </p>
                                </div>
                                {imagePreview && (
                                    <Image
                                        src={imagePreview ?? ""}
                                        alt="preview"
                                        className="absolute inset-0 w-full h-full object-cover overflow-hidden focus:outline-none"
                                        width={600}
                                        height={400}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label
                                htmlFor="name"
                                className="block text-sm/6 font-medium"
                            >
                                Product Name
                            </label>
                            <div className="mt-2">
                                <input
                                    defaultValue={product?.name ?? ""}
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label
                                htmlFor="sku"
                                className="block text-sm/6 font-medium"
                            >
                                SKU / Barcode
                            </label>
                            <div className="mt-2">
                                <input
                                    defaultValue={product?.sku ?? ""}
                                    id="sku"
                                    name="sku"
                                    type="text"
                                    autoComplete="sku"
                                    className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <div className="col-span-full">
                            <label
                                htmlFor="description"
                                className="block text-sm/6 font-medium text-gray-900"
                            >
                                Description
                            </label>
                            <div className="mt-2">
                                <textarea
                                    defaultValue={product?.description ?? ""}
                                    id="description"
                                    name="description"
                                    rows={3}
                                    className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                            <p className="mt-3 text-sm/6 text-gray-600">
                                Write a few sentences about the product.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 flex flex-col">
                    <div className="w-full md:h-1/2 bg-white rounded-2xl shadow-md p-6">
                        <h3 className="text-2xl font-medium">
                            Pricing & Tax Information
                        </h3>
                        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="cost_price"
                                    className="block text-sm/6 font-medium"
                                >
                                    Cost Price
                                </label>
                                <div className="mt-2">
                                    <input
                                        defaultValue={product?.cost_price ?? ""}
                                        id="cost_price"
                                        name="cost_price"
                                        type="text"
                                        autoComplete="cost_price"
                                        className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="tax_setting"
                                    className="block text-sm/6 font-medium"
                                >
                                    Tax Settings
                                </label>
                                <div className="flex gap-3">
                                    <div className="flex h-6 shrink-0 items-center mt-2">
                                        <div className="group grid size-4 grid-cols-1">
                                            <input
                                                checked={enableTax}
                                                onChange={toggleEnableTax}
                                                id="tax_setting"
                                                name="tax_setting"
                                                type="checkbox"
                                                aria-describedby="tax_setting-description"
                                                className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                            />
                                            <svg
                                                fill="none"
                                                viewBox="0 0 14 14"
                                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                            >
                                                <path
                                                    d="M3 8L6 11L11 3.5"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="opacity-0 group-has-checked:opacity-100"
                                                />
                                                <path
                                                    d="M3 7H11"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="opacity-0 group-has-indeterminate:opacity-100"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="text-sm/6 mt-2">
                                        <label
                                            htmlFor="tax_setting"
                                            className="font-medium text-gray-900"
                                        >
                                            Enable Tax
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="tax_type"
                                    className="block text-sm/6 font-medium"
                                >
                                    Tax Type
                                </label>
                                <div className="mt-2 grid grid-cols-1">
                                    <select
                                        disabled={!enableTax}
                                        id="tax_type"
                                        name="tax_type"
                                        autoComplete="tax-type"
                                        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    >
                                        <option value="none">None</option>
                                        <option value="GST">GST</option>
                                        <option value="VAT">VAT</option>
                                        <option value="Sales Tax">
                                            Sales Tax
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="tax_rate"
                                    className="block text-sm/6 font-medium"
                                >
                                    Tax Rate
                                </label>
                                <div className="mt-2 flex gap-2">
                                    <input
                                        defaultValue={product?.tax_rate ?? ""}
                                        disabled={!enableTax}
                                        id="tax_rate"
                                        name="tax_rate"
                                        type="text"
                                        autoComplete="off"
                                        className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                        placeholder="Enter tax rate"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:h-1/2 bg-white rounded-2xl shadow-md p-6 my-6 md:mb-0">
                        <h3 className="text-2xl font-medium">Categorization</h3>
                        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="category"
                                    className="block text-sm/6 font-medium"
                                >
                                    Category
                                </label>
                                <div className="mt-2 grid grid-cols-1">
                                    <select
                                        id="category"
                                        name="category"
                                        autoComplete="category"
                                        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    >
                                        <option value="">None</option>
                                        {categories?.map((category) => (
                                            <option
                                                value={category.id}
                                                key={category.id}
                                                selected={
                                                    category.id ==
                                                    product?.category_id
                                                }
                                            >
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mt-2">
                                    <Link
                                        href="/dashboard/categories/add"
                                        className="text-indigo-600 hover:text-indigo-500 text-sm/6"
                                    >
                                        Add New Category
                                    </Link>
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="brand"
                                    className="block text-sm/6 font-medium"
                                >
                                    Brand
                                </label>
                                <div className="mt-2">
                                    <input
                                        defaultValue={product?.brand ?? ""}
                                        id="brand"
                                        name="brand"
                                        type="text"
                                        autoComplete="brand"
                                        className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                            <div className="col-span-full">
                                <label
                                    htmlFor="tags"
                                    className="block text-sm/6 font-medium"
                                >
                                    Tags
                                </label>
                                <div className="mt-2">
                                    <input
                                        defaultValue={product?.tags ?? ""}
                                        id="tags"
                                        name="tags"
                                        type="text"
                                        autoComplete="tags"
                                        className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6 md:my-6">
                <div className="w-full md:w-2/3 bg-white rounded-2xl shadow-md p-6">
                    <h3 className="text-2xl font-medium mb-4">
                        Stock & Inventory Information
                    </h3>
                    {productStocks.map((stock, index) => (
                        <div
                            key={index.toString()}
                            className="grid grid-cols-5 my-4 items-center border border-purple-300 bg-purple-100 py-1 px-2 rounded-lg"
                        >
                            <div className="col-span-1 text-sm/6 font-medium">
                                {stock.store.name}
                            </div>
                            <div className="col-span-1 text-sm/6 font-medium">
                                {stock.variant
                                    ? `${stock.variant.option.toLocaleUpperCase()}: ${
                                          stock.variant.value
                                      }`
                                    : "Main"}
                            </div>
                            <div className="col-span-1 text-sm/6 font-medium">
                                {stock.quantity} units
                            </div>
                            <div className="col-span-1 text-sm/6 font-medium">
                                ${stock.selling_price}
                            </div>
                            <div
                                onClick={() => removeFromProductStocks(stock)}
                                className="sm:col-span-1 text-sm border text-center px-2 py-1 rounded-md bg-red-400 text-white hover:bg-transparent hover:text-red-400 border-red-400 cursor-pointer"
                            >
                                Remove
                            </div>
                        </div>
                    ))}
                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8 border border-gray-300 bg-gray-50 p-4 rounded-lg">
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="store"
                                className="block text-sm/6 font-medium"
                            >
                                Store
                            </label>
                            <div className="mt-2 grid grid-cols-1">
                                <select
                                    id="store"
                                    name="store"
                                    autoComplete="tax-type"
                                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                >
                                    <option>None</option>
                                    {stores?.pages?.map((page) =>
                                        page?.data?.map((store) => (
                                            <option
                                                key={store.id}
                                                onClick={() =>
                                                    setSelectedStore(store)
                                                }
                                            >
                                                {store.name}
                                            </option>
                                        ))
                                    )}
                                </select>
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="stock_variant"
                                className="block text-sm/6 font-medium"
                            >
                                Variant
                            </label>
                            <div className="mt-2 grid grid-cols-1">
                                <select
                                    id="stock_variant"
                                    name="stock_variant"
                                    autoComplete="tax-type"
                                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                >
                                    <option
                                        onClick={() =>
                                            setSelectedVariation(null)
                                        }
                                    >
                                        Main
                                    </option>
                                    {productVariations?.map((variation) => (
                                        <option
                                            key={`${variation.option}-${variation.value}`}
                                            onClick={() =>
                                                setSelectedVariation(variation)
                                            }
                                        >
                                            {variation.option.toLocaleUpperCase()}
                                            : {variation.value}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="barcode"
                                className="block text-sm/6 font-medium"
                            >
                                Barcode
                            </label>
                            <div className="mt-2 flex gap-2">
                                <input
                                    id="barcode"
                                    name="barcode"
                                    type="text"
                                    autoComplete="off"
                                    className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                    placeholder="Enter tax rate"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="selling_price"
                                className="block text-sm/6 font-medium"
                            >
                                Selling Price
                            </label>
                            <div className="mt-2 flex gap-2">
                                <input
                                    id="selling_price"
                                    name="selling_price"
                                    type="text"
                                    autoComplete="off"
                                    className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                    placeholder="Enter tax rate"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
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
                                    className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                    placeholder="Enter tax rate"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="reorder_level"
                                className="block text-sm/6 font-medium"
                            >
                                Reorder Level
                            </label>
                            <div className="mt-2 flex gap-2">
                                <input
                                    id="reorder_level"
                                    name="reorder_level"
                                    type="text"
                                    autoComplete="off"
                                    className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                    placeholder="Enter tax rate"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="expiry_date"
                                className="block text-sm/6 font-medium"
                            >
                                Expiry Date
                            </label>
                            <div className="mt-2 flex gap-2">
                                <input
                                    id="expiry_date"
                                    name="expiry_date"
                                    type="date"
                                    autoComplete="off"
                                    className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                    placeholder="Enter tax rate"
                                />
                            </div>
                        </div>
                        <div
                            onClick={addToProductStocks}
                            className="col-span-2 text-sm h-fit mt-auto border text-center px-2 py-1 rounded-md bg-[#615cf6] text-white hover:bg-transparent hover:text-[#615cf6] border-[#615cf6] cursor-pointer"
                        >
                            Add Stock
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/3 bg-white rounded-2xl shadow-md p-6">
                    <h3 className="text-2xl font-medium">Advance</h3>
                    <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="col-span-full">
                            <label
                                htmlFor="Variation"
                                className="block text-sm/6 font-medium"
                            >
                                Variations
                            </label>
                            <div className="flex gap-3">
                                <div className="flex h-6 shrink-0 items-center">
                                    <div className="group grid size-4 grid-cols-1">
                                        <input
                                            checked={enableVariations}
                                            onChange={toggleEnableVariations}
                                            id="enable_variations"
                                            name="enable_variations"
                                            type="checkbox"
                                            aria-describedby="enable_variations-description"
                                            className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                        />
                                        <svg
                                            fill="none"
                                            viewBox="0 0 14 14"
                                            className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                        >
                                            <path
                                                d="M3 8L6 11L11 3.5"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="opacity-0 group-has-checked:opacity-100"
                                            />
                                            <path
                                                d="M3 7H11"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="opacity-0 group-has-indeterminate:opacity-100"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div className="text-sm/6">
                                    <label
                                        htmlFor="enable_variations"
                                        className="font-medium text-gray-900"
                                    >
                                        Enable Variations
                                    </label>
                                </div>
                            </div>
                            {productVariations.map((variation) => (
                                <div
                                    className="grid grid-cols-5 my-2"
                                    key={`${variation.option}-${variation.value}`}
                                >
                                    <div className="block text-sm font-medium text-gray-700 sm:col-span-2">
                                        {variation.option}
                                    </div>
                                    <div className="block text-sm font-medium text-gray-700 sm:col-span-2">
                                        {variation.value}
                                    </div>
                                    <div
                                        onClick={() =>
                                            removeFromProductVariations(
                                                variation
                                            )
                                        }
                                        className="sm:col-span-1 text-sm border text-center px-2 py-1 rounded-md bg-red-400 text-white hover:bg-transparent hover:text-red-400 border-red-400 cursor-pointer"
                                    >
                                        Remove
                                    </div>
                                </div>
                            ))}
                            <div className="mt-2 grid grid-cols-1">
                                <label className="block text-sm/6 font-medium">
                                    Add Variation Option
                                </label>
                                <div
                                    className={`border border-gray-300 rounded-lg mt-2 p-4 ${
                                        enableVariations
                                            ? "bg-gray-50"
                                            : "bg-gray-200"
                                    }`}
                                >
                                    <div className="grid grid-cols-2 gap-4 items-center">
                                        <div>
                                            <label
                                                htmlFor="variation_option"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Option
                                            </label>
                                            <input
                                                disabled={!enableVariations}
                                                id="variation_option"
                                                name="variation_option"
                                                type="text"
                                                placeholder="e.g., Size, Color, Weight"
                                                className="mt-1 block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="variation_value"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Value
                                            </label>
                                            <input
                                                disabled={!enableVariations}
                                                id="variation_value"
                                                name="variation_value"
                                                type="text"
                                                placeholder="e.g., XL, Red, 200g"
                                                className="mt-1 block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div
                                        onClick={addToProductVariations}
                                        className={`text-sm border w-fit mt-4 ms-auto px-2 py-1 rounded-md ${
                                            enableVariations
                                                ? "bg-[#615cf6] text-white hover:bg-transparent hover:text-[#615cf6] border-[#615cf6] cursor-pointer"
                                                : "bg-gray-500 border-gray-500 cursor-not-allowed"
                                        }`}
                                    >
                                        Add Attribute
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default ProductForm;
