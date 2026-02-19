import { inventoryService } from "@/lib/services/inventoryService";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useInventoryTransfers(params: {
    query?: string;
    filters?: {
        user?: string;
        store?: string;
        product?: string;
        status?: string;
        min_create_date?: string;
        max_create_date?: string;
        min_update_date?: string;
        max_update_date?: string;
    };
}) {
    return useInfiniteQuery({
        queryKey: ["inventory-transfers", params?.query, params?.filters],
        queryFn: ({ pageParam = 1 }) =>
            inventoryService.getInventoryTransfers({
                ...params,
                page: pageParam,
            }),
        getNextPageParam: (lastPage) => {
            const { current_page, last_page } = lastPage;
            return current_page < last_page ? current_page + 1 : undefined;
        },
        initialPageParam: 1,
    });
}
