import * as React from "react";
import { InventoryTransferListItem } from "./InventoryTransferListItem";
import { InfiniteData } from "@tanstack/react-query";
import { PaginatedResponse } from "@/lib/core/PaginatedResponse";
import { InventoryTransferInterface } from "@/lib/interfaces/InventoryTransferInterface";

export interface IInventoryTransferListProps {
    data?: InfiniteData<PaginatedResponse<InventoryTransferInterface>>;
}

export function InventoryTransferList({ data }: IInventoryTransferListProps) {
    const shownCount =
        data?.pages.reduce((total, page) => total + page.data.length, 0) ?? 0;
    return data?.pages?.[0].total ? (
        <div className="md:hidden mt-4">
            <span className="text-center text-gray-500">
                Showing {shownCount} of {data?.pages?.[0].total} inventory
                transfers
            </span>
            <div className="space-y-4 mt-4">
                {data?.pages?.map((page) =>
                    page.data.map((inventoryTransfer) => (
                        <InventoryTransferListItem
                            key={inventoryTransfer.id}
                            inventoryTransfer={inventoryTransfer}
                        />
                    )),
                )}
            </div>
        </div>
    ) : (
        ""
    );
}
