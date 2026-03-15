import { storeService } from "@/lib/services/storeService";
import { useQuery } from "@tanstack/react-query";

export function useStoreStocksGraphData() {
    return useQuery({
        queryKey: ["store-stocks-graph"],
        queryFn: () => storeService.getStocksGraphData(),
    });
}
