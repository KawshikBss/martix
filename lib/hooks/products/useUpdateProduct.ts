import { productService } from "@/lib/services/productService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateProduct() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (params: { id?: string; payload: FormData | object }) =>
            productService.updateProduct(params),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["products"] }),
    });
}
