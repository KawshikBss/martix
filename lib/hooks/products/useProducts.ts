import { productService } from "@/lib/services/productService";
import { useQuery } from "@tanstack/react-query";

export function useProducts(params: {
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
    return useQuery({
        queryKey: [
            "products",
            params?.query,
            params?.filters
        ],
        queryFn: () => productService.getProducts(params),
    });
}
