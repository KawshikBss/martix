import { saleService } from "@/lib/services/saleService";
import { useQuery } from "@tanstack/react-query";

export function useSaleMetrics(pos = true) {
    return useQuery({
        queryKey: [`${pos ? "pos" : "order"}-sale-metrics`],
        queryFn: () => saleService.getSaleMetrics({ pos }),
    });
}
