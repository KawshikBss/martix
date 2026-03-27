import { inventoryService } from "@/lib/services/inventoryService";
import { notificationService } from "@/lib/services/notificationService";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useNotifications() {
    return useInfiniteQuery({
        queryKey: ["notifications"],
        queryFn: ({ pageParam = 1 }) =>
            notificationService.getNotifications({ page: pageParam }),
        getNextPageParam: (lastPage) => {
            const { current_page, last_page } = lastPage;
            return current_page < last_page ? current_page + 1 : undefined;
        },
        initialPageParam: 1,
    });
}
