import { apiClient } from "../core/apiClient";
import { PaginatedResponse } from "../core/PaginatedResponse";
import { NotificationInterface } from "../interfaces/NotificationInterface";

export const notificationService = {
    getNotifications: async (params: {
        page: number;
    }): Promise<PaginatedResponse<NotificationInterface>> =>
        await apiClient.get(`notifications?page=${params?.page ?? 1}`),
    getUnreadCount: async (): Promise<any> =>
        await apiClient.get("notifications/unread-count"),
};
