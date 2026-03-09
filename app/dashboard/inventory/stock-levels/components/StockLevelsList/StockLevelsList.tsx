import { StockLevelsListItem } from "./StockLevelsListItem";
import { InfiniteData } from "@tanstack/react-query";
import { PaginatedResponse } from "@/lib/core/PaginatedResponse";
import { InventoryInterface } from "@/lib/interfaces/InventoryInterface";

export interface IStockLevelsListProps {
    data?: InfiniteData<PaginatedResponse<InventoryInterface>>;
}

export function StockLevelsList({ data }: IStockLevelsListProps) {
    const shownCount =
        data?.pages.reduce((total, page) => total + page.data.length, 0) ?? 0;
    return data?.pages?.[0].total ? (
        <div className="md:hidden mt-4">
            <span className="text-center text-gray-500">
                Showing {shownCount} of {data?.pages?.[0].total} inventories
            </span>
            <div className="space-y-4 mt-4">
                {data?.pages?.map((page) =>
                    page.data.map((inventory) => (
                        <StockLevelsListItem
                            key={inventory.id}
                            inventory={inventory}
                        />
                    )),
                )}
            </div>
        </div>
    ) : (
        ""
    );
}
