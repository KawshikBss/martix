import { productService } from "@/lib/services/productService";
import { useQuery } from "@tanstack/react-query";

export function useProduct(id?: string) {
    return useQuery({
        queryKey: ["products", id],
        queryFn: () => productService.getProduct(id),
    });
}
