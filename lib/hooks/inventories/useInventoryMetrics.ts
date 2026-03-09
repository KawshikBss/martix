import { inventoryService } from "@/lib/services/inventoryService";
import { useQuery } from "@tanstack/react-query";

export function useInventoryMetrics() {
    return useQuery({
        queryKey: ["inventory-metrics"],
        queryFn: () => inventoryService.getInventoryMetrics(),
    });
}
