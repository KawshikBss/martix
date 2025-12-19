import { inventoryService } from "@/lib/services/inventoryService";
import { useQuery } from "@tanstack/react-query";

export function useInventoryMovements() {
    return useQuery({
        queryKey: ["inventory-movements"],
        queryFn: () => inventoryService.getInventoryMovements(),
    });
}
