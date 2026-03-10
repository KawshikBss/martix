import { dashboardService } from "@/lib/services/dashboardService";
import { useQuery } from "@tanstack/react-query";

export function useDashboardMetrics() {
    return useQuery({
        queryKey: ["dashboard-metrics"],
        queryFn: () => dashboardService.getDashboardMetrics(),
    });
}
