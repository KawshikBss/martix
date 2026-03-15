import { inventoryService } from "@/lib/services/inventoryService";
import { useQuery } from "@tanstack/react-query";

export function useInventoryTransferLevelsGraphData() {
    return useQuery({
        queryKey: ["inventory-transfer-levels-graph"],
        queryFn: () => inventoryService.getTransferLevelsGraphData(),
    });
}
