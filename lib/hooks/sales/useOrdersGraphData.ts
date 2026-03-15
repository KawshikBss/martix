import { saleService } from "@/lib/services/saleService";
import { useQuery } from "@tanstack/react-query";

export function useOrdersGraphData() {
    return useQuery({
        queryKey: ["orders-graph"],
        queryFn: () => saleService.getOrdersGraphData(),
    });
}
