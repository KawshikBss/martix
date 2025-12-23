import * as React from "react";
import { StoresListItem } from "./StoresListItem";
import { StoreInterface } from "@/lib/interfaces/StoreIntefrace";

export interface IStoresListProps {
    data?: StoreInterface[];
}

export function StoresList({ data }: IStoresListProps) {
    return data?.length ? (
        <div className="md:hidden mt-4">
            <span className="text-center text-gray-500">
                Showing {data?.length} stores
            </span>
            <div className="space-y-4 mt-4">
                {data?.map((store) => (
                    <StoresListItem key={store.id} store={store} />
                ))}
            </div>
            <div className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-4 py-1 rounded-full w-fit mx-auto">
                See More
            </div>
        </div>
    ) : (
        ""
    );
}
