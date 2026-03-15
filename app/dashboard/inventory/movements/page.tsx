"use client";

import * as React from "react";
import { FaBoxesPacking, FaChartLine } from "react-icons/fa6";
import {
    FaBalanceScale,
    FaBalanceScaleLeft,
    FaChartBar,
    FaFilter,
    FaMinusSquare,
    FaPlusSquare,
} from "react-icons/fa";
import KpiCard from "@/components/ui/KpiCard";
import { InventoryMovementsTable } from "./components/InventoryMovementsTable";
import { InventoryMovementsList } from "./components/InventoryMovementsList/InventoryMovementsList";
import { useInventoryMovements } from "@/lib/hooks/inventories/useInventoryMovements";
import Link from "next/link";
import { MdClear } from "react-icons/md";
import { useSearchParams } from "next/navigation";
import Loader from "@/components/ui/loaders/Loader";
import InventoryMovementsFilterModal from "./components/InventoryMovementsFilterModal";
import { useInventoryMovementMetrics } from "@/lib/hooks/inventories/useInventoryMovementMetrics";
import { useInventoryMovementTypesGraphData } from "@/lib/hooks/inventories/useInventoryMovementTypesGraphData";
import CustomGraph from "@/components/ui/CustomGraph";
import { getRandomColor } from "@/lib/utils/formatters";
import { useInventoryMovementLevelsGraphData } from "@/lib/hooks/inventories/useInventoryMovementLevelsGraphData";

