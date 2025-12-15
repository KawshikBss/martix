import { storeService } from "@/lib/services/storeService";
import { useQuery } from "@tanstack/react-query";

export function useStores(query?: string) {
    return useQuery({
        queryKey: ["stores", query],
        queryFn: () => storeService.getStores(query),
    });
}
