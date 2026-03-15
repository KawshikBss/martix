"use client";

import Link from "next/link";
import * as React from "react";
import {
    FaCheckCircle,
    FaFilter,
    FaHourglassHalf,
    FaRecycle,
    FaShoppingCart,
    FaStore,
    FaTruck,
} from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import { MdClear } from "react-icons/md";
import Loader from "@/components/ui/loaders/Loader";
import KpiCard from "@/components/ui/KpiCard";
import {
    FaMoneyBill1Wave,
    FaMoneyBillTransfer,
    FaScaleUnbalanced,
} from "react-icons/fa6";
import { IoCloseCircle } from "react-icons/io5";
import { useSales } from "@/lib/hooks/sales/useSales";
import SalesTable from "./components/SalesTable/SalesTable";
import { SalesList } from "./components/SalesList/SalesList";
import SalesFilterModal from "./components/SalesFilterModal";
import { useSaleMetrics } from "@/lib/hooks/sales/useSaleMetrics";
import { useSalesGraphData } from "@/lib/hooks/sales/useSalesGraphData";
import CustomGraph from "@/components/ui/CustomGraph";
import { GrMoney } from "react-icons/gr";
import { useRevenueGraphData } from "@/lib/hooks/sales/useRevenueGraphData";
import { usePaymentStatusGraphData } from "@/lib/hooks/sales/usePaymentStatusGraphData";
import { useStoreSalesGraphData } from "@/lib/hooks/stores/useStoreSalesGraphData";

export default function AllSales() {
    const { data: saleMetrics } = useSaleMetrics();

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
    } = useSales({ query: query, saleType: "pos", filters: filters });

    const { data: salesGraphData } = useSalesGraphData();
    const cleanSalesGraphData = React.useMemo(() => {
        if (!salesGraphData) return { labels: [], datasets: [] };
        var labels = Object.keys(salesGraphData);
        var data = Object.values(salesGraphData).map(
            (item: any) => item?.total,
        );

        return {
            labels,
            datasets: [
                {
                    data: data,
                    label: "Sales over time",
                },
            ],
        };
    }, [salesGraphData]);

    const { data: revenueGraphData } = useRevenueGraphData();
    const cleanRevenueGraphData = React.useMemo(() => {
        if (!revenueGraphData) return { labels: [], datasets: [] };
        var labels = Object.keys(revenueGraphData);
        var data = Object.values(revenueGraphData) as number[];

        return {
            labels,
            datasets: [
                {
                    data: data,
                    borderColor: ["#00c950", "#ff710e"],
                    borderWidth: 2,
                    backgroundColor: ["#00c950A6", "#ff710eA6"],
                },
            ],
        };
    }, [revenueGraphData]);

    const { data: paymentStatusGraphData } = usePaymentStatusGraphData();
    const cleanPaymentStatusGraphData = React.useMemo(() => {
        if (!paymentStatusGraphData) return { labels: [], datasets: [] };
        var labels = Object.keys(paymentStatusGraphData);
        var data = Object.values(paymentStatusGraphData) as number[];

        return {
            labels,
            datasets: [
                {
                    data: data,
                    borderColor: ["#00c950", "#ff710e", "#f0b50f"],
                    borderWidth: 2,
                    backgroundColor: ["#00c950A6", "#ff710eA6", "#f0b50fA6"],
                },
            ],
        };
    }, [paymentStatusGraphData]);

    const { data: storeSalesGraphData } = useStoreSalesGraphData();
    const cleanStoreSalesGraphData = React.useMemo(() => {
        if (!storeSalesGraphData) return { labels: [], datasets: [] };
        var labels = Object.keys(storeSalesGraphData);
        var data = Object.values(storeSalesGraphData).map(
            (item: any) => item?.total,
        );

        return {
            labels,
            datasets: [
                {
                    data: data,
                    label: "Sales over stores",
                },
            ],
        };
    }, [storeSalesGraphData]);

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
                    icon={<FaTruck className="mr-2 text-xl text-blue-500" />}
                    value={saleMetrics?.total_sales ?? "N/A"}
                />
                <KpiCard
                    title="Total Revenue"
                    icon={
                        <FaMoneyBill1Wave className="mr-2 text-xl text-green-500" />
                    }
                    value={saleMetrics?.net_revenue ?? "N/A"}
                />
                <KpiCard
                    title="Total Transactions"
                    icon={
                        <FaMoneyBillTransfer className="mr-2 text-xl text-teal-500" />
                    }
                    value={saleMetrics?.total_transactions ?? "N/A"}
                />
                <KpiCard
                    title="Avg Sale Value"
                    icon={
                        <FaScaleUnbalanced className="mr-2 text-xl text-amber-500" />
                    }
                    value={saleMetrics?.avg_ticket_value ?? "N/A"}
                />
                <KpiCard
                    title="Refunds"
                    icon={
                        <FaRecycle className="mr-2 text-xl text-orange-500" />
                    }
                    value={saleMetrics?.total_refunded ?? "N/A"}
                />
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
                <CustomGraph
                    title="Sales"
                    icon={<FaShoppingCart />}
                    colspan={2}
                    data={cleanSalesGraphData}
                />
                <CustomGraph
                    title="Revenue Vs Refunds"
                    icon={<GrMoney />}
                    type="pie"
                    data={cleanRevenueGraphData}
                />
                <CustomGraph
                    title="Payment status"
                    icon={<GrMoney />}
                    type="pie"
                    data={cleanPaymentStatusGraphData}
                />
                <CustomGraph
                    title="Store Sales"
                    icon={<FaStore />}
                    type="bar"
                    colspan={2}
                    data={cleanStoreSalesGraphData}
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
