import { productService } from "@/lib/services/productService";
import { useQuery } from "@tanstack/react-query";

export function useProducts(params: {
    query?: string;
    category?: string;
    stockStatus?: string;
    minPrice?: string;
    maxPrice?: string;
}) {
    return useQuery({
        queryKey: [
            "products",
            params?.query,
            params?.category,
            params?.stockStatus,
            params?.minPrice,
            params?.maxPrice,
        ],
        queryFn: () => productService.getProducts(params),
    });
}
