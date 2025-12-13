import { categoryService } from "@/lib/services/categoryService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id?: string) => categoryService.deleteCategory(id),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["categories"] }),
    });
}
