import { inventoryService } from "@/lib/services/inventoryService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useStockAdjustment() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: FormData | object) =>
            inventoryService.adjustInventory(payload),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["inventories"] }),
    });
}
