import { StoreInterface } from "@/lib/interfaces/StoreIntefrace";
import Link from "next/link";
import * as React from "react";
import { BiPackage } from "react-icons/bi";
import {
    FaCashRegister,
    FaChevronDown,
    FaChevronUp,
    FaCreditCard,
    FaGlobe,
} from "react-icons/fa";
import {
    FaCartShopping,
    FaClockRotateLeft,
    FaRegCalendarDays,
    FaShop,
} from "react-icons/fa6";
import { IoWarning } from "react-icons/io5";

export interface IStoresListItemProps {
    store: StoreInterface;
}

export function StoresListItem({ store }: IStoresListItemProps) {
    const [isExpanded, setIsExpanded] = React.useState(false);
    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-3">
            {/* Collapsed View */}
            <div
                className="flex items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={toggleExpanded}
            >
                <FaShop className="flex-shrink-0 w-6 h-6 text-gray-400" />
                <div className="flex-1 ml-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-medium text-gray-900">
                                {store.name}
                            </h3>
                            <p className="text-xs text-gray-500">
                                {store?.branch}
                            </p>
                        </div>

                        <div className="text-right mr-4">
                            <div
                                className={`text-xs font-bold ${
                                    store?.is_active
                                        ? "text-red-600"
                                        : "text-green-600"
                                }`}
                            >
                                {store?.is_active ? "Inactive" : "Active"}
                            </div>
                            <div className="text-xs text-gray-400">
                                {store?.manager?.name}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Expand Icon */}
                <button className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-full transition-colors">
                    {isExpanded ? (
                        <FaChevronUp className="w-4 h-4 text-gray-400" />
                    ) : (
                        <FaChevronDown className="w-4 h-4 text-gray-400" />
                    )}
                </button>
            </div>

            {/* Expanded View */}
            {isExpanded && (
                <div className="px-4 pb-4 border-t border-gray-100">
                    <div className="pt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-50 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center">
                                    <FaCashRegister className="w-4 h-4 text-green-500 mr-2" />
                                    <span className="text-lg font-bold text-gray-700">
                                        Today's Sales
                                    </span>
                                </div>
                            </div>
                            <div className={`text-sm font-medium`}>${1000}</div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center">
                                    <FaRegCalendarDays className="w-4 h-4 text-orange-500 mr-2" />
                                    <span className="text-lg font-bold text-gray-700">
                                        Monthly Sales
                                    </span>
                                </div>
                            </div>
                            <div className={`text-sm font-medium`}>${1000}</div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center">
                                    <BiPackage className="w-4 h-4 text-blue-500 mr-2" />
                                    <span className="text-sm font-medium text-gray-700">
                                        Inventory Value
                                    </span>
                                </div>
                            </div>
                            <div className={`text-lg font-bold`}>
                                ${store?.current_inventory_value}
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center">
                                    <IoWarning className="w-4 h-4 text-red-500 mr-2" />
                                    <span className="text-sm font-medium text-gray-700">
                                        Low Stock Items
                                    </span>
                                </div>
                            </div>
                            <div className={`text-lg font-bold`}>
                                {store?.low_stock_items_count}
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center">
                                    <FaClockRotateLeft className="w-4 h-4 text-gray-500 mr-2" />
                                    <span className="text-lg font-bold text-gray-700">
                                        Last Updated
                                    </span>
                                </div>
                            </div>
                            <div className={`text-sm font-medium`}>
                                {store?.updated_at}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-4 flex flex-wrap gap-2">
                            <Link
                                href={"/"}
                                className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white"
                            >
                                View
                            </Link>
                            <Link
                                href={"/"}
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
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
