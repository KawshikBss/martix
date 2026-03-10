import { inventoryService } from "@/lib/services/inventoryService";
import { useQuery } from "@tanstack/react-query";

export function useInventoryMovementMetrics() {
    return useQuery({
        queryKey: ["inventory-movement-metrics"],
        queryFn: () => inventoryService.getInventoryMovementMetrics(),
    });
}
