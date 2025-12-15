import { storeService } from "@/lib/services/storeService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateStore() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (params: { id?: string; payload: FormData | object }) =>
            storeService.updateStore(params),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["stores"] }),
    });
}
