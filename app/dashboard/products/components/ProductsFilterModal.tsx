import DashboardModal from "@/components/ui/modals/DashboardModal";
import { useCategories } from "@/lib/hooks/categories/useCategories";
import { useRouter, useSearchParams } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { IoMdClose } from "react-icons/io";

type Props = {
    show?: boolean;
    onClose?: () => void;
};
const ProductsFilterModal = ({ show, onClose }: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { data: categories } = useCategories();

    const [filters, setFilters] = useState({
        category: searchParams.get("category") ?? "",
        product_type: searchParams.get("product_type") ?? "",
        min_price: searchParams.get("min_price") ?? "",
        max_price: searchParams.get("max_price") ?? "",
        stock_level: searchParams.get("stock_level") ?? "",
        status: searchParams.get("status") ?? "",
        brand: searchParams.get("brand") ?? "",
        tag: searchParams.get("tag") ?? "",
        has_expiry_date: (searchParams.get("has_expiry_date") ?? "") === "true",
        expiring_soon: (searchParams.get("expiring_soon") ?? "") === "true",
        has_barcode: (searchParams.get("has_barcode") ?? "") === "true",
        has_variants: (searchParams.get("has_variants") ?? "") === "true",
        min_create_date: searchParams.get("min_create_date") ?? "",
        max_create_date: searchParams.get("max_create_date") ?? "",
        min_update_date: searchParams.get("min_update_date") ?? "",
        max_update_date: searchParams.get("max_update_date") ?? "",
    });

    const onFilterChange = (
        e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
    ) => {
        const { name, value } = e.target;

        setFilters((prev) => {
            return { ...prev, [name]: value };
        });
    };

    const onFilterBoolChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;

        setFilters((prev) => {
            return { ...prev, [name]: checked };
        });
    };

    const applyFilters = () => {
        const params = new URLSearchParams(searchParams.toString());

        Object.entries(filters).forEach((item) => {
            const [name, value] = item;
            if (value.toString().length) params.set(name, value.toString());
            else params.delete(name);
        });

        router.push(`?${params.toString()}`);
        onClose!();
    };

    const resetFilters = () => {
        setFilters({
            category: "",
            product_type: "",
            min_price: "",
            max_price: "",
            stock_level: "",
            status: "",
            brand: "",
            tag: "",
            has_expiry_date: false,
            expiring_soon: false,
            has_barcode: false,
            has_variants: false,
            min_create_date: "",
            max_create_date: "",
            min_update_date: "",
            max_update_date: "",
        });
        router.push("?");
        onClose!();
    };

    const resetSingleFilter = (name: string) => {
        setFilters((prev) => {
            return {
                ...prev,
                [name]:
                    typeof filters[name as keyof typeof filters] === "string"
                        ? ""
                        : false,
            };
        });
    };

    return (
        <DashboardModal title="Filter Products" show={show} onClose={onClose}>
            <div className="grid grid-cols-2 gap-4 items-center mt-4">
                <div className="sm:col-span-1">
                    <label
                        htmlFor="category"
                        className="block text-sm/6 font-medium"
                    >
                        Category
                    </label>
                    <div className="mt-2 grid grid-cols-1">
                        <select
                            value={filters.category}
                            onChange={onFilterChange}
                            id="category"
                            name="category"
                            autoComplete="tax-type"
                            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        >
                            <option value="">All</option>
                            {categories?.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="sm:col-span-1">
                    <label
                        htmlFor="product_type"
                        className="block text-sm/6 font-medium"
                    >
                        Product Type
                    </label>
                    <div className="mt-2 grid grid-cols-1">
                        <select
                            value={filters.product_type}
                            onChange={onFilterChange}
                            id="product_type"
                            name="product_type"
                            autoComplete="tax-type"
                            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        >
                            <option value="">All</option>
                            <option value="no_variants">
                                Simple Products (No Variants)
                            </option>
                            <option value="with_variants">
                                Variant Parents
                            </option>
                            <option value="only_variants">Variants Only</option>
                        </select>
                    </div>
                </div>
                <div className="sm:col-span-1">
                    <label
                        htmlFor="min_price"
                        className="block text-sm/6 font-medium"
                    >
                        Min Price
                    </label>
                    <div className="mt-2 grid grid-cols-1">
                        <input
                            value={filters.min_price}
                            onChange={onFilterChange}
                            id="min_price"
                            name="min_price"
                            type="number"
                            autoComplete="off"
                            className="block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                        />
                    </div>
                </div>
                <div className="sm:col-span-1">
                    <label
                        htmlFor="max_price"
                        className="block text-sm/6 font-medium"
                    >
                        Max Price
                    </label>
                    <div className="mt-2 grid grid-cols-1">
                        <input
                            value={filters.max_price}
                            onChange={onFilterChange}
                            id="max_price"
                            name="max_price"
                            type="number"
                            autoComplete="off"
                            className="block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                        />
                    </div>
                </div>
                <div className="sm:col-span-1">
                    <label
                        htmlFor="stock_level"
                        className="block text-sm/6 font-medium"
                    >
                        Stock Level
                    </label>
                    <div className="mt-2 grid grid-cols-1">
                        <select
                            value={filters.stock_level}
                            onChange={onFilterChange}
                            id="stock_level"
                            name="stock_level"
                            autoComplete="tax-type"
                            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        >
                            <option value="">All</option>
                            <option value="in_stock">In Stock</option>
                            <option value="low_stock">Low Stock</option>
                            <option value="out_of_stock">Out Of Stock</option>
                        </select>
                    </div>
                </div>
                <div className="sm:col-span-1">
                    <label
                        htmlFor="status"
                        className="block text-sm/6 font-medium"
                    >
                        Status
                    </label>
                    <div className="mt-2 grid grid-cols-1">
                        <select
                            value={filters.status}
                            onChange={onFilterChange}
                            id="status"
                            name="status"
                            autoComplete="tax-type"
                            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        >
                            <option value="">All</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div>
            </div>
            <h4 className="text-xl font-medium mt-6 col-span-full">Advanced</h4>
            <div className="grid grid-cols-2 gap-4 items-center mt-2">
                <div className="sm:col-span-1">
                    <label
                        htmlFor="brand"
                        className="block text-sm/6 font-medium"
                    >
                        Brand
                    </label>
                    <div className="mt-2 grid grid-cols-1">
                        <input
                            value={filters.brand}
                            onChange={onFilterChange}
                            id="brand"
                            name="brand"
                            type="text"
                            autoComplete="off"
                            className="block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                        />
                    </div>
                </div>
                <div className="sm:col-span-1">
                    <label
                        htmlFor="tag"
                        className="block text-sm/6 font-medium"
                    >
                        Tag
                    </label>
                    <div className="mt-2 grid grid-cols-1">
                        <input
                            value={filters.tag}
                            onChange={onFilterChange}
                            id="tag"
                            name="tag"
                            type="text"
                            autoComplete="off"
                            className="block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                        />
                    </div>
                </div>
                <div className="flex gap-3">
                    <div className="flex h-6 shrink-0 items-center">
                        <div className="group grid size-4 grid-cols-1">
                            <input
                                checked={filters.has_expiry_date}
                                onChange={onFilterBoolChange}
                                id="has_expiry_date"
                                name="has_expiry_date"
                                type="checkbox"
                                aria-describedby="has_expiry_date-description"
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
                            htmlFor="has_expiry_date"
                            className="font-medium text-gray-900"
                        >
                            Has Expiry Date
                        </label>
                    </div>
                </div>
                <div className="flex gap-3">
                    <div className="flex h-6 shrink-0 items-center">
                        <div className="group grid size-4 grid-cols-1">
                            <input
                                checked={filters.expiring_soon}
                                onChange={onFilterBoolChange}
                                id="expiring_soon"
                                name="expiring_soon"
                                type="checkbox"
                                aria-describedby="expiring_soon-description"
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
                            htmlFor="expiring_soon"
                            className="font-medium text-gray-900"
                        >
                            Expiring Soon
                        </label>
                    </div>
                </div>
                <div className="flex gap-3">
                    <div className="flex h-6 shrink-0 items-center">
                        <div className="group grid size-4 grid-cols-1">
                            <input
                                checked={filters.has_barcode}
                                onChange={onFilterBoolChange}
                                id="has_barcode"
                                name="has_barcode"
                                type="checkbox"
                                aria-describedby="has_barcode-description"
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
                            htmlFor="has_barcode"
                            className="font-medium text-gray-900"
                        >
                            Has Barcode
                        </label>
                    </div>
                </div>
                <div className="flex gap-3">
                    <div className="flex h-6 shrink-0 items-center">
                        <div className="group grid size-4 grid-cols-1">
                            <input
                                checked={filters.has_variants}
                                onChange={onFilterBoolChange}
                                id="has_variants"
                                name="has_variants"
                                type="checkbox"
                                aria-describedby="has_variants-description"
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
                            htmlFor="has_variants"
                            className="font-medium text-gray-900"
                        >
                            Has Variations
                        </label>
                    </div>
                </div>
                <div className="sm:col-span-1">
                    <label
                        htmlFor="min_create_date"
                        className="block text-sm/6 font-medium"
                    >
                        Min Create Date
                    </label>
                    <div className="mt-2 grid grid-cols-1">
                        <input
                            value={filters.min_create_date}
                            onChange={onFilterChange}
                            id="min_create_date"
                            name="min_create_date"
                            type="date"
                            autoComplete="off"
                            className="block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                        />
                    </div>
                </div>
                <div className="sm:col-span-1">
                    <label
                        htmlFor="max_create_date"
                        className="block text-sm/6 font-medium"
                    >
                        Max Create Date
                    </label>
                    <div className="mt-2 grid grid-cols-1">
                        <input
                            value={filters.max_create_date}
                            onChange={onFilterChange}
                            id="max_create_date"
                            name="max_create_date"
                            type="date"
                            autoComplete="off"
                            className="block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                        />
                    </div>
                </div>
                <div className="sm:col-span-1">
                    <label
                        htmlFor="min_update_date"
                        className="block text-sm/6 font-medium"
                    >
                        Min Update Date
                    </label>
                    <div className="mt-2 grid grid-cols-1">
                        <input
                            value={filters.min_update_date}
                            onChange={onFilterChange}
                            id="min_update_date"
                            name="min_update_date"
                            type="date"
                            autoComplete="off"
                            className="block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                        />
                    </div>
                </div>
                <div className="sm:col-span-1">
                    <label
                        htmlFor="max_update_date"
                        className="block text-sm/6 font-medium"
                    >
                        Max Update Date
                    </label>
                    <div className="mt-2 grid grid-cols-1">
                        <input
                            value={filters.max_update_date}
                            onChange={onFilterChange}
                            id="max_update_date"
                            name="max_update_date"
                            type="date"
                            autoComplete="off"
                            className="block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                        />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-4 md:grid-cols-5 gap-4 mt-4">
                {Object.keys(filters).map((item) => {
                    var value = filters[item as keyof typeof filters];

                    if (typeof value === "string" && !value.length) return null;
                    if (typeof value === "boolean" && !value) return null;

                    return (
                        <button
                            onClick={() => resetSingleFilter(item)}
                            key={item}
                            className="px-4 py-1 rounded-xl text-white text-sm bg-[#615cf6] flex items-center justify-between"
                        >
                            {item.replaceAll("_", " ").toLocaleUpperCase()}
                            {typeof value !== "boolean" ? `: ${value}` : ""}
                            <IoMdClose className="inline-block align-middle" />
                        </button>
                    );
                })}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <button
                    onClick={resetFilters}
                    className="bg-red-400 hover:bg-transparent text-white hover:text-red-400 border border-red-400 px-2 py-1 rounded-md cursor-pointer"
                >
                    Reset
                </button>

                <button
                    onClick={applyFilters}
                    className="col-end-5 bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md cursor-pointer"
                >
                    Apply
                </button>
            </div>
        </DashboardModal>
    );
};

export default ProductsFilterModal;
