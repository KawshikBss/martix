import { saleService } from "@/lib/services/saleService";
import { useQuery } from "@tanstack/react-query";

export function useRevenueGraphData() {
    return useQuery({
        queryKey: ["revenue-graph"],
        queryFn: () => saleService.getRevenueGraphData(),
    });
}
