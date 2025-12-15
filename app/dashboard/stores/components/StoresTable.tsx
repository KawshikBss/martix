import Loader from "@/components/ui/loaders/Loader";
import { StoreInterface } from "@/lib/interfaces/StoreIntefrace";
import Link from "next/link";
import * as React from "react";

export interface IStoresTableProps {
    data: StoreInterface[] | undefined;
    isLoading: boolean;
}

export function StoresTable(props: IStoresTableProps) {
    return !props.isLoading ? (
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
                {props.data?.map((item, index) => (
                    <tr
                        key={item.id}
                        className="border-b border-gray-300 hover:bg-gray-50"
                    >
                        <td className="px-2 py-4">{item.name}</td>
                        <td className="px-2 py-4">{item.manager.name}</td>
                        <td className="px-2 py-4">{item.address}</td>
                        <td className="px-2 py-4">
                            {item.is_active ? "Active" : "Inactive"}
                        </td>
                        <td className="px-2 py-4">{1000}</td>
                        <td className="px-2 py-4">{1000}</td>
                        <td className="px-2 py-4">{2000}</td>
                        <td className="px-2 py-4">{(index + 1) * 20}</td>
                        <td className="px-2 py-4">{item.updated_at}</td>
                        <td className="px-2 py-4 flex flex-wrap gap-2">
                            <Link
                                href={"/"}
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
                            <Link
                                href={"/"}
                                className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white"
                            >
                                Disable
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    ) : (
        <Loader />
    );
}
