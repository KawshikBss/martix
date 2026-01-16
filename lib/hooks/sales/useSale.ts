import { saleService } from "@/lib/services/saleService";
import { useQuery } from "@tanstack/react-query";

export function useSale(saleId?: string) {
    return useQuery({
        queryKey: ["sale", saleId],
        queryFn: () => saleService.getOrder(saleId),
    });
}
