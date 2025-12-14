import { storeService } from "@/lib/services/storeService";
import { useQuery } from "@tanstack/react-query";

export function useStores() {
    return useQuery({
        queryKey: ["stores"],
        queryFn: () => storeService.getStores(),
    });
}
