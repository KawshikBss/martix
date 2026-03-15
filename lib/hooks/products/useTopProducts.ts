import { productService } from "@/lib/services/productService";
import { useQuery } from "@tanstack/react-query";

export function useTopProducts() {
    return useQuery({
        queryKey: ["top-products"],
        queryFn: () => productService.getTopProducts(),
    });
}
