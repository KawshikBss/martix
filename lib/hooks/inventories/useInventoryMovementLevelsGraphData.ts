import { inventoryService } from "@/lib/services/inventoryService";
import { useQuery } from "@tanstack/react-query";

export function useInventoryMovementLevelsGraphData() {
    return useQuery({
        queryKey: ["inventory-movement-levels-graph"],
        queryFn: () => inventoryService.getMovementLevelsGraphData(),
    });
}
