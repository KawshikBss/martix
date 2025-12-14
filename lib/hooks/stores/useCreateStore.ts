import { storeService } from "@/lib/services/storeService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateStore() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: FormData | object) =>
            storeService.createStore(payload),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["stores"] }),
    });
}
