"use client";

import {
    FaHourglassHalf,
    FaChartBar,
    FaMagnifyingGlassDollar,
} from "react-icons/fa6";
import KpiCard from "@/components/ui/KpiCard";
import { StockLevelsTable } from "./components/StockLevelsTable";
import { StockLevelsList } from "./components/StockLevelsList/StockLevelsList";
import { useInventories } from "@/lib/hooks/inventories/useInventories";
import { FaBoxes, FaFilter, FaLayerGroup } from "react-icons/fa";
import { useMemo, useState } from "react";
import { MdClear } from "react-icons/md";
import Link from "next/link";
import Loader from "@/components/ui/loaders/Loader";
import { useSearchParams } from "next/navigation";
import InventoriesFilterModal from "./components/InventoriesFilterModal";
import { useInventoryMetrics } from "@/lib/hooks/inventories/useInventoryMetrics";
import { IoWarning } from "react-icons/io5";
import { useInventoryStatusGraphData } from "@/lib/hooks/inventories/useInventoryStatusGraphData";
import CustomGraph from "@/components/ui/CustomGraph";
import { useInventoryByCategoryGraphData } from "@/lib/hooks/inventories/useInventoryByCategoryGraphData";

export default function StockLevels() {
    const [query, setQuery] = useState<string>("");
    const onQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };
    const clearQuery = () => setQuery("");

    const searchParams = useSearchParams();
    const filters = {
        store: searchParams.get("store") ?? "",
        status: searchParams.get("status") ?? "",
        category: searchParams.get("category") ?? "",
        brand: searchParams.get("brand") ?? "",
        min_inventory_value: searchParams.get("min_inventory_value") ?? "",
        max_inventory_value: searchParams.get("max_inventory_value") ?? "",
        has_expired_products:
            searchParams.get("has_expired_products") ?? "false",
        has_soon_expiring_products:
            searchParams.get("has_soon_expiring_products") ?? "false",
        min_create_date: searchParams.get("min_create_date") ?? "",
        max_create_date: searchParams.get("max_create_date") ?? "",
        min_update_date: searchParams.get("min_update_date") ?? "",
        max_update_date: searchParams.get("max_update_date") ?? "",
    };

    const [showFilterModal, setShowFilterModal] = useState<boolean>(false);

    const openFilterModal = () => setShowFilterModal(true);
    const closeFilterModal = () => setShowFilterModal(false);

    const { data: inventoryMetrics } = useInventoryMetrics();

    const {
        data: inventories,
        isLoading: inventoriesIsLoading,
        isFetchingNextPage: inventoriesIsFetching,
        isSuccess: inventoriesIsSuccess,
        hasNextPage: inventoriesHasNextPage,
        fetchNextPage: fetchNextInventories,
    } = useInventories({ query, filters });

    const { data: statusGraphData } = useInventoryStatusGraphData();
    const cleanStatusGraphData = useMemo(() => {
        if (!statusGraphData) return { labels: [], datasets: [] };
        var labels = Object.keys(statusGraphData).map((item: string) =>
            item.replaceAll("_", " "),
        );
        var data = Object.values(statusGraphData) as number[];

        return {
            labels,
            datasets: [
                {
                    data: data,
                    borderColor: ["#00c950", "#f0b50f", "#febcbf", "#ff710e"],
                    borderWidth: 2,
                    backgroundColor: [
                        "#00c950A6",
                        "#f0b50fA6",
                        "#febcbfA6",
                        "#ff710eA6",
                    ],
                },
            ],
        };
    }, [statusGraphData]);

    const { data: inventoryByCategoryGraphData } =
        useInventoryByCategoryGraphData();
    const cleanInventoryByCategoryGraphData = useMemo(() => {
        if (!inventoryByCategoryGraphData) return { labels: [], datasets: [] };
        var labels = Object.keys(inventoryByCategoryGraphData);
        var data = Object.values(inventoryByCategoryGraphData) as number[];

        return {
            labels,
            datasets: [
                {
                    data: data,
                    label: "Value",
                },
            ],
        };
    }, [inventoryByCategoryGraphData]);

    return (
        <main className="p-4 md:p-8">
            <h3 className="text-2xl font-medium my-6">Stock Levels</h3>
            <div className="my-6 w-full flex flex-col md:flex-row justify-between gap-4">
                <KpiCard
                    title="Total Active Items"
                    value={inventoryMetrics?.total_active_items ?? "N/A"}
                    icon={<FaChartBar className="text-xl text-blue-500" />}
                />
                <KpiCard
                    title="Total Inventory Value"
                    value={inventoryMetrics?.total_inventory_value ?? "N/A"}
                    icon={
                        <FaMagnifyingGlassDollar className="text-xl text-green-500" />
                    }
                />
                <KpiCard
                    title="Low Stock Items"
                    value={inventoryMetrics?.low_stock_items ?? "N/A"}
                    icon={<IoWarning className="text-xl text-yellow-500" />}
                />
                <KpiCard
                    title="Out of Stock Items"
                    value={inventoryMetrics?.out_of_stock_items ?? "N/A"}
                    icon={<IoWarning className="text-xl text-red-500" />}
                />
                <KpiCard
                    title="Expiring Soon Items"
                    value={inventoryMetrics?.expiring_soon_items ?? "N/A"}
                    icon={<FaHourglassHalf className="text-xl text-gray-500" />}
                />
                <KpiCard
                    title="Expired Items"
                    value={inventoryMetrics?.expired_items ?? "N/A"}
                    icon={
                        <FaHourglassHalf className="text-xl text-amber-500" />
                    }
                />
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
                <CustomGraph
                    title="Stock Status"
                    icon={<FaBoxes />}
                    type="pie"
                    data={cleanStatusGraphData}
                />
                <CustomGraph
                    title="Value by Categories"
                    icon={<FaLayerGroup />}
                    colspan={2}
                    type="bar"
                    data={cleanInventoryByCategoryGraphData}
                />
            </div>

            <div className="bg-white rounded-2xl shadow-md p-4 md:p-6">
                <div className="my-6 flex flex-row justify-between">
                    <input
                        value={query}
                        onChange={onQueryChange}
                        type="text"
                        placeholder="Search inventories..."
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
                <StockLevelsTable data={inventories} />
                <StockLevelsList data={inventories} />
                {inventoriesIsLoading || inventoriesIsFetching ? (
                    <Loader />
                ) : !inventoriesIsLoading &&
                  !inventoriesIsFetching &&
                  inventoriesIsSuccess &&
                  !inventories?.pages?.[0].total ? (
                    <p>
                        No stocks{query?.length ? ` matching "${query}"` : ""}
                        {filters?.store?.length ? " in that store" : ""}
                        {filters?.status?.length
                            ? ` currently "${filters?.status}"`
                            : ""}
                        {filters?.category?.length
                            ? ` in the "${filters?.category}" category`
                            : ""}
                        {filters?.brand?.length
                            ? ` from the "${filters?.brand}" brand`
                            : ""}
                        {filters?.min_inventory_value?.length &&
                        filters?.max_inventory_value?.length
                            ? ` with stock value between $${filters?.min_inventory_value} and $${filters?.max_inventory_value}`
                            : filters?.min_inventory_value?.length
                              ? ` with stock value more than $${filters?.min_inventory_value}`
                              : filters?.max_inventory_value?.length
                                ? ` with stock value less than $${filters?.max_inventory_value}`
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
                ) : inventoriesHasNextPage ? (
                    <div
                        onClick={() => fetchNextInventories()}
                        className="bg-[#615cf6] hover:bg-transparent cursor-pointer text-white hover:text-[#615cf6] border border-[#615cf6] px-4 py-1 rounded-full w-fit mx-auto mt-4"
                    >
                        See More
                    </div>
                ) : (
                    ""
                )}
            </div>
            <InventoriesFilterModal
                show={showFilterModal}
                onClose={closeFilterModal}
            />
        </main>
    );
}
