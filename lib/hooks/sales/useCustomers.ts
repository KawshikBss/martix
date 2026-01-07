import { saleService } from "@/lib/services/saleService";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export function useCustomers(params: { query?: string; store?: string }) {
    return useInfiniteQuery({
        queryKey: ["customers", params],
        queryFn: ({ pageParam = 1 }) =>
            saleService.getCustomers({ ...params, page: pageParam }),
        getNextPageParam: (lastPage) => {
            const { current_page, last_page } = lastPage;
            return current_page < last_page ? current_page + 1 : undefined;
        },
        initialPageParam: 1,
    });
}
