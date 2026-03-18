"use client";

import * as React from "react";
import KpiCard from "@/components/ui/KpiCard";
import {
    FaBoxes,
    FaCashRegister,
    FaChartBar,
    FaCheck,
    FaFilter,
    FaStore,
} from "react-icons/fa";
import { TiWarning } from "react-icons/ti";
import { StoresList } from "./components/StoresList/StoresList";
import { StoresTable } from "./components/StoresTable";
import Link from "next/link";
import { useStores } from "@/lib/hooks/stores/useStores";
import StoresFilterModal from "./components/StoresFilterModal";
import { useSearchParams } from "next/navigation";
import { MdClear } from "react-icons/md";
import Loader from "@/components/ui/loaders/Loader";
import { useStoreMetrics } from "@/lib/hooks/stores/useStoreMetrics";
import { useStoreSalesGraphData } from "@/lib/hooks/stores/useStoreSalesGraphData";
import CustomGraph from "@/components/ui/CustomGraph";
import { useStoreStocksGraphData } from "@/lib/hooks/stores/useStoreStocksGraphData";
import { useStoreTransfersGraphData } from "@/lib/hooks/stores/useStoreTransfersGraphData";
import { BiTransfer } from "react-icons/bi";
import AddMemberModal from "./components/AddMemberModal";
import { StoreInterface } from "@/lib/interfaces/StoreIntefrace";

