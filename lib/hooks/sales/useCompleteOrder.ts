import { saleService } from "@/lib/services/saleService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCompleteOrder() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (params: { saleId?: string; payload: FormData | object }) =>
            saleService.completeOrder(params),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["sales"] });
            queryClient.invalidateQueries({ queryKey: ["sale"] });
        },
    });
}
