import { storeService } from "@/lib/services/storeService";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useStores(params?: {
    query?: string;
    filters?: {
        manager?: string;
        branch?: string;
        location?: string;
        status?: string;
        stock_level?: string;
        type?: string;
        min_inventory_value?: string;
        max_inventory_value?: string;
        has_staff?: string;
        has_low_stock?: string;
        has_expired_products?: string;
        has_soon_expiring_products?: string;
        min_create_date?: string;
        max_create_date?: string;
        min_update_date?: string;
        max_update_date?: string;
    };
}) {
    return useInfiniteQuery({
        queryKey: ["stores", params?.query, params?.filters],
        queryFn: ({ pageParam = 1 }) =>
            storeService.getStores({ ...params, page: pageParam }),
        getNextPageParam: (lastPage) => {
            const { current_page, last_page } = lastPage;
            return current_page < last_page ? current_page + 1 : undefined;
        },
        initialPageParam: 1,
    });
}
