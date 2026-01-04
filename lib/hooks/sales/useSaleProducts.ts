import { saleService } from "@/lib/services/saleService";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useSaleProducts(params: {
    storeId?: string;
    query?: string;
    filters?: {
        category: string;
        product_type: string;
        min_price: string;
        max_price: string;
        stock_level: string;
        status: string;
        brand: string;
        tag: string;
        has_expiry_date: string;
        expiring_soon: string;
        has_barcode: string;
        has_variants: string;
        min_create_date: string;
        max_create_date: string;
        min_update_date: string;
        max_update_date: string;
    };
}) {
    return useInfiniteQuery({
        queryKey: [
            "sale-products",
            params?.storeId,
            params?.query,
            params?.filters,
        ],
        queryFn: ({ pageParam = 1 }) =>
            saleService.getPosProducts({ ...params, page: pageParam }),
        getNextPageParam: (lastPage) => {
            const { current_page, last_page } = lastPage;
            return current_page < last_page ? current_page + 1 : undefined;
        },
        initialPageParam: 1,
    });
}
