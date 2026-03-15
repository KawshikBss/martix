import { inventoryService } from "@/lib/services/inventoryService";
import { useQuery } from "@tanstack/react-query";

export function useInventoryTransfersByStoresGraphData() {
    return useQuery({
        queryKey: ["inventory-transfer-stores-graph"],
        queryFn: () => inventoryService.getTransferByStoresGraphData(),
    });
}
