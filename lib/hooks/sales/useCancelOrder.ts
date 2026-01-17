import { saleService } from "@/lib/services/saleService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCancelOrder() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (params: { saleId?: string; payload: FormData | object }) =>
            saleService.cancelOrder(params),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["sales"] });
            queryClient.invalidateQueries({ queryKey: ["sale"] });
        },
    });
}
