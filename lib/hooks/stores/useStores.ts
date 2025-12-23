import { storeService } from "@/lib/services/storeService";
import { useQuery } from "@tanstack/react-query";

export function useStores(params: {
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
        has_expired_products?: string;
        min_create_date?: string;
        max_create_date?: string;
        min_update_date?: string;
        max_update_date?: string;
    };
}) {
    return useQuery({
        queryKey: ["stores", params?.query, params?.filters],
        queryFn: () => storeService.getStores(params),
    });
}
