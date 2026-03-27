import { notificationService } from "@/lib/services/notificationService";
import { useQuery } from "@tanstack/react-query";

export function useUnreadNotificationsCount() {
    return useQuery({
        queryKey: ["notifications-unread-count"],
        queryFn: () => notificationService.getUnreadCount(),
    });
}
