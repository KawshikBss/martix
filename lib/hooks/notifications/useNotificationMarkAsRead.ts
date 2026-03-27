import { notificationService } from "@/lib/services/notificationService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useNotificationMarkAsRead() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id?: string) => notificationService.markAsRead(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
            queryClient.invalidateQueries({
                queryKey: ["notifications-unread-count"],
            });
        },
    });
}
