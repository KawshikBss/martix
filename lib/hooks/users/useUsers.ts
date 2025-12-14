import { userService } from "@/lib/services/userService";
import { useQuery } from "@tanstack/react-query";

export function useUsers() {
    return useQuery({
        queryKey: ["users"],
        queryFn: () => userService.getUsers(),
    });
}
