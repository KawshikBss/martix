import { categoryService } from "@/lib/services/categoryService";
import { useQuery } from "@tanstack/react-query";

export function useCategories(query?: string) {
    return useQuery({
        queryKey: ["categories", query],
        queryFn: () => categoryService.getCategories(),
    });
}
