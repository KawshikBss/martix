import DashboardAccordion from "@/components/ui/accordions/DashboardAccordion";
import { useToggleStoreStatus } from "@/lib/hooks/stores/useToggleStoreStatus";
import { StoreInterface } from "@/lib/interfaces/StoreIntefrace";
import Image from "next/image";
import Link from "next/link";
import { BiPackage } from "react-icons/bi";
import { FaCashRegister, FaCrown, FaUser } from "react-icons/fa";
import { FaClockRotateLeft, FaRegCalendarDays, FaShop } from "react-icons/fa6";
import { IoWarning } from "react-icons/io5";
import { toast } from "react-toastify";

export interface IStoresListItemProps {
    store: StoreInterface;
}

export function StoresListItem({ store }: IStoresListItemProps) {
    const { mutateAsync: toggleStoreStatusMutation } = useToggleStoreStatus();
    const onToggleStoreStatus = (id: string) => {
        toggleStoreStatusMutation(id);
        toast.success(`Store status updated!`);
    };
    return (
        <DashboardAccordion.Container>
            <DashboardAccordion.Header>
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
                                        ? "text-green-600"
                                        : "text-red-600"
                                }`}
                            >
                                {store?.is_active ? "Active" : "Inactive"}
                            </div>
                        </div>
                    </div>
                </div>
            </DashboardAccordion.Header>
            <DashboardAccordion.Expanded>
                <DashboardAccordion.Section
                    icon={<FaCrown className="w-4 h-4 text-amber-500 mr-2" />}
                    title="Owned By"
                >
                    <Link
                        href="/dashboard/profile"
                        className="flex flex-row items-center gap-4"
                    >
                        <Image
                            src={
                                store?.owner?.image_url ??
                                "/images/user-placeholder.jpg"
                            }
                            alt={store?.owner?.name ?? "Profile"}
                            className="rounded-full w-[40px] h-[40px] border object-cover"
                            width={40}
                            height={40}
                        />
                        <span className="text-gray-700">
                            {store?.owner?.name ?? "N/A"}
                        </span>
                    </Link>
                </DashboardAccordion.Section>
                <DashboardAccordion.Section
                    icon={<FaUser className="w-4 h-4 text-blue-500 mr-2" />}
                    title="Managed By"
                >
                    <Link
                        href="/dashboard/profile"
                        className="flex flex-row items-center gap-4"
                    >
                        <Image
                            src={
                                store?.manager?.image_url ??
                                "/images/user-placeholder.jpg"
                            }
                            alt={store?.manager?.name ?? "Profile"}
                            className="rounded-full w-[40px] h-[40px] border object-cover"
                            width={40}
                            height={40}
                        />
                        <span className="text-gray-700">
                            {store?.manager?.name ?? "N/A"}
                        </span>
                    </Link>
                </DashboardAccordion.Section>
                <DashboardAccordion.Section
                    icon={
                        <FaCashRegister className="w-4 h-4 text-green-500 mr-2" />
                    }
                    title="Today's Sales"
                >
                    ${1000}
                </DashboardAccordion.Section>
                <DashboardAccordion.Section
                    icon={
                        <FaRegCalendarDays className="w-4 h-4 text-orange-500 mr-2" />
                    }
                    title="Monthly Sales"
                >
                    ${1000}
                </DashboardAccordion.Section>
                <DashboardAccordion.Section
                    icon={<BiPackage className="w-4 h-4 text-blue-500 mr-2" />}
                    title="Inventory Value"
                >
                    ${store?.current_inventory_value}
                </DashboardAccordion.Section>
                <DashboardAccordion.Section
                    icon={<IoWarning className="w-4 h-4 text-red-500 mr-2" />}
                    title="Low Stock Items"
                >
                    {store?.low_stock_items_count}
                </DashboardAccordion.Section>
                <DashboardAccordion.Section
                    icon={
                        <FaClockRotateLeft className="w-4 h-4 text-gray-500 mr-2" />
                    }
                    title="Last Updated"
                >
                    {store?.updated_at}
                </DashboardAccordion.Section>

                <div className="mt-4 flex flex-wrap gap-2">
                    <Link
                        href={`/dashboard/stores/${store.id}`}
                        className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white"
                    >
                        View
                    </Link>
                    <Link
                        href={`/dashboard/stores/${store.id}/edit`}
                        className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white"
                    >
                        Update
                    </Link>
                    <span
                        onClick={() => onToggleStoreStatus(store.id)}
                        className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white cursor-pointer"
                    >
                        {store?.is_active ? "Disable" : "Enable"}
                    </span>
                </div>
            </DashboardAccordion.Expanded>
        </DashboardAccordion.Container>
    );
}
