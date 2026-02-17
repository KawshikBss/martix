"use client";

import productsData from "@/public/data/productsData";
import * as React from "react";
import { FaChartLine } from "react-icons/fa6";
import { Bar, Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    PointElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    LineElement,
} from "chart.js";
import {
    FaBalanceScaleLeft,
    FaFilter,
    FaMinus,
    FaMinusSquare,
    FaPlus,
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
ChartJS.register(
    ArcElement,
    PointElement,
    Tooltip,
    Legend,
    LineElement,
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

const lineChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: "top" as const,
        },
        title: {
            display: true,
            text: "Chart.js Line Chart",
        },
    },
};

const lineChartLabels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
];

const lineChartData = {
    labels: lineChartLabels,
    datasets: [
        {
            label: "Dataset 1",
            data: lineChartLabels.map(() => Math.floor(Math.random() * 1001)),
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
            label: "Dataset 2",
            data: lineChartLabels.map(() => Math.floor(Math.random() * 1001)),
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
    ],
};

const horizontalBarChartLabels = [
    ...productsData.map((product) => product.name),
];

const horizontalBarChartData = {
    labels: horizontalBarChartLabels,
    datasets: [
        {
            label: "Dataset 1",
            data: horizontalBarChartLabels.map(() =>
                Math.floor(Math.random() * 1001),
            ),
            backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
            label: "Dataset 2",
            data: horizontalBarChartLabels.map(() =>
                Math.floor(Math.random() * 1001),
            ),
            backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
    ],
};

export default function InventoryMovements() {
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
                    title="Total Movements Today"
                    value="+ 10,000"
                    icon={<FaChartLine className="text-xl text-blue-500" />}
                />
                <KpiCard
                    title="Stock Added Today"
                    value="+ 10,000"
                    icon={<FaPlusSquare className="text-xl text-green-500" />}
                />
                <KpiCard
                    title="Stock Removed Today"
                    value="- 10,000"
                    icon={<FaMinusSquare className="text-xl text-red-500" />}
                />
                <KpiCard
                    title="Adjustments Today"
                    value="+ 10,000"
                    icon={
                        <FaBalanceScaleLeft className="text-xl text-amber-500" />
                    }
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
