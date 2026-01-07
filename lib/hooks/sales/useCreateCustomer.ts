import { saleService } from "@/lib/services/saleService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateCustomer() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: FormData | object) =>
            saleService.createCustomer(payload),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["customers"] }),
    });
}
