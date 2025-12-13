import { categoryService } from "@/lib/services/categoryService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (params: { id?: string; payload: FormData | object }) =>
            categoryService.updateCategory(params),
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: ["categories", "category"],
            }),
    });
}
