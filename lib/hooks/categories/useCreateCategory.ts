import { categoryService } from "@/lib/services/categoryService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: FormData | object) =>
            categoryService.createCategory(payload),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["categories"] }),
    });
}
