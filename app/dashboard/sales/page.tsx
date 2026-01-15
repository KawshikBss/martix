"use client";

import Link from "next/link";
import * as React from "react";
import {
    FaCheckCircle,
    FaFilter,
    FaHourglassHalf,
    FaRecycle,
    FaTruck,
} from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import { MdClear } from "react-icons/md";
import Loader from "@/components/ui/loaders/Loader";
import KpiCard from "@/components/ui/KpiCard";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { IoCloseCircle } from "react-icons/io5";
import { useSales } from "@/lib/hooks/sales/useSales";
import SalesTable from "./components/SalesTable";
import { SalesList } from "./components/SalesList/SalesList";
import SalesFilterModal from "./components/SalesFilterModal";

export default function Products() {
    const [query, setQuery] = React.useState<string>("");
    const onQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };
    const clearQuery = () => setQuery("");

    const [showFilterModal, setShowFilterModal] =
        React.useState<boolean>(false);

    const openFilterModal = () => setShowFilterModal(true);
    const closeFilterModal = () => setShowFilterModal(false);

    const searchParams = useSearchParams();

    const filters = {
        store: searchParams.get("store") ?? "",
        user: searchParams.get("user") ?? "",
        payment_status: searchParams.get("payment_status") ?? "",
        status: searchParams.get("status") ?? "",
        min_order_value: searchParams.get("min_order_value") ?? "",
        max_order_value: searchParams.get("max_order_value") ?? "",
        min_create_date: searchParams.get("min_create_date") ?? "",
        max_create_date: searchParams.get("max_create_date") ?? "",
        min_update_date: searchParams.get("min_update_date") ?? "",
        max_update_date: searchParams.get("max_update_date") ?? "",
    };

    const {
        data: sales,
        isLoading: salesIsLoading,
        isFetchingNextPage: salesIsFetching,
        isSuccess: salesIsSuccess,
        hasNextPage: salesHasNextPage,
        fetchNextPage: fetchNextSales,
    } = useSales({ query: query, filters: filters });

    return (
        <main className="p-4 md:p-8">
            <div className="bg-white rounded-2xl shadow-md p-4 md:p-6">
                <div className="w-full flex flex-row justify-between items-center">
                    <h3 className="text-2xl font-medium">Sales</h3>
                    <Link
                        href="/dashboard/sales/quick"
                        className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md"
                    >
                        + New Sale
                    </Link>
                </div>
            </div>
            <div className="my-6 w-full flex flex-col md:flex-row justify-between gap-4">
                <KpiCard
                    title="Total Sales"
                    icon={
                        <FaMoneyBill1Wave className="mr-2 text-xl text-green-500" />
                    }
                    value="$ 10,000"
                />
                <KpiCard
                    title="Total Orders"
                    icon={<FaTruck className="mr-2 text-xl text-blue-500" />}
                    value="+ 10,000"
                />
                <KpiCard
                    title="Total Paid"
                    icon={
                        <FaCheckCircle className="mr-2 text-xl text-teal-500" />
                    }
                    value="+ 10,000"
                />
                <KpiCard
                    title="Total Pending"
                    icon={
                        <FaHourglassHalf className="mr-2 text-xl text-yellow-500" />
                    }
                    value="+ 10,000"
                />
                <KpiCard
                    title="Refunds"
                    icon={
                        <FaRecycle className="mr-2 text-xl text-orange-500" />
                    }
                    value="+ 10,000"
                />
                <KpiCard
                    title="Cancelled"
                    icon={
                        <IoCloseCircle className="mr-2 text-xl text-red-500" />
                    }
                    value="- 10,000"
                />
            </div>
            <div className="bg-white rounded-2xl shadow-md p-4 md:p-6">
                <div className="flex flex-row justify-between mb-6">
                    <input
                        value={query}
                        onChange={onQueryChange}
                        type="text"
                        placeholder="Search sales..."
                        className="border border-gray-300 rounded-md px-2 py-1 w-full"
                    />
                    {query?.length ? (
                        <button
                            onClick={clearQuery}
                            className="ms-2 md:ms-4 bg-red-400 hover:bg-transparent text-white hover:text-red-400 border border-red-400 px-2 py-1 rounded-md"
                        >
                            <MdClear />
                        </button>
                    ) : (
                        ""
                    )}
                    <button
                        onClick={openFilterModal}
                        className="ms-2 md:ms-4 bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md"
                    >
                        <FaFilter />
                    </button>
                </div>

                <SalesTable data={sales} />
                <SalesList data={sales} />

                {salesIsLoading || salesIsFetching ? (
                    <Loader />
                ) : !salesIsLoading &&
                  !salesIsFetching &&
                  salesIsSuccess &&
                  !sales?.pages?.[0].total ? (
                    <p>
                        No sales{query?.length ? ` matching "${query}"` : ""}
                        {filters?.store?.length ? " from that store" : ""}
                        {filters?.user?.length ? " by that user" : ""}
                        {filters?.min_order_value?.length
                            ? ` more than $${filters?.min_order_value}`
                            : ""}
                        {filters?.max_order_value?.length
                            ? ` less than $${filters?.max_order_value}`
                            : ""}
                        {filters?.status?.length
                            ? ` currently "${filters?.status}"`
                            : ""}
                        {filters?.payment_status?.length
                            ? ` "${filters?.payment_status}"`
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
                        <Link
                            href="/dashboard/sales/quick"
                            className="text-[#615cf6]"
                        >
                            Create first sale
                        </Link>
                        ?
                    </p>
                ) : salesHasNextPage ? (
                    <div
                        onClick={() => fetchNextSales()}
                        className="bg-[#615cf6] hover:bg-transparent cursor-pointer text-white hover:text-[#615cf6] border border-[#615cf6] px-4 py-1 rounded-full w-fit mx-auto mt-4"
                    >
                        See More
                    </div>
                ) : (
                    ""
                )}
            </div>
            <SalesFilterModal
                show={showFilterModal}
                onClose={closeFilterModal}
            />
        </main>
    );
}
