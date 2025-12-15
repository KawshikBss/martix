import { categoryService } from "@/lib/services/categoryService";
import { useQuery } from "@tanstack/react-query";

export function useParentCategories(query?: string) {
    return useQuery({
        queryKey: ["parent-categories", query],
        queryFn: () => categoryService.getParentCategories(query),
    });
}
