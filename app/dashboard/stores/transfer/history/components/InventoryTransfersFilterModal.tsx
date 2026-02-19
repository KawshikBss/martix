import DashboardModal from "@/components/ui/modals/DashboardModal";
import { useProducts } from "@/lib/hooks/products/useProducts";
import { useStores } from "@/lib/hooks/stores/useStores";
import { useUsers } from "@/lib/hooks/users/useUsers";
import { useRouter, useSearchParams } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { IoMdClose } from "react-icons/io";

type Props = {
    show?: boolean;
    onClose?: () => void;
};
const InventoryTransfersFilterModal = ({ show, onClose }: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { data: stores } = useStores();
    const { data: products } = useProducts({});
    const { data: users } = useUsers();

    const [filters, setFilters] = useState({
        store: searchParams.get("store") ?? "",
        product: searchParams.get("product") ?? "",
        user: searchParams.get("user") ?? "",
        status: searchParams.get("status") ?? "",
        min_create_date: searchParams.get("min_create_date") ?? "",
        max_create_date: searchParams.get("max_create_date") ?? "",
        min_update_date: searchParams.get("min_update_date") ?? "",
        max_update_date: searchParams.get("max_update_date") ?? "",
    });

    const onFilterChange = (
        e: ChangeEvent<HTMLSelectElement | HTMLInputElement>,
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
            user: "",
            store: "",
            product: "",
            status: "",
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
        <DashboardModal title="Filter Transfers" show={show} onClose={onClose}>
            <div className="grid grid-cols-2 gap-4 items-center mt-4">
                <div className="sm:col-span-1">
                    <label
                        htmlFor="store"
                        className="block text-sm/6 font-medium"
                    >
                        Store
                    </label>
                    <div className="mt-2 grid grid-cols-1">
                        <select
                            value={filters.store}
                            onChange={onFilterChange}
                            id="store"
                            name="store"
                            autoComplete="tax-type"
                            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        >
                            <option value="">All</option>
                            {stores?.pages?.map((page) =>
                                page?.data?.map((store) => (
                                    <option key={store.id} value={store.id}>
                                        {store.name}
                                    </option>
                                )),
                            )}
                        </select>
                    </div>
                </div>
                <div className="sm:col-span-1">
                    <label
                        htmlFor="product"
                        className="block text-sm/6 font-medium"
                    >
                        Product
                    </label>
                    <div className="mt-2 grid grid-cols-1">
                        <select
                            value={filters.product}
                            onChange={onFilterChange}
                            id="product"
                            name="product"
                            autoComplete="tax-type"
                            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        >
                            <option value="">All</option>
                            {products?.pages?.map((page) =>
                                page?.data?.map((product) => (
                                    <option key={product.id} value={product.id}>
                                        {product.name}
                                    </option>
                                )),
                            )}
                        </select>
                    </div>
                </div>
                <div className="sm:col-span-1">
                    <label
                        htmlFor="user"
                        className="block text-sm/6 font-medium"
                    >
                        Performed by
                    </label>
                    <div className="mt-2 grid grid-cols-1">
                        <select
                            value={filters.user}
                            onChange={onFilterChange}
                            id="user"
                            name="user"
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
                        htmlFor="adjustment_type"
                        className="block text-sm/6 font-medium"
                    >
                        Status
                    </label>
                    <div className="mt-2 grid grid-cols-1">
                        <select
                            id="adjustment_type"
                            value={filters.status}
                            onChange={onFilterChange}
                            name="adjustment_type"
                            autoComplete="adjustment_type"
                            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        >
                            <option value="">All</option>
                            <option value="pending">Pending</option>
                            <option value="draft">Draft</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>
            </div>
            <h4 className="text-xl font-medium mt-6 col-span-full">Advanced</h4>
            <div className="grid grid-cols-2 gap-4 items-center mt-2">
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

export default InventoryTransfersFilterModal;
