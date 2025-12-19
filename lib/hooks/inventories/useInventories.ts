import { inventoryService } from "@/lib/services/inventoryService";
import { useQuery } from "@tanstack/react-query";

export function useInventories() {
    return useQuery({
        queryKey: ["inventories"],
        queryFn: () => inventoryService.getInventories(),
    });
}
