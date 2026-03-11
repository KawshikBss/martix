import { storeService } from "@/lib/services/storeService";
import { useQuery } from "@tanstack/react-query";

export function useStoreSalesGraphData() {
    return useQuery({
        queryKey: ["store-sales-graph"],
        queryFn: () => storeService.getSalesGraphData(),
    });
}
