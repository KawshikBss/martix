import { storeService } from "@/lib/services/storeService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useToggleStoreStatus() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id?: string) => storeService.toggleStoreStatus(id),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["stores"] }),
    });
}
