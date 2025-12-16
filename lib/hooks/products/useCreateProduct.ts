import { productService } from "@/lib/services/productService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateProduct() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: FormData | object) =>
            productService.createProduct(payload),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["products"] }),
    });
}
