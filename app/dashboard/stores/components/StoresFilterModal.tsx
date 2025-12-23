import DashboardModal from "@/components/ui/modals/DashboardModal";
import { useUsers } from "@/lib/hooks/users/useUsers";
import { useRouter, useSearchParams } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { IoMdClose } from "react-icons/io";

type Props = {
    show?: boolean;
    onClose?: () => void;
};
const StoresFilterModal = ({ show, onClose }: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { data: users } = useUsers();

    const [filters, setFilters] = useState({
        manager: searchParams.get("manager") ?? "",
        branch: searchParams.get("branch") ?? "",
        location: searchParams.get("location") ?? "",
        status: searchParams.get("status") ?? "",
        stock_level: searchParams.get("stock_level") ?? "",
        type: searchParams.get("type") ?? "",
        min_inventory_value: searchParams.get("min_inventory_value") ?? "",
        max_inventory_value: searchParams.get("max_inventory_value") ?? "",
        has_staff: (searchParams.get("has_staff") ?? "") === "true",
        has_expired_products:
            (searchParams.get("has_expired_products") ?? "") === "true",
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
            manager: searchParams.get("manager") ?? "",
            type: searchParams.get("type") ?? "",
            branch: searchParams.get("branch") ?? "",
            location: searchParams.get("location") ?? "",
            status: searchParams.get("status") ?? "",
            stock_level: searchParams.get("stock_level") ?? "",
            min_inventory_value: searchParams.get("min_inventory_value") ?? "",
            max_inventory_value: searchParams.get("max_inventory_value") ?? "",
            has_staff: (searchParams.get("has_staff") ?? "") === "true",
            has_expired_products:
                (searchParams.get("has_expired_products") ?? "") === "true",
            min_create_date: searchParams.get("min_create_date") ?? "",
            max_create_date: searchParams.get("max_create_date") ?? "",
            min_update_date: searchParams.get("min_update_date") ?? "",
            max_update_date: searchParams.get("max_update_date") ?? "",
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
        <DashboardModal title="Filter Stores" show={show} onClose={onClose}>
            <div className="grid grid-cols-2 gap-4 items-center mt-4">
                <div className="sm:col-span-1">
                    <label
                        htmlFor="manager"
                        className="block text-sm/6 font-medium"
                    >
                        Manager
                    </label>
                    <div className="mt-2 grid grid-cols-1">
                        <select
                            value={filters.manager}
                            onChange={onFilterChange}
                            id="manager"
                            name="manager"
                            autoComplete="tax-type"
                            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        >
                            <option value="">All</option>
                            {users?.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="sm:col-span-1">
                    <label
                        htmlFor="store_type"
                        className="block text-sm/6 font-medium"
                    >
                        Store Type
                    </label>
                    <div className="mt-2 grid grid-cols-1">
                        <select
                            value={filters.type}
                            onChange={onFilterChange}
                            id="store_type"
                            name="store_type"
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
                        htmlFor="branch"
                        className="block text-sm/6 font-medium"
                    >
                        Branch
                    </label>
                    <div className="mt-2 grid grid-cols-1">
                        <input
                            value={filters.branch}
                            onChange={onFilterChange}
                            id="branch"
                            name="branch"
                            type="text"
                            autoComplete="off"
                            className="block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                        />
                    </div>
                </div>
                <div className="sm:col-span-1">
                    <label
                        htmlFor="location"
                        className="block text-sm/6 font-medium"
                    >
                        Location
                    </label>
                    <div className="mt-2 grid grid-cols-1">
                        <input
                            value={filters.location}
                            onChange={onFilterChange}
                            id="location"
                            name="location"
                            type="number"
                            autoComplete="off"
                            className="block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                        />
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
                <div className="sm:col-span-1">
                    <label
                        htmlFor="stock_level"
                        className="block text-sm/6 font-medium"
                    >
                        Stock Health
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
                        htmlFor="min_inventory_value"
                        className="block text-sm/6 font-medium"
                    >
                        Min Inventory Value
                    </label>
                    <div className="mt-2 grid grid-cols-1">
                        <input
                            value={filters.min_inventory_value}
                            onChange={onFilterChange}
                            id="min_inventory_value"
                            name="min_inventory_value"
                            type="number"
                            autoComplete="off"
                            className="block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                        />
                    </div>
                </div>
                <div className="sm:col-span-1">
                    <label
                        htmlFor="max_inventory_value"
                        className="block text-sm/6 font-medium"
                    >
                        Max Inventory Value
                    </label>
                    <div className="mt-2 grid grid-cols-1">
                        <input
                            value={filters.max_inventory_value}
                            onChange={onFilterChange}
                            id="max_inventory_value"
                            name="max_inventory_value"
                            type="number"
                            autoComplete="off"
                            className="block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                        />
                    </div>
                </div>
            </div>
            <h4 className="text-xl font-medium mt-6 col-span-full">Advanced</h4>
            <div className="grid grid-cols-2 gap-4 items-center mt-2">
                <div className="flex gap-3">
                    <div className="flex h-6 shrink-0 items-center">
                        <div className="group grid size-4 grid-cols-1">
                            <input
                                checked={filters.has_staff}
                                onChange={onFilterBoolChange}
                                id="has_staff"
                                name="has_staff"
                                type="checkbox"
                                aria-describedby="has_staff-description"
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
                            htmlFor="has_staff"
                            className="font-medium text-gray-900"
                        >
                            Has Staff
                        </label>
                    </div>
                </div>
                <div className="flex gap-3">
                    <div className="flex h-6 shrink-0 items-center">
                        <div className="group grid size-4 grid-cols-1">
                            <input
                                checked={filters.has_expired_products}
                                onChange={onFilterBoolChange}
                                id="has_expired_products"
                                name="has_expired_products"
                                type="checkbox"
                                aria-describedby="has_expired_products-description"
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
                            htmlFor="has_expired_products"
                            className="font-medium text-gray-900"
                        >
                            Has Expired Products
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

export default StoresFilterModal;
