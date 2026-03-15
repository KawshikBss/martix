import { saleService } from "@/lib/services/saleService";
import { useQuery } from "@tanstack/react-query";

export function useStatusGraphData() {
    return useQuery({
        queryKey: ["status-graph"],
        queryFn: () => saleService.getStatusGraphData(),
    });
}
