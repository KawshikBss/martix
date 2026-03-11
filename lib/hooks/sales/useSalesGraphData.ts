import { saleService } from "@/lib/services/saleService";
import { useQuery } from "@tanstack/react-query";

export function useSalesGraphData() {
    return useQuery({
        queryKey: ["sales-graph"],
        queryFn: () => saleService.getSalesGraphData(),
    });
}
