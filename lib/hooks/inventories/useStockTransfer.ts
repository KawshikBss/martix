import { inventoryService } from "@/lib/services/inventoryService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useStockTransfer() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: FormData | object) =>
            inventoryService.transferInventory(payload),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["inventories"] }),
    });
}
