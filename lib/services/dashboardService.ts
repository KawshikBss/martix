import { apiClient } from "../core/apiClient";

export const dashboardService = {
    getDashboardMetrics: async (): Promise<any> =>
        await apiClient.get("dashboard/metrics"),
};
