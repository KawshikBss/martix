"use client";

import {
    FaHourglassHalf,
    FaChartBar,
    FaMagnifyingGlassDollar,
} from "react-icons/fa6";
import { GrPieChart } from "react-icons/gr";
import { Bar, Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
} from "chart.js";
import KpiCard from "@/components/ui/KpiCard";
import { StockLevelsTable } from "./components/StockLevelsTable";
import { StockLevelsList } from "./components/StockLevelsList/StockLevelsList";
import { useInventories } from "@/lib/hooks/inventories/useInventories";
import { FaFilter } from "react-icons/fa";
import { useState } from "react";
import { MdClear } from "react-icons/md";
import Link from "next/link";
import Loader from "@/components/ui/loaders/Loader";
import { useSearchParams } from "next/navigation";
import InventoriesFilterModal from "./components/InventoriesFilterModal";
import { useInventoryMetrics } from "@/lib/hooks/inventories/useInventoryMetrics";
import { IoWarning } from "react-icons/io5";
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
);

const doughnutChartData = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
        {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
        },
    ],
};

const barChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: "top" as const,
        },
        title: {
            display: true,
            text: "Chart.js Bar Chart",
        },
    },
};

const barChartLabels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
];

const barChartData = {
    labels: barChartLabels,
    datasets: [
        {
            label: "Dataset 1",
            data: barChartLabels.map(() => Math.floor(Math.random() * 1001)),
            backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
            label: "Dataset 2",
            data: barChartLabels.map(() => Math.floor(Math.random() * 1001)),
            backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
    ],
};

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

            <div className="w-full my-6 flex flex-col md:flex-row justify-between items-start gap-6">
                <div className="w-full h-full bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between">
                    <div className="mb-4 flex flex-row justify-start items-center">
                        <GrPieChart className="mr-6 text-xl" />
                        <h4 className="text-lg font-semibold">
                            Stock Distribution
                        </h4>
                    </div>
                    <Doughnut data={doughnutChartData} />
                </div>
                <div className="w-full h-full bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between">
                    <div className="mb-4 flex flex-row justify-start items-center">
                        <FaChartBar className="mr-6 text-xl" />
                        <h4 className="text-lg font-semibold">Stock Value</h4>
                    </div>
                    <Bar options={barChartOptions} data={barChartData} />
                </div>
            </div>
            <InventoriesFilterModal
                show={showFilterModal}
                onClose={closeFilterModal}
            />
        </main>
    );
}
