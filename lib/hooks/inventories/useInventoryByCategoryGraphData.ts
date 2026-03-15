import { inventoryService } from "@/lib/services/inventoryService";
import { useQuery } from "@tanstack/react-query";

export function useInventoryByCategoryGraphData() {
    return useQuery({
        queryKey: ["inventory-by-category-graph"],
        queryFn: () => inventoryService.getCategoryGraphData(),
    });
}
