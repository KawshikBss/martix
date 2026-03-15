import { saleService } from "@/lib/services/saleService";
import { useQuery } from "@tanstack/react-query";

export function usePaymentsGraphData() {
    return useQuery({
        queryKey: ["payments-graph"],
        queryFn: () => saleService.getPaymentGraphData(),
    });
}
