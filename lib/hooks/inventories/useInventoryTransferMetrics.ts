import { inventoryService } from "@/lib/services/inventoryService";
import { useQuery } from "@tanstack/react-query";

export function useInventoryTransferMetrics() {
    return useQuery({
        queryKey: ["inventory-transfer-metrics"],
        queryFn: () => inventoryService.getInventoryTransferMetrics(),
    });
}
