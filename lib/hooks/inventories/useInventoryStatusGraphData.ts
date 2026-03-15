import { inventoryService } from "@/lib/services/inventoryService";
import { useQuery } from "@tanstack/react-query";

export function useInventoryStatusGraphData() {
    return useQuery({
        queryKey: ["inventory-status-graph"],
        queryFn: () => inventoryService.getStatusGraphData(),
    });
}
