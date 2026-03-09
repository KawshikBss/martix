import { FaBoxes, FaRecycle, FaCalendarAlt } from "react-icons/fa";
import Link from "next/link";
import DashboardAccordion from "@/components/ui/accordions/DashboardAccordion";
import { InventoryInterface } from "@/lib/interfaces/InventoryInterface";

export interface IStockLevelsListItemProps {
    inventory: InventoryInterface;
}

export function StockLevelsListItem({ inventory }: IStockLevelsListItemProps) {
    return (
        <DashboardAccordion.Container>
            <DashboardAccordion.Header>
                <FaBoxes className="flex-shrink-0 w-6 h-6 text-gray-400" />
                <div className="flex-1 ml-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-medium text-gray-900">
                                {inventory?.product.name}{" "}
                                {inventory.product.variation_meta != null ? (
                                    <>
                                        {inventory.product.variation_meta?.option?.toLocaleUpperCase()}
                                        {": "}
                                        {
                                            inventory.product.variation_meta
                                                ?.value
                                        }
                                    </>
                                ) : (
                                    ""
                                )}
                            </h3>
                            <p className="text-xs text-gray-700">
                                Store: {inventory?.store?.name ?? "N/A"}
                            </p>
                        </div>

                        <div className="text-right mr-4">
                            <div className={`text-xs font-bold`}>
                                {inventory.quantity <= 0
                                    ? "Out of"
                                    : inventory.quantity <
                                        inventory.reorder_level
                                      ? "Low"
                                      : "In"}{" "}
                                Stock
                            </div>
                            <p className="text-xs text-gray-500">
                                {inventory.quantity} /{" "}
                                {inventory.initial_quantity}
                            </p>
                        </div>
                    </div>
                </div>
            </DashboardAccordion.Header>
            <DashboardAccordion.Expanded>
                <DashboardAccordion.Section
                    icon={<FaRecycle className="w-4 h-4 text-green-500 mr-2" />}
                    title="Reorder Point"
                >
                    {inventory?.reorder_level ?? "N/A"}
                </DashboardAccordion.Section>
                <DashboardAccordion.Section
                    icon={
                        <FaCalendarAlt className="w-4 h-4 text-orange-500 mr-2" />
                    }
                    title="Expiry"
                >
                    {inventory?.expiry_date ?? "N/A"}
                </DashboardAccordion.Section>

                <div className="mt-4 flex flex-wrap gap-2">
                    <Link
                        href={`/dashboard/inventory/stock-levels/${inventory.id}/adjust`}
                        className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white"
                    >
                        Adjust Stock
                    </Link>
                    <Link
                        href={"/"}
                        className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white"
                    >
                        {inventory.quantity < inventory.reorder_level
                            ? "Reorder"
                            : "Stock In"}
                    </Link>
                </div>
            </DashboardAccordion.Expanded>
        </DashboardAccordion.Container>
    );
}
