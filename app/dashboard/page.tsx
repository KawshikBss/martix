"use client";

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
    FaRegUserCircle,
    FaCaretUp,
    FaRegCheckCircle,
    FaRegHourglass,
    FaInfoCircle,
    FaTruck,
    FaCashRegister,
    FaTrophy,
    FaHourglass,
    FaHourglassHalf,
    FaSearchDollar,
} from "react-icons/fa";
import { AiOutlineStock } from "react-icons/ai";
import { TbCancel } from "react-icons/tb";
import { GrMoney } from "react-icons/gr";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegBell } from "react-icons/fa6";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import ordersData from "@/public/data/ordersData";
import notificationsData from "@/public/data/notificationsData";
import productsData from "@/public/data/productsData";
import KpiCard from "@/components/ui/KpiCard";
import { useDashboardMetrics } from "@/lib/hooks/dashboard/useDashboardMetrics";
import { IoWarning } from "react-icons/io5";
import { useInventories } from "@/lib/hooks/inventories/useInventories";
import { useSales } from "@/lib/hooks/sales/useSales";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);
/* export const metadata: Metadata = {
  title: "Dashboard",
  description: "User Dashboard",
}; */

const options = {
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

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const data = {
    labels,
    datasets: [
        {
            label: "Dataset 1",
            data: labels.map(() => Math.floor(Math.random() * 1001)),
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
            label: "Dataset 2",
            data: labels.map(() => Math.floor(Math.random() * 1001)),
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
    ],
};

export default function Dashboard() {
    const { data: dashboardMetrics } = useDashboardMetrics();
    const { data: inventoriesData } = useInventories();
    const { data: salesData } = useSales({});
    return (
        <main className="p-4 md:p-8">
            <div className="w-full flex flex-row justify-between items-center">
                <h3 className="text-2xl font-medium">Dashboard</h3>
                <Link
                    href="/"
                    className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md"
                >
                    + Add New Product
                </Link>
            </div>
            <div className="my-6 w-full flex flex-col md:flex-row justify-between gap-4">
                <KpiCard
                    title="Today's Sales"
                    icon={
                        <FaCashRegister className="mr-2 text-xl text-blue-500" />
                    }
                    value={dashboardMetrics?.sales_today ?? "N/A"}
                />
                <KpiCard
                    title="Today's Orders"
                    icon={<FaTruck className="mr-2 text-xl text-blue-500" />}
                    value={dashboardMetrics?.orders_today ?? "N/A"}
                />
                <KpiCard
                    title="Top Product"
                    icon={<FaTrophy className="mr-2 text-xl text-yellow-500" />}
                    product={dashboardMetrics?.most_sold_product ?? undefined}
                />
                <KpiCard
                    title="Today's Pending"
                    icon={
                        <FaHourglassHalf className="mr-2 text-xl text-gray-500" />
                    }
                    value={dashboardMetrics?.pending_today ?? "N/A"}
                />
                <KpiCard
                    title="Today's Dues"
                    icon={
                        <FaSearchDollar className="mr-2 text-xl text-amber-500" />
                    }
                    value={dashboardMetrics?.total_due_today ?? "N/A"}
                />
                <KpiCard
                    title="Low Stocks"
                    icon={
                        <IoWarning className="mr-2 text-xl text-yellow-500" />
                    }
                    value={dashboardMetrics?.low_stock_items ?? "N/A"}
                />
            </div>
            <div className="my-6">
                <div className="w-full md:h-[50vh] flex flex-col md:flex-row justify-between items-start gap-6">
                    <div className="w-full h-full bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between">
                        <div className="flex flex-row justify-start items-center">
                            <GrMoney className="mr-6 text-xl" />
                            <h4 className="text-lg font-normal">Sales</h4>
                        </div>
                        <Line
                            options={options}
                            data={data}
                            className="my-auto"
                        />
                    </div>
                    <div className="w-full h-full bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between">
                        <div className="flex flex-row justify-start items-center">
                            <AiOutlineStock className="mr-6 text-xl" />
                            <div className="w-full flex flex-row justify-between items-center">
                                <h4 className="text-lg font-normal">
                                    Inventory Stocks
                                </h4>
                                <Link
                                    href="/dashboard/inventory/stock-levels"
                                    className="text-sm text-blue-500"
                                >
                                    See All
                                </Link>
                            </div>
                        </div>
                        <div className="mt-4 mx-2 mb-2 h-full overflow-y-scroll">
                            <ul className="list-none list-inside">
                                {inventoriesData?.pages[0]?.data?.map(
                                    (item) => (
                                        <li
                                            key={item.id}
                                            className="w-full py-2 flex flex-row justify-between items-center"
                                        >
                                            <span className="flex flex-row justify-start items-center gap-4">
                                                <Image
                                                    src={
                                                        item?.product
                                                            ?.image_url ??
                                                        "/placeholder-product.png"
                                                    }
                                                    alt={item?.product?.name}
                                                    width={60}
                                                    height={40}
                                                    className="aspect-3/2 object-cover rounded-lg"
                                                />
                                                <div>
                                                    <h3 className="text-lg font-semibold">
                                                        {item?.product?.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-500">
                                                        {item?.product
                                                            ?.min_selling_price &&
                                                        item?.product
                                                            ?.max_selling_price
                                                            ? `৳${item?.product?.min_selling_price} - ৳${item?.product?.max_selling_price}`
                                                            : "৳" +
                                                              (item?.product
                                                                  ?.min_selling_price ??
                                                                  item?.product
                                                                      ?.max_selling_price ??
                                                                  "0")}
                                                    </p>
                                                </div>
                                            </span>
                                            <span className="flex flex-row justify-start items-center gap-4">
                                                {" "}
                                            </span>
                                            <div className="flex flex-col md:flex-row gap-2">
                                                <Link
                                                    href={`/dashboard/inventory/stock-levels/${item.id}/adjust`}
                                                    className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white"
                                                >
                                                    Adjust Stock
                                                </Link>
                                                <Link
                                                    href={"/"}
                                                    className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white"
                                                >
                                                    {item.quantity <
                                                    item.reorder_level
                                                        ? "Reorder"
                                                        : "Stock In"}
                                                </Link>
                                            </div>
                                        </li>
                                    ),
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="my-6">
                <div className="w-full md:h-[40vh] flex flex-col md:flex-row justify-between items-start gap-6">
                    <div className="w-full h-full bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between">
                        <div className="flex flex-row justify-start items-center">
                            <FiShoppingCart className="mr-6 text-xl" />
                            <div className="w-full flex flex-row justify-between items-center">
                                <div>
                                    <h4 className="text-lg font-normal">
                                        Recent Sales
                                    </h4>
                                    <p className="text-sm text-gray-500">
                                        You have completed{" "}
                                        {dashboardMetrics?.sales_today ?? "0"}{" "}
                                        sales today
                                    </p>
                                </div>
                                <Link
                                    href="/dashboard/sales"
                                    className="text-sm text-blue-500"
                                >
                                    See All
                                </Link>
                            </div>
                        </div>
                        <div className="mt-4 mx-2 mb-2 h-full overflow-y-scroll">
                            <ul className="list-none list-inside">
                                {salesData?.pages[0]?.data.map((sale) => (
                                    <li
                                        key={sale.id}
                                        className="w-full py-2 flex flex-row justify-between items-center"
                                    >
                                        <span className="flex flex-row justify-start items-center gap-4">
                                            <FaRegUserCircle className="w-8 h-8" />
                                            {sale?.customer?.name ??
                                                "Walk-in Customer"}
                                        </span>
                                        <span className="flex flex-row justify-start items-center gap-4">
                                            +${sale.grand_total}{" "}
                                            {sale.status === "pending" ? (
                                                <FaRegHourglass />
                                            ) : sale.status === "completed" ? (
                                                <FaRegCheckCircle />
                                            ) : (
                                                <TbCancel />
                                            )}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="w-full h-full bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between">
                        <div className="flex flex-row justify-start items-center">
                            <FaRegBell className="mr-6 text-xl" />
                            <div className="w-full flex flex-row justify-between items-center">
                                <div>
                                    <h4 className="text-lg font-normal">
                                        Notifications
                                    </h4>
                                    <p className="text-sm text-gray-500">
                                        You have 5 new notifications
                                    </p>
                                </div>
                                <Link
                                    href="/"
                                    className="text-sm text-blue-500"
                                >
                                    See All
                                </Link>
                            </div>
                        </div>
                        <div className="mt-4 mx-2 mb-2 h-full overflow-y-scroll">
                            <ul className="list-none list-inside">
                                {notificationsData.map((notification) => (
                                    <li key={notification.id} className="py-2">
                                        <span
                                            className={`flex flex-row justify-start items-center gap-4 ${
                                                notification.read
                                                    ? "text-black-500"
                                                    : "text-green-500"
                                            }`}
                                        >
                                            <FaInfoCircle />
                                            {notification.message}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
