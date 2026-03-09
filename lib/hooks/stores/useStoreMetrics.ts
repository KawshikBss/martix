import { storeService } from "@/lib/services/storeService";
import { useQuery } from "@tanstack/react-query";

export function useStoreMetrics() {
    return useQuery({
        queryKey: ["store-metrics"],
        queryFn: () => storeService.getStoreMetrics(),
    });
}
