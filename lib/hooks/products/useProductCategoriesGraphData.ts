import { productService } from "@/lib/services/productService";
import { useQuery } from "@tanstack/react-query";

export function useProductCategoriesGraphData() {
    return useQuery({
        queryKey: ["product-category-graph"],
        queryFn: () => productService.getCategoryGraphData(),
    });
}
