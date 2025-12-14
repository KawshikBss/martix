import { apiClient } from "../core/apiClient";
import { RoleInterface } from "../interfaces/RoleInterface";

export const roleService = {
    getRoles: async (): Promise<RoleInterface[]> =>
        await apiClient.get("roles"),
};
