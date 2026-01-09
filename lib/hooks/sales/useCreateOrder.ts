import { saleService } from "@/lib/services/saleService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateOrder() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: FormData | object) =>
            saleService.createOrder(payload),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["sales"] }),
    });
}
