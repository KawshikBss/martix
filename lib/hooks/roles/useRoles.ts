import { roleService } from "@/lib/services/roleService";
import { useQuery } from "@tanstack/react-query";

export function useRoles() {
    return useQuery({
        queryKey: ["roles"],
        queryFn: () => roleService.getRoles(),
    });
}