export default function InventoryMovements() {
    const { data: inventoryMovementMetrics } = useInventoryMovementMetrics();

    const [query, setQuery] = React.useState<string>("");
    const onQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };
    const clearQuery = () => setQuery("");

    const searchParams = useSearchParams();
    const filters = {
        user: searchParams.get("user") ?? "",
        store: searchParams.get("store") ?? "",
        adjustment_type: searchParams.get("adjustment_type") ?? "",
        reason: searchParams.get("reason") ?? "",
        min_create_date: searchParams.get("min_create_date") ?? "",
        max_create_date: searchParams.get("max_create_date") ?? "",
        min_update_date: searchParams.get("min_update_date") ?? "",
        max_update_date: searchParams.get("max_update_date") ?? "",
    };

    const {
        data: inventoryMovements,
        isLoading: inventoryMovementsIsLoading,
        isFetchingNextPage: inventoryMovementsIsFetching,
        isSuccess: inventoryMovementsIsSuccess,
        hasNextPage: inventoryMovementsHasNextPage,
        fetchNextPage: fetchNextInventoryMovements,
    } = useInventoryMovements({ query, filters });

    const [showFilterModal, setShowFilterModal] =
        React.useState<boolean>(false);

    const openFilterModal = () => setShowFilterModal(true);
    const closeFilterModal = () => setShowFilterModal(false);

    const { data: movementTypesGraphData } =
        useInventoryMovementTypesGraphData();
    const cleanMovementTypesGraphData = React.useMemo(() => {
        if (!movementTypesGraphData) return { labels: [], datasets: [] };
        var labels = Object.keys(movementTypesGraphData);
        var data = Object.values(movementTypesGraphData).map(
            (item: any) => item.count,
        );
        var colors = data.map((_) => getRandomColor());

        return {
            labels,
            datasets: [
                {
                    data: data,
                    borderColor: colors,
                    borderWidth: 2,
                    backgroundColor: colors.map((item) => item + "A6"),
                },
            ],
        };
    }, [movementTypesGraphData]);

    const { data: movementLevelsGraphData } =
        useInventoryMovementLevelsGraphData();
    const cleanMovementLevelsGraphData = React.useMemo(() => {
        if (!movementLevelsGraphData) return { labels: [], datasets: [] };
        var labels = Object.keys(movementLevelsGraphData);
        var stockInData = [] as number[];
        var stockOutData = [] as number[];
        var data = Object.values(movementLevelsGraphData).map((item: any) => {
            stockInData.push(item.stock_in);
            stockOutData.push(Math.abs(item.stock_out));
        });

        return {
            labels,
            datasets: [
                {
                    data: stockInData,
                    borderColor: "#00c950",
                    backgroundColor: "#00c950A6",
                    label: "Stock In",
                },
                {
                    data: stockOutData,
                    borderColor: "#febcbf",
                    backgroundColor: "#febcbfA6",
                    label: "Stock Out",
                },
            ],
        };
    }, [movementLevelsGraphData]);

    return (
        <main className="p-4 md:p-8">
            <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 w-full flex flex-row justify-between items-center">
                <h3 className="text-2xl font-medium">Stock Movements</h3>
                <Link
                    href="/dashboard/inventories/adjust"
                    className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md"
                >
                    Adjust Stock
                </Link>
            </div>
            <div className="my-6 w-full flex flex-col md:flex-row justify-between gap-4">
                <KpiCard
                    title="Total Movements"
                    value={inventoryMovementMetrics?.total_movements ?? 0}
                    icon={<FaChartLine className="text-xl text-blue-500" />}
                />
                <KpiCard
                    title="Stock Added"
                    value={inventoryMovementMetrics?.stock_added ?? 0}
                    icon={<FaPlusSquare className="text-xl text-green-500" />}
                />
                <KpiCard
                    title="Stock Removed"
                    value={inventoryMovementMetrics?.stock_removed ?? 0}
                    icon={<FaMinusSquare className="text-xl text-red-500" />}
                />
                <KpiCard
                    title="Adjustments"
                    value={inventoryMovementMetrics?.adjustments ?? 0}
                    icon={
                        <FaBalanceScaleLeft className="text-xl text-amber-500" />
                    }
                />
                <KpiCard
                    title="Net Stock Change"
                    value={inventoryMovementMetrics?.net_stock_change ?? 0}
                    icon={
                        <FaBalanceScale className="text-xl text-emerald-500" />
                    }
                />
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
                <CustomGraph
                    title="Movement type"
                    icon={<FaBoxesPacking />}
                    type="pie"
                    data={cleanMovementTypesGraphData}
                />
                <CustomGraph
                    title="Stock In vs Stock Out"
                    icon={<FaChartBar />}
                    colspan={2}
                    type="bar"
                    data={cleanMovementLevelsGraphData}
                />
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
                <div className="my-6 flex flex-row justify-between">
                    <input
                        value={query}
                        onChange={onQueryChange}
                        type="text"
                        placeholder="Search inventory movements..."
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
                <InventoryMovementsTable data={inventoryMovements} />
                <InventoryMovementsList data={inventoryMovements} />
                {inventoryMovementsIsLoading || inventoryMovementsIsFetching ? (
                    <Loader />
                ) : !inventoryMovementsIsLoading &&
                  !inventoryMovementsIsFetching &&
                  inventoryMovementsIsSuccess &&
                  !inventoryMovements?.pages?.[0].total ? (
                    <p>
                        No inventory movements{" "}
                        {query?.length ? ` matching "${query}"` : ""}
                        {filters?.user?.length ? " entered by that user" : ""}
                        {filters?.store?.length ? ` in that store` : ""}
                        {filters?.reason?.length
                            ? ` which is "${filters?.reason}"`
                            : ""}
                        {filters?.adjustment_type?.length
                            ? ` adjusted to "${filters?.adjustment_type}"`
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
                ) : inventoryMovementsHasNextPage ? (
                    <div
                        onClick={() => fetchNextInventoryMovements()}
                        className="bg-[#615cf6] hover:bg-transparent cursor-pointer text-white hover:text-[#615cf6] border border-[#615cf6] px-4 py-1 rounded-full w-fit mx-auto mt-4"
                    >
                        See More
                    </div>
                ) : (
                    ""
                )}
            </div>
            <InventoryMovementsFilterModal
                show={showFilterModal}
                onClose={closeFilterModal}
            />
        </main>
    );
}
