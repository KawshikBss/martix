import * as React from "react";
import { StoresListItem } from "./StoresListItem";
import { StoreInterface } from "@/lib/interfaces/StoreIntefrace";
import { InfiniteData } from "@tanstack/react-query";
import { PaginatedResponse } from "@/lib/core/PaginatedResponse";

export interface IStoresListProps {
    data?: InfiniteData<PaginatedResponse<StoreInterface>>;
}

export function StoresList({ data }: IStoresListProps) {
    const shownCount =
        data?.pages.reduce((total, page) => total + page.data.length, 0) ?? 0;
    return data?.pages?.[0].total ? (
        <div className="md:hidden mt-4">
            <span className="text-center text-gray-500">
                Showing {shownCount} of {data?.pages?.[0].total} stores
            </span>
            <div className="space-y-4 mt-4">
                {data?.pages?.map((page) =>
                    page.data.map((store) => (
                        <StoresListItem key={store.id} store={store} />
                    ))
                )}
            </div>
        </div>
    ) : (
        ""
    );
}
