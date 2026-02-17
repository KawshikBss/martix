import DashboardAccordion from "@/components/ui/accordions/DashboardAccordion";
import { InventoryMovementInterface } from "@/lib/interfaces/InventoryMovementInterface";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { FaBoxes, FaCashRegister, FaLink, FaShapes } from "react-icons/fa";
import { FaBagShopping, FaPerson, FaShop } from "react-icons/fa6";

export interface IInventoryMovementsListItemProps {
    inventoryMovement: InventoryMovementInterface;
}

export function InventoryMovementsListItem({
    inventoryMovement,
}: IInventoryMovementsListItemProps) {
    return (
        <DashboardAccordion.Container>
            <DashboardAccordion.Header>
                <FaBoxes className="flex-shrink-0 w-6 h-6 text-gray-400" />
                <div className="flex-1 ml-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-medium text-gray-900">
                                {inventoryMovement?.inventory?.product.name}
                            </h3>
                            <p className="text-xs text-gray-700">
                                Quantity change: {inventoryMovement?.quantity}
                            </p>
                        </div>

                        <div className="text-right mr-4">
                            <div className={`text-xs font-bold`}>
                                {inventoryMovement?.performed_by?.name}
                            </div>
                            <p className="text-xs text-gray-500">
                                {inventoryMovement?.updated_at}
                            </p>
                        </div>
                    </div>
                </div>
            </DashboardAccordion.Header>
            <DashboardAccordion.Expanded>
                <DashboardAccordion.Section
                    icon={
                        <FaBagShopping className="w-4 h-4 text-amber-500 mr-2" />
                    }
                    title="Product"
                >
                    <Link
                        href={`/dashboard/products/${inventoryMovement.inventory.product.id}`}
                        className="flex flex-row items-center gap-4"
                    >
                        <Image
                            src={
                                inventoryMovement?.inventory?.product
                                    ?.image_url ??
                                "/images/user-placeholder.jpg"
                            }
                            alt={
                                inventoryMovement?.inventory?.product?.name ??
                                "Product"
                            }
                            className="rounded-full w-[40px] h-[40px] border object-cover"
                            width={40}
                            height={40}
                        />
                        <span className="text-gray-700">
                            {inventoryMovement?.inventory?.product?.name ??
                                "N/A"}
                            {inventoryMovement.inventory.product.sku && (
                                <span>
                                    {"[ "}
                                    {inventoryMovement.inventory.product.sku}
                                    {" ]"}
                                </span>
                            )}
                        </span>
                    </Link>
                    <div className="text-gray-700 text-start mt-2">
                        {inventoryMovement.inventory.product.variation_meta !=
                        null ? (
                            <>
                                {inventoryMovement.inventory.product.variation_meta?.option?.toLocaleUpperCase()}
                                {": "}
                                {
                                    inventoryMovement.inventory.product
                                        .variation_meta?.value
                                }
                            </>
                        ) : (
                            "Base Product"
                        )}
                    </div>
                </DashboardAccordion.Section>
                <DashboardAccordion.Section
                    icon={<FaShop className="w-4 h-4 text-blue-500 mr-2" />}
                    title="Store"
                >
                    <Link
                        href={`/dashboard/stores/${inventoryMovement?.inventory?.store?.id}`}
                        className="flex flex-row items-center gap-4"
                    >
                        <Image
                            src={
                                inventoryMovement?.inventory?.store
                                    ?.image_url ??
                                "/images/user-placeholder.jpg"
                            }
                            alt={
                                inventoryMovement?.inventory?.store?.name ??
                                "Store"
                            }
                            className="rounded-full w-[40px] h-[40px] border object-cover"
                            width={40}
                            height={40}
                        />
                        <span className="text-gray-700">
                            {inventoryMovement?.inventory?.store?.name ?? "N/A"}
                        </span>
                    </Link>
                </DashboardAccordion.Section>
                <DashboardAccordion.Section
                    icon={<FaShapes className="w-4 h-4 text-green-500 mr-2" />}
                    title="Type"
                >
                    {inventoryMovement?.type ?? "N/A"}
                </DashboardAccordion.Section>
                <DashboardAccordion.Section
                    icon={
                        <FaCashRegister className="w-4 h-4 text-orange-500 mr-2" />
                    }
                    title="Balance After Movement"
                >
                    {inventoryMovement?.inventory?.quantity ?? "N/A"}
                </DashboardAccordion.Section>
                <DashboardAccordion.Section
                    icon={<FaLink className="w-4 h-4 text-blue-500 mr-2" />}
                    title="Reference"
                >
                    {inventoryMovement?.reference_text ?? "N/A"}
                </DashboardAccordion.Section>

                <div className="mt-4 flex flex-wrap gap-2">
                    <Link
                        href={`/`}
                        className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white"
                    >
                        View
                    </Link>
                </div>
            </DashboardAccordion.Expanded>
        </DashboardAccordion.Container>
    );
}
