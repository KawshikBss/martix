import { categoryService } from "@/lib/services/categoryService";
import { useQuery } from "@tanstack/react-query";

export function useCategory(id?: string) {
    return useQuery({
        queryKey: ["category", id],
        queryFn: () => categoryService.getCategory(id),
    });
}
