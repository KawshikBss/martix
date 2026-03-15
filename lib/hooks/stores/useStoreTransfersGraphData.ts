import { storeService } from "@/lib/services/storeService";
import { useQuery } from "@tanstack/react-query";

export function useStoreTransfersGraphData() {
    return useQuery({
        queryKey: ["store-transfers-graph"],
        queryFn: () => storeService.getTransfersGraphData(),
    });
}
