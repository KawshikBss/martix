import { saleService } from "@/lib/services/saleService";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useSales(params: {
    query?: string;
    filters?: {
        store: string;
        user: string;
        payment_status: string;
        status: string;
        min_order_value: string;
        max_order_value: string;
        min_create_date: string;
        max_create_date: string;
        min_update_date: string;
        max_update_date: string;
    };
}) {
    return useInfiniteQuery({
        queryKey: ["sales", params?.query, params?.filters],
        queryFn: ({ pageParam = 1 }) =>
            saleService.getOrders({ ...params, page: pageParam }),
        getNextPageParam: (lastPage) => {
            const { current_page, last_page } = lastPage;
            return current_page < last_page ? current_page + 1 : undefined;
        },
        initialPageParam: 1,
    });
}
