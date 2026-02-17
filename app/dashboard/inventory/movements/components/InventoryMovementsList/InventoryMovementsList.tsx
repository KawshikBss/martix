import { IProduct } from "@/public/data/productsData";
import * as React from "react";
import { InventoryMovementsListItem } from "./InventoryMovementsListItem";
import { InfiniteData } from "@tanstack/react-query";
import { PaginatedResponse } from "@/lib/core/PaginatedResponse";
import { InventoryMovementInterface } from "@/lib/interfaces/InventoryMovementInterface";

export interface IInventoryMovementsListProps {
    data?: InfiniteData<PaginatedResponse<InventoryMovementInterface>>;
}

export function InventoryMovementsList({ data }: IInventoryMovementsListProps) {
    const shownCount =
        data?.pages.reduce((total, page) => total + page.data.length, 0) ?? 0;
    return data?.pages?.[0].total ? (
        <div className="md:hidden mt-4">
            <span className="text-center text-gray-500">
                Showing {shownCount} of {data?.pages?.[0].total} inventory
                movements
            </span>
            <div className="space-y-4 mt-4">
                {data?.pages?.map((page) =>
                    page.data.map((inventoryMovement) => (
                        <InventoryMovementsListItem
                            key={inventoryMovement.id}
                            inventoryMovement={inventoryMovement}
                        />
                    )),
                )}
            </div>
        </div>
    ) : (
        ""
    );
}