export default function BranchOverview() {
    const { data: storeMetrics } = useStoreMetrics();

    const [query, setQuery] = React.useState<string>("");
    const onQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };
    const clearQuery = () => setQuery("");

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
        has_low_stock: searchParams.get("has_low_stock") ?? "false",
        has_expired_products:
            searchParams.get("has_expired_products") ?? "false",
        has_soon_expiring_products:
            searchParams.get("has_soon_expiring_products") ?? "false",
        min_create_date: searchParams.get("min_create_date") ?? "",
        max_create_date: searchParams.get("max_create_date") ?? "",
        min_update_date: searchParams.get("min_update_date") ?? "",
        max_update_date: searchParams.get("max_update_date") ?? "",
    };

    const {
        data: stores,
        isLoading: storesIsLoading,
        isFetchingNextPage: storesIsFetching,
        isSuccess: storesIsSuccess,
        hasNextPage: storesHasNextPage,
        fetchNextPage: fetchNextStores,
    } = useStores({
        query,
        filters,
    });

    const [showFilterModal, setShowFilterModal] =
        React.useState<boolean>(false);

    const openFilterModal = () => setShowFilterModal(true);
    const closeFilterModal = () => setShowFilterModal(false);

    const [selectedMemberStore, setSelectedMemberStore] = React.useState<
        StoreInterface | undefined
    >(undefined);

    const [showMemberModal, setShowMemberModal] =
        React.useState<boolean>(false);

    const openMemberModal = (store?: StoreInterface) => {
        setSelectedMemberStore(store);
        setShowMemberModal(true);
    };
    const closeMemberModal = () => setShowMemberModal(false);

    const { data: salesGraphData } = useStoreSalesGraphData();
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
                    label: "Sales this month",
                },
            ],
        };
    }, [salesGraphData]);

    const { data: stocksGraphData } = useStoreStocksGraphData();
    const cleanStocksGraphData = React.useMemo(() => {
        if (!stocksGraphData) return { labels: [], datasets: [] };
        var labels = Object.keys(stocksGraphData);
        var data = Object.values(stocksGraphData).map(
            (item: any) => item?.quantity,
        );

        return {
            labels,
            datasets: [
                {
                    data: data,
                    label: "Stocks this month",
                },
            ],
        };
    }, [salesGraphData]);

    const { data: transfersGraphData } = useStoreTransfersGraphData();
    const cleanTransfersGraphData = React.useMemo(() => {
        if (!transfersGraphData) return { labels: [], datasets: [] };
        var labels = [] as string[];
        var data = [] as number[];

        Object.entries(transfersGraphData).forEach((entry: any) => {
            var source = entry[0];
            var transfers = entry[1];
            Object.entries(transfers).forEach((transferEntry: any) => {
                labels.push(`${source} - ${transferEntry[0]}`);
                data.push(transferEntry[1].count);
            });
        });

        return {
            labels,
            datasets: [
                {
                    data: data,
                    label: "Transfers this month",
                },
            ],
        };
    }, [transfersGraphData]);

    return (
        <main className="p-4 md:p-8">
            <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 w-full flex flex-row justify-between items-center">
                <h3 className="text-2xl font-medium">Store Overview</h3>
                <Link
                    href="/dashboard/stores/add"
                    className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md"
                >
                    Add Store
                </Link>
            </div>
            <div className="my-6 w-full flex flex-col md:flex-row justify-between gap-4">
                <KpiCard
                    title="Total Branches"
                    icon={<FaStore className="mr-2 text-xl text-blue-500" />}
                    value={storeMetrics?.total_stores ?? "None"}
                />
                <KpiCard
                    title="Active Stores"
                    icon={<FaCheck className="mr-2 text-xl text-green-500" />}
                    value={storeMetrics?.active_stores ?? "None"}
                />
                <KpiCard
                    title="Inactive Stores"
                    icon={
                        <TiWarning className="mr-2 text-xl text-orange-500" />
                    }
                    value={storeMetrics?.inactive_stores ?? "None"}
                />
                <KpiCard
                    title="Avg Stock"
                    icon={<FaBoxes className="mr-2 text-xl text-gray-500" />}
                    value={
                        storeMetrics?.average_inventory_per_store ?? "0 units"
                    }
                />
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                <CustomGraph
                    title="Stocks by Branch"
                    type="bar"
                    icon={<FaChartBar />}
                    data={cleanStocksGraphData}
                />
                <CustomGraph
                    title="Transfers by Branch"
                    type="bar"
                    icon={<BiTransfer />}
                    data={cleanTransfersGraphData}
                />
            </div>

            <div className="w-full grid grid-cols-1 gap-6 my-6">
                <CustomGraph
                    title="Sales by Branch"
                    type="bar"
                    icon={<FaCashRegister />}
                    data={cleanSalesGraphData}
                />
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="text-2xl font-medium">Stores</h3>
                <div className="my-6 flex flex-row justify-between">
                    <input
                        value={query}
                        onChange={onQueryChange}
                        type="text"
                        placeholder="Search products..."
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
                <StoresTable data={stores} handleAddMember={openMemberModal} />
                <StoresList data={stores} handleAddMember={openMemberModal} />
                {storesIsLoading || storesIsFetching ? (
                    <Loader />
                ) : !storesIsLoading &&
                  !storesIsFetching &&
                  storesIsSuccess &&
                  !stores?.pages?.[0].total ? (
                    <p>
                        No stores{query?.length ? ` matching "${query}"` : ""}
                        {filters?.manager?.length
                            ? " managed by that user"
                            : ""}
                        {filters?.branch?.length
                            ? ` with a "${filters?.branch}" branch`
                            : ""}
                        {filters?.location?.length
                            ? ` in "${filters?.location}"`
                            : ""}
                        {filters?.status?.length
                            ? ` currently "${filters?.status}"`
                            : ""}
                        {filters?.stock_level?.length
                            ? ` with ${filters?.stock_level?.replaceAll(
                                  "_",
                                  " ",
                              )}`
                            : ""}
                        {filters?.type?.length
                            ? ` that is "${filters?.type}"`
                            : ""}
                        {filters?.min_inventory_value?.length &&
                        filters?.max_inventory_value?.length
                            ? ` with stock value between $${filters?.min_inventory_value} and $${filters?.max_inventory_value}`
                            : filters?.min_inventory_value?.length
                              ? ` with stock value more than $${filters?.min_inventory_value}`
                              : filters?.max_inventory_value?.length
                                ? ` with stock value less than $${filters?.max_inventory_value}`
                                : ""}
                        {filters?.has_staff == "true" ? " has staffs" : ""}
                        {filters?.has_low_stock == "true"
                            ? " has low stock"
                            : ""}
                        {filters?.has_expired_products == "true"
                            ? " has expired products"
                            : ""}
                        {filters?.has_soon_expiring_products == "true"
                            ? " has products expiring soon"
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
                            href="/dashboard/stores/add"
                            className="text-[#615cf6]"
                        >
                            Add new
                        </Link>
                        ?
                    </p>
                ) : storesHasNextPage ? (
                    <div
                        onClick={() => fetchNextStores()}
                        className="bg-[#615cf6] hover:bg-transparent cursor-pointer text-white hover:text-[#615cf6] border border-[#615cf6] px-4 py-1 rounded-full w-fit mx-auto mt-4"
                    >
                        See More
                    </div>
                ) : (
                    ""
                )}
            </div>
            <StoresFilterModal
                show={showFilterModal}
                onClose={closeFilterModal}
            />
            <AddMemberModal
                store={selectedMemberStore}
                show={showMemberModal}
                onClose={closeMemberModal}
            />
        </main>
    );
}
