import { apiClient } from "../core/apiClient";
import { UserInterface } from "../interfaces/UserInterface";

export const authService = {
    login: async (
        email: string,
        password: string
    ): Promise<{ token?: string; user?: UserInterface }> => {
        return apiClient.post("login", { email, password });
    },

    signup: async (
        name: string,
        email: string,
        phone: string,
        password: string
    ): Promise<{ token?: string; user?: UserInterface }> => {
        return apiClient.post("register", { name, email, phone, password });
    },

    getUser: async (): Promise<UserInterface> => {
        return apiClient.get("user");
    },

    updateUser: async (payload: object): Promise<UserInterface> => {
        return apiClient.post("user-update", payload);
    },

    updatePassword: async (
        currentPassword: string,
        newPassword: string
    ): Promise<{ message?: string; error?: string }> => {
        return apiClient.post("password-update", {
            current_password: currentPassword,
            new_password: newPassword,
        });
    },
};
