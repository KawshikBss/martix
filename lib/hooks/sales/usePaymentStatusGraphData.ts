import { saleService } from "@/lib/services/saleService";
import { useQuery } from "@tanstack/react-query";

export function usePaymentStatusGraphData() {
    return useQuery({
        queryKey: ["payment-status-graph"],
        queryFn: () => saleService.getPaymentStatusGraphData(),
    });
}
