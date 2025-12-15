import { storeService } from "@/lib/services/storeService";
import { useQuery } from "@tanstack/react-query";

export function useStore(id?: string) {
    return useQuery({
        queryKey: ["store", id],
        queryFn: () => storeService.getStore(id),
    });
}
