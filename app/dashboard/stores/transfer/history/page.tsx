"use client";

import KpiCard from "@/components/ui/KpiCard";
import { useInventoryTransfers } from "@/lib/hooks/inventories/useInventoryTransfers";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import {
    FaBoxes,
    FaCheckSquare,
    FaFilter,
    FaHourglassHalf,
    FaSearchDollar,
} from "react-icons/fa";
import { MdClear, MdTrackChanges } from "react-icons/md";
import { TbTransferVertical } from "react-icons/tb";
import { InventoryTransferTable } from "./components/InventoryTransferTable";
import Loader from "@/components/ui/loaders/Loader";
import InventoryTransfersFilterModal from "./components/InventoryTransfersFilterModal";
import { InventoryTransferList } from "./components/InventoryTransferList/InventoryTransferList";
import { useInventoryTransferMetrics } from "@/lib/hooks/inventories/useInventoryTransferMetrics";
import { useInventoryTransfersByStoresGraphData } from "@/lib/hooks/inventories/useInventoryTransfersByStoresGraphData";
import CustomGraph from "@/components/ui/CustomGraph";
import { GrTransaction } from "react-icons/gr";
import { useInventoryTransferLevelsGraphData } from "@/lib/hooks/inventories/useInventoryTransferLevelsGraphData";

type Props = {};

const StockTransferHistory = (props: Props) => {
    const { data: inventoryTransferMetrics } = useInventoryTransferMetrics();

    const [query, setQuery] = React.useState<string>("");
    const onQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };
    const clearQuery = () => setQuery("");

    const searchParams = useSearchParams();
    const filters = {
        store: searchParams.get("store") ?? "",
        product: searchParams.get("product") ?? "",
        user: searchParams.get("user") ?? "",
        status: searchParams.get("status") ?? "",
        min_create_date: searchParams.get("min_create_date") ?? "",
        max_create_date: searchParams.get("max_create_date") ?? "",
        min_update_date: searchParams.get("min_update_date") ?? "",
        max_update_date: searchParams.get("max_update_date") ?? "",
    };

    const {
        data: inventoryTransfers,
        isLoading: inventoryTransfersIsLoading,
        isFetchingNextPage: inventoryTransfersIsFetching,
        isSuccess: inventoryTransfersIsSuccess,
        hasNextPage: inventoryTransfersHasNextPage,
        fetchNextPage: fetchNextInventoryTransfers,
    } = useInventoryTransfers({ query: query, filters: filters });

    const [showFilterModal, setShowFilterModal] =
        React.useState<boolean>(false);

    const openFilterModal = () => setShowFilterModal(true);
    const closeFilterModal = () => setShowFilterModal(false);

    const { data: transferStoresGraphData } =
        useInventoryTransfersByStoresGraphData();
    const cleanTransferStoresGraphData = React.useMemo(() => {
        if (!transferStoresGraphData) return { labels: [], datasets: [] };
        var labels = Object.keys(transferStoresGraphData);
        var data = Object.values(transferStoresGraphData).map(
            (item: any) => item.count,
        );

        return {
            labels,
            datasets: [
                {
                    data: data,
                    label: "Total transfers",
                },
            ],
        };
    }, [transferStoresGraphData]);

    const { data: transferLevelsGraphData } =
        useInventoryTransferLevelsGraphData();
    const cleanTransferLevelsGraphData = React.useMemo(() => {
        if (!transferLevelsGraphData) return { labels: [], datasets: [] };
        var labels = Object.keys(transferLevelsGraphData);
        var data = Object.values(transferLevelsGraphData).map(
            (item: any) => item.count,
        );

        return {
            labels,
            datasets: [
                {
                    data: data,
                    label: "Transfers over time",
                },
            ],
        };
    }, [transferLevelsGraphData]);
    return (
        <main className="p-4 md:p-8">
            <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 w-full flex flex-row justify-between items-center">
                <h3 className="text-2xl font-medium">Stock Transfers</h3>
                <Link
                    href="/dashboard/stores/transfer"
                    className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md"
                >
                    + New Transfer
                </Link>
            </div>
            <div className="my-6 w-full flex flex-col md:flex-row justify-between gap-4">
                <KpiCard
                    title="Total Transfers"
                    icon={
                        <TbTransferVertical className="mr-2 text-xl text-blue-500" />
                    }
                    value={inventoryTransferMetrics?.total_transfers ?? 0}
                />
                <KpiCard
                    title="Completed"
                    icon={
                        <FaCheckSquare className="mr-2 text-xl text-green-500" />
                    }
                    value={inventoryTransferMetrics?.total_completed ?? 0}
                />
                <KpiCard
                    title="Pending"
                    icon={
                        <FaHourglassHalf className="mr-2 text-xl text-gray-500" />
                    }
                    value={inventoryTransferMetrics?.total_pending ?? 0}
                />
                <KpiCard
                    title="Units Moved"
                    icon={<FaBoxes className="mr-2 text-xl text-amber-500" />}
                    value={
                        inventoryTransferMetrics?.total_transfers_quantity ?? 0
                    }
                />
                <KpiCard
                    title="Total Transfers Value"
                    icon={
                        <FaSearchDollar className="mr-2 text-xl text-green-500" />
                    }
                    value={inventoryTransferMetrics?.total_transfers_value ?? 0}
                />
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                <CustomGraph
                    title="Transfers"
                    icon={<MdTrackChanges />}
                    data={cleanTransferLevelsGraphData}
                />
                <CustomGraph
                    title="Transfers by store"
                    icon={<GrTransaction />}
                    type="bar"
                    data={cleanTransferStoresGraphData}
                />
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="text-2xl font-medium">Transfer History</h3>
                <div className="my-6 flex flex-row justify-between">
                    <input
                        value={query}
                        onChange={onQueryChange}
                        type="text"
                        placeholder="Search transfers..."
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
                <InventoryTransferTable data={inventoryTransfers} />
                <InventoryTransferList data={inventoryTransfers} />
                {inventoryTransfersIsLoading || inventoryTransfersIsFetching ? (
                    <Loader />
                ) : !inventoryTransfersIsLoading &&
                  !inventoryTransfersIsFetching &&
                  inventoryTransfersIsSuccess &&
                  !inventoryTransfers?.pages?.[0].total ? (
                    <p>
                        No inventory transfers
                        {query?.length ? ` matching "${query}"` : ""}
                        {filters?.user?.length ? " performed by that user" : ""}
                        {filters?.store?.length ? ` in that store` : ""}
                        {filters?.product?.length ? ` for that product` : ""}
                        {filters?.status?.length
                            ? ` currently "${filters?.status}"`
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
                ) : inventoryTransfersHasNextPage ? (
                    <div
                        onClick={() => fetchNextInventoryTransfers()}
                        className="bg-[#615cf6] hover:bg-transparent cursor-pointer text-white hover:text-[#615cf6] border border-[#615cf6] px-4 py-1 rounded-full w-fit mx-auto mt-4"
                    >
                        See More
                    </div>
                ) : (
                    ""
                )}
            </div>
            <InventoryTransfersFilterModal
                show={showFilterModal}
                onClose={closeFilterModal}
            />
        </main>
    );
};

export default StockTransferHistory;
