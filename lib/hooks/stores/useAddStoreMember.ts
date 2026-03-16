import { storeService } from "@/lib/services/storeService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAddStoreMember() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (params: { id?: string; payload: FormData | object }) =>
            storeService.addMember(params),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["stores", "store"] }),
    });
}
