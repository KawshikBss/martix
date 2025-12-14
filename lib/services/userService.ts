import { apiClient } from "../core/apiClient";
import { UserInterface } from "../interfaces/UserInterface";

export const userService = {
    getUsers: async (): Promise<UserInterface[]> =>
        await apiClient.get("users"),
};
