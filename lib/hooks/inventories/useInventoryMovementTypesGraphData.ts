import { inventoryService } from "@/lib/services/inventoryService";
import { useQuery } from "@tanstack/react-query";

export function useInventoryMovementTypesGraphData() {
    return useQuery({
        queryKey: ["inventory-movement-types-graph"],
        queryFn: () => inventoryService.getMovementTypesGraphData(),
    });
}
