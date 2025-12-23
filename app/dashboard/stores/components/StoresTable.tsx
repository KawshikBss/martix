"use client";

import Loader from "@/components/ui/loaders/Loader";
import { useToggleStoreStatus } from "@/lib/hooks/stores/useToggleStoreStatus";
import { StoreInterface } from "@/lib/interfaces/StoreIntefrace";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export interface IStoresTableProps {
    data?: StoreInterface[] | undefined;
    isLoading: boolean;
    isSuccess: boolean;
    query?: string;
}

export function StoresTable({
    data,
    isLoading,
    isSuccess,
    query,
}: IStoresTableProps) {
    const { mutateAsync: toggleStoreStatusMutation } = useToggleStoreStatus();

    const searchParams = useSearchParams();
    const filters = {
        manager: searchParams.get("manager") ?? "",
        branch: searchParams.get("branch") ?? "",
        location: searchParams.get("location") ?? "",
        status: searchParams.get("status") ?? "",
        stock_level: searchParams.get("stock_level") ?? "",
        type: searchParams.get("type") ?? "",
        min_inventory_value: searchParams.get("min_inventory_value") ?? "",
        max_inventory_value: searchParams.get("max_inventory_value") ?? "",
        has_staff: searchParams.get("has_staff") ?? "false",
        has_expired_products:
            searchParams.get("has_expired_products") ?? "false",
        min_create_date: searchParams.get("min_create_date") ?? "",
        max_create_date: searchParams.get("max_create_date") ?? "",
        min_update_date: searchParams.get("min_update_date") ?? "",
        max_update_date: searchParams.get("max_update_date") ?? "",
    };
    return !isLoading && isSuccess && data?.length ? (
        <table className="hidden md:table w-full text-left mt-4">
            <thead>
                <tr className="border-b border-gray-300 text-gray-500">
                    <th className="px-2 py-2 font-normal">Branch Name</th>
                    <th className="px-2 py-2 font-normal">Manager Name</th>
                    <th className="px-2 py-2 font-normal">Location</th>
                    <th className="px-2 py-2 font-normal">Status</th>
                    <th className="px-2 py-2 font-normal">Today’s Sales</th>
                    <th className="px-2 py-2 font-normal">Monthly Sales</th>
                    <th className="px-2 py-2 font-normal">Inventory Value</th>
                    <th className="px-2 py-2 font-normal">Low Stock Items</th>
                    <th className="px-2 py-2 font-normal">Last Updated</th>
                    <th className="px-2 py-2 font-normal">Actions</th>
                </tr>
            </thead>
            <tbody>
                {data?.map((item, index) => (
                    <tr
                        key={item.id}
                        className="border-b border-gray-300 hover:bg-gray-50"
                    >
                        <td className="px-2 py-4">
                            {item.name} - {item.branch}
                        </td>
                        <td className="px-2 py-4">{item.manager.name}</td>
                        <td className="px-2 py-4">{item.address}</td>
                        <td className="px-2 py-4">
                            {item.is_active ? "Active" : "Inactive"}
                        </td>
                        <td className="px-2 py-4">{1000}</td>
                        <td className="px-2 py-4">{1000}</td>
                        <td className="px-2 py-4">
                            ${item.current_inventory_value}
                        </td>
                        <td className="px-2 py-4">
                            {item.low_stock_items_count}
                        </td>
                        <td className="px-2 py-4">{item.updated_at}</td>
                        <td className="px-2 py-4 flex flex-wrap gap-2">
                            <Link
                                href={`/dashboard/stores/${item.id}`}
                                className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white"
                            >
                                View
                            </Link>
                            <Link
                                href={`/dashboard/stores/${item.id}/edit`}
                                className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white"
                            >
                                Update
                            </Link>
                            <span
                                onClick={() =>
                                    toggleStoreStatusMutation(item.id)
                                }
                                className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white cursor-pointer"
                            >
                                {item.is_active ? "Disable" : "Enable"}
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    ) : !isLoading && isSuccess && !data?.length ? (
        <p>
            No products{query?.length ? ` matching "${query}"` : ""}
            {filters?.manager?.length ? " managed by that user" : ""}
            {filters?.branch?.length
                ? ` with a "${filters?.branch}" branch`
                : ""}
            {filters?.location?.length ? ` in "${filters?.location}"` : ""}
            {filters?.status?.length ? ` currently "${filters?.status}"` : ""}
            {filters?.stock_level?.length
                ? ` with ${filters?.stock_level?.replaceAll("_", " ")}`
                : ""}
            {filters?.type?.length ? ` that is "${filters?.type}"` : ""}
            {filters?.min_inventory_value?.length &&
            filters?.max_inventory_value?.length
                ? ` with stock value between $${filters?.min_inventory_value} and $${filters?.max_inventory_value}`
                : filters?.min_inventory_value?.length
                ? ` with stock value more than $${filters?.min_inventory_value}`
                : filters?.max_inventory_value?.length
                ? ` with stock value less than $${filters?.max_inventory_value}`
                : ""}
            {filters?.has_staff == "true" ? " has staffs" : ""}
            {filters?.has_expired_products == "true"
                ? " has expired products"
                : ""}
            {filters?.min_create_date?.length &&
            filters?.max_create_date?.length
                ? ` created between ${filters?.min_create_date} and ${filters?.max_create_date}`
                : filters?.min_create_date?.length
                ? ` created after ${filters?.min_create_date}`
                : filters?.max_create_date?.length
                ? ` created before ${filters?.max_create_date}`
                : ""}
            {filters?.min_update_date?.length &&
            filters?.max_update_date?.length
                ? ` updated between ${filters?.min_update_date} and ${filters?.max_update_date}`
                : filters?.min_update_date?.length
                ? ` updated after ${filters?.min_update_date}`
                : filters?.max_update_date?.length
                ? ` updated before ${filters?.max_update_date}`
                : ""}{" "}
            <Link href="/dashboard/stores/add" className="text-[#615cf6]">
                Add new
            </Link>
            ?
        </p>
    ) : (
        <Loader />
    );
}
