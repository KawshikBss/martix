import { InfiniteData } from "@tanstack/react-query";
import { PaginatedResponse } from "@/lib/core/PaginatedResponse";
import { SaleInterface } from "@/lib/interfaces/SaleInterface";
import { SalesListItem } from "./SalesListItem";

export interface ISalesListProps {
    data?: InfiniteData<PaginatedResponse<SaleInterface>>;
}

export function SalesList({ data }: ISalesListProps) {
    const shownCount =
        data?.pages.reduce((total, page) => total + page.data.length, 0) ?? 0;
    return data?.pages?.[0].total ? (
        <div className="md:hidden mt-4">
            <span className="text-center text-gray-500">
                Showing {shownCount} of {data?.pages?.[0].total} sales
            </span>
            <div className="space-y-4 mt-4">
                {data?.pages?.map((page) =>
                    page.data.map((sale) => (
                        <SalesListItem key={sale.id} sale={sale} />
                    ))
                )}
            </div>
        </div>
    ) : (
        ""
    );
}
