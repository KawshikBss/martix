"use client";

import DashboardAccordion from "@/components/ui/accordions/DashboardAccordion";
import { InventoryTransferInterface } from "@/lib/interfaces/InventoryTransferInterface";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { BiPackage, BiTransfer } from "react-icons/bi";
import {
    FaBoxes,
    FaCalendarCheck,
    FaCashRegister,
    FaChevronDown,
    FaChevronUp,
    FaClock,
    FaCreditCard,
    FaGlobe,
    FaUser,
} from "react-icons/fa";
import {
    FaBagShopping,
    FaCartShopping,
    FaClockRotateLeft,
    FaRegCalendarDays,
    FaShop,
} from "react-icons/fa6";
import { IoWarning } from "react-icons/io5";

export interface IInventoryTransferListItemProps {
    inventoryTransfer: InventoryTransferInterface;
}

export function InventoryTransferListItem({
    inventoryTransfer,
}: IInventoryTransferListItemProps) {
    return (
        <DashboardAccordion.Container>
            <DashboardAccordion.Header>
                <FaShop className="flex-shrink-0 w-6 h-6 text-gray-400" />
                <div className="flex-1 ml-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-medium text-gray-900">
                                {inventoryTransfer?.transfer_number ?? "N/A"}
                            </h3>
                            <p className="text-xs text-gray-500">
                                {inventoryTransfer?.source_inventory?.store
                                    ?.name ?? "N/A"}
                            </p>
                        </div>

                        <div className="text-right mr-4">
                            <div className={`text-xs font-bold`}>
                                {inventoryTransfer?.status ?? "N/A"}
                            </div>
                            <p className="text-xs text-gray-500">
                                {inventoryTransfer?.destination_inventory?.store
                                    ?.name ?? "N/A"}
                            </p>
                        </div>
                    </div>
                </div>
            </DashboardAccordion.Header>
            <DashboardAccordion.Expanded>
                <DashboardAccordion.Section
                    icon={
                        <FaBagShopping className="w-4 h-4 text-amber-500 mr-2" />
                    }
                    title="Product"
                >
                    <Link
                        href={`/dashboard/products/${inventoryTransfer?.source_inventory?.product?.id}`}
                        className="flex flex-row items-center gap-4"
                    >
                        <Image
                            src={
                                inventoryTransfer?.source_inventory?.product
                                    ?.image_url ??
                                "/images/user-placeholder.jpg"
                            }
                            alt={
                                inventoryTransfer?.source_inventory?.product
                                    ?.name ?? "Profile"
                            }
                            className="rounded-full w-[40px] h-[40px] border object-cover"
                            width={40}
                            height={40}
                        />
                        <span className="text-gray-700">
                            {inventoryTransfer?.source_inventory?.product
                                ?.name ?? "N/A"}
                        </span>
                    </Link>
                </DashboardAccordion.Section>
                <DashboardAccordion.Section
                    icon={<FaUser className="w-4 h-4 text-blue-500 mr-2" />}
                    title="Performed By"
                >
                    <Link
                        href="/dashboard/profile"
                        className="flex flex-row items-center gap-4"
                    >
                        <Image
                            src={
                                inventoryTransfer?.created_by?.image_url ??
                                "/images/user-placeholder.jpg"
                            }
                            alt={
                                inventoryTransfer?.created_by?.name ?? "Profile"
                            }
                            className="rounded-full w-[40px] h-[40px] border object-cover"
                            width={40}
                            height={40}
                        />
                        <span className="text-gray-700">
                            {inventoryTransfer?.created_by?.name ?? "N/A"}
                        </span>
                    </Link>
                </DashboardAccordion.Section>
                <DashboardAccordion.Section
                    icon={<FaBoxes className="w-4 h-4 text-green-500 mr-2" />}
                    title="Total Quantity"
                >
                    {inventoryTransfer?.destination_inventory?.quantity ??
                        "N/A"}
                </DashboardAccordion.Section>
                <DashboardAccordion.Section
                    icon={<FaClock className="w-4 h-4 text-gray-500 mr-2" />}
                    title="Date Initiated"
                >
                    {inventoryTransfer?.created_at
                        ? new Date(
                              inventoryTransfer?.created_at,
                          ).toLocaleDateString()
                        : "N/A"}
                </DashboardAccordion.Section>

                <div className="mt-4 flex flex-wrap gap-2">
                    <Link
                        href={`/`}
                        className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white"
                    >
                        View
                    </Link>
                </div>
            </DashboardAccordion.Expanded>
        </DashboardAccordion.Container>
    );
}
