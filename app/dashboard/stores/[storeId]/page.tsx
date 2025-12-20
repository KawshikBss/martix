"use client";

import KpiCard from "@/components/ui/KpiCard";
import { useStore } from "@/lib/hooks/stores/useStore";
import { useToggleStoreStatus } from "@/lib/hooks/stores/useToggleStoreStatus";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { FaBoxes, FaPhone, FaUsers } from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";
import { MdEmail, MdWarning } from "react-icons/md";
import { toast } from "react-toastify";

type Props = {};

const SingleStore = (props: Props) => {
    const { storeId } = useParams();
    const { data: store } = useStore(storeId?.toString());
    const { back } = useRouter();
    const { mutateAsync: toggleStoreStatusMutation } = useToggleStoreStatus();
    const queryClient = useQueryClient();
    const onDisableStore = async () => {
        const res = await toggleStoreStatusMutation(storeId?.toString());
        if (res && res.message) {
            toast.success(res.message);
        }
        queryClient.invalidateQueries({ queryKey: ["store", storeId] });
    };

    return (
        <main className="p-4 md:p-8">
            <div className="w-full bg-white rounded-2xl shadow-md p-4 md:p-6 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
                <div className="flex flex-row justify-start items-center gap-2">
                    <h3 className="text-2xl font-medium">
                        {store?.name ?? "N/A"}
                    </h3>
                    <div
                        className={`w-4 h-4 ms-4 rounded-full bg-${
                            store?.is_active ? "green-500" : "red-400"
                        }`}
                    />
                    <span className="text-md font-regular text-gray-700">
                        {store?.is_active ? "Active" : "Inactive"}
                    </span>
                </div>
                <div className="flex flex-row gap-4">
                    <button
                        onClick={back}
                        className="bg-transparent hover:bg-gray-500 text-gray-500 hover:text-white border border-gray-500 px-2 py-1 rounded-md cursor-pointer mr-2"
                    >
                        Go Back
                    </button>
                    <button
                        onClick={onDisableStore}
                        className="bg-blue-500 hover:bg-transparent text-white hover:text-blue-500 border border-blue-500 px-2 py-1 rounded-md cursor-pointer mr-2"
                    >
                        {store?.is_active ? "Disable" : "Enable"}
                    </button>
                    <Link
                        href={`/dashboard/stores/${storeId}/edit`}
                        className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md"
                    >
                        Edit Store
                    </Link>
                </div>
            </div>

            <div className="w-full mt-6 grid grid-cols-1 md:grid-cols-6 gap-6">
                <div className="col-span-1 md:col-span-4 bg-white rounded-2xl shadow-md p-4 md:p-6 flex flex-col md:flex-row justify-start items-start gap-6">
                    <div className="w-full md:w-1/2 h-full aspect-video rounded-2xl border border-gray-200 overflow-hidden">
                        <Image
                            src={
                                store?.image_url ??
                                "/images/user-placeholder.jpg"
                            }
                            alt={store?.name ?? "N/A"}
                            width={300}
                            height={300}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <h3 className="text-2xl font-bold mb-2">
                            {store?.branch ?? "N/A"}
                        </h3>
                        <h5 className="text-lg text-gray-500 mb-4">
                            {store?.type ?? "N/A"}
                        </h5>
                        <p className="text-lg text-gray-700 mb-6">
                            {"[ "}
                            {store?.unique_id ?? "N/A"}
                            {" ]"}
                        </p>
                        <p className="text-sm text-gray-700 mb-4">
                            <FaLocationPin className="text-blue-600 text-lg inline me-2" />
                            {store?.address ?? "N/A"}
                        </p>
                        <p className="text-sm text-gray-700 mb-6">
                            <FaLocationPin className="text-blue-600 text-lg inline me-2" />
                            {store?.address_2 ?? "N/A"}
                        </p>
                        <div className="flex flex-col md:flex-row justify-start items-start md:items-center gap-2 md:gap-4">
                            <p className="text-gray-700">
                                <FaPhone className="text-blue-600 text-lg inline me-2" />
                                {store?.phone ?? "N/A"}
                            </p>
                            <p className="text-gray-700">
                                <MdEmail className="text-blue-600 text-lg inline me-2" />
                                {store?.email ?? "N/A"}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-span-1 md:col-span-2 bg-white rounded-2xl shadow-md p-4 md:p-6">
                    <h3 className="text-2xl font-bold mb-2">Owner</h3>
                    <div className="mb-4">
                        <Link
                            href="/dashboard/profile"
                            className="flex flex-row items-center gap-4"
                        >
                            <Image
                                src={
                                    store?.owner?.image_url ??
                                    "/images/user-placeholder.jpg"
                                }
                                alt={store?.owner?.name ?? "Profile"}
                                className="rounded-full w-[40px] h-[40px] object-cover mb-4"
                                width={40}
                                height={40}
                            />
                            <span className="ms-2 text-gray-700 font-semibold">
                                {store?.owner.name}
                            </span>
                        </Link>
                        <p className="text-gray-700 mb-2">
                            <FaPhone className="text-blue-600 text-lg inline me-2" />
                            {store?.owner?.phone ?? "N/A"}
                        </p>
                        <p className="text-gray-700">
                            <MdEmail className="text-blue-600 text-lg inline me-2" />
                            {store?.owner?.email ?? "N/A"}
                        </p>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Manager</h3>
                    <div className="mb-4">
                        <Link
                            href="/dashboard/profile"
                            className="flex flex-row items-center gap-4"
                        >
                            <Image
                                src={
                                    store?.manager?.image_url ??
                                    "/images/user-placeholder.jpg"
                                }
                                alt={store?.manager?.name ?? "Profile"}
                                className="rounded-full w-[40px] h-[40px] object-cover mb-4"
                                width={40}
                                height={40}
                            />
                            <span className="ms-2 text-gray-700 font-semibold">
                                {store?.manager.name}
                            </span>
                        </Link>
                        <p className="text-gray-700 mb-2">
                            <FaPhone className="text-blue-600 text-lg inline me-2" />
                            {store?.manager?.phone ?? "N/A"}
                        </p>
                        <p className="text-gray-700">
                            <MdEmail className="text-blue-600 text-lg inline me-2" />
                            {store?.manager?.email ?? "N/A"}
                        </p>
                    </div>
                </div>
            </div>
            <div className="my-6 w-full flex flex-col md:flex-row justify-between gap-4">
                <KpiCard
                    title="Total Stock Items"
                    icon={<FaBoxes className="mr-2 text-xl text-green-500" />}
                    value={store?.current_inventory_count ?? "N/A"}
                />
                <KpiCard
                    title="Total Stock Value"
                    icon={<FaBoxes className="mr-2 text-xl text-orange-500" />}
                    value={store?.current_inventory_value ?? "N/A"}
                />
                <KpiCard
                    title="Low Stock Items"
                    icon={
                        <MdWarning className="mr-2 text-xl text-yellow-500" />
                    }
                    value={store?.low_stock_items_count ?? "N/A"}
                />
                <KpiCard
                    title="Staff Count"
                    icon={<FaUsers className="mr-2 text-xl text-blue-500" />}
                    value={store?.staff?.length ?? "N/A"}
                />
            </div>
            <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 my-6">
                <h3 className="text-2xl font-bold mb-8">Inventory</h3>

                <div className="flex flex-col gap-4">
                    {store?.inventories?.map((inventory) => (
                        <div className="w-full flex flex-col md:flex-row md:justify-between items-start md:items-center gap-2">
                            <Link
                                href="/dashboard/products"
                                className="flex flex-row items-center gap-4"
                            >
                                <Image
                                    src={
                                        inventory?.product?.image_url ??
                                        "/images/user-placeholder.jpg"
                                    }
                                    alt={inventory?.product?.name ?? "Profile"}
                                    className="rounded-full w-[40px] h-[40px] object-cover"
                                    width={40}
                                    height={40}
                                />
                                <span className="text-gray-700 font-semibold">
                                    {inventory?.product?.name ?? "N/A"}
                                </span>
                            </Link>
                            <span className="text-gray-700 font-semibold me-1">
                                {"[ "}
                                {inventory?.barcode ?? "N/A"}
                                {" ]"}
                            </span>
                            <span className="text-gray-700">
                                <span className="font-semibold">Quantity:</span>{" "}
                                {inventory?.quantity ?? "N/A"} units
                            </span>
                            <span className="text-gray-700">
                                <span className="font-semibold">
                                    Selling Price:
                                </span>{" "}
                                ${inventory?.selling_price ?? "N/A"}
                            </span>
                            <span className="text-gray-700">
                                <span className="font-semibold">
                                    Expires At:
                                </span>{" "}
                                {inventory?.expiry_date ?? "N/A"}
                            </span>
                            <div className="flex flex-row items-center gap-4 md:gap-2">
                                <Link
                                    href={`/dashboard/stores/${inventory.id}/edit`}
                                    className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white"
                                >
                                    View
                                </Link>
                                <Link
                                    href={`/dashboard/stores/${inventory.id}/edit`}
                                    className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white"
                                >
                                    Update
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 my-6">
                <h3 className="text-2xl font-bold mb-2">Manager</h3>
                <p className="text-gray-700 font-semibold mb-6">
                    {store?.manager.name}
                </p>
                <h3 className="text-2xl font-bold mb-2">
                    People in This Store
                </h3>
                {store?.staff?.length ? (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {store?.staff?.map((staff) => (
                            <div className="col-span-1 rounded-2xl shadow-xl p-4">
                                <Link
                                    href="/dashboard/profile"
                                    className="flex flex-row items-center gap-4 mb-6"
                                >
                                    <Image
                                        src={
                                            staff?.user?.image_url ??
                                            "/images/user-placeholder.jpg"
                                        }
                                        alt={staff?.user?.name ?? "Profile"}
                                        className="rounded-full w-[60px] h-[60px] object-cover"
                                        width={60}
                                        height={60}
                                    />
                                    <span className="ms-2 text-gray-700 font-semibold">
                                        {staff?.user.name}
                                    </span>
                                </Link>
                                <div className="text-white bg-blue-500 px-4 py-0.5 w-fit rounded-full mb-4">
                                    {staff?.role?.name ?? "N/A"}
                                </div>
                                <div className="flex flex-row justify-start items-center gap-2 mb-4">
                                    <div
                                        className={`w-4 h-4 rounded-full bg-${
                                            staff?.user?.status == "active"
                                                ? "green-500"
                                                : "red-400"
                                        }`}
                                    />
                                    <span className="text-md font-regular text-gray-700">
                                        {staff?.user?.status == "active"
                                            ? "Active"
                                            : "Inactive"}
                                    </span>
                                </div>
                                <p className="text-gray-700 mb-2">
                                    <FaPhone className="text-blue-600 text-lg inline me-2" />
                                    {staff?.user?.phone ?? "N/A"}
                                </p>
                                <p className="text-gray-700">
                                    <MdEmail className="text-blue-600 text-lg inline me-2" />
                                    {staff?.user?.email ?? "N/A"}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-700 text-xl">No staff yet</p>
                )}
            </div>
        </main>
    );
};

export default SingleStore;
