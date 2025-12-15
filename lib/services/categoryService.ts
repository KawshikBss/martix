import { apiClient } from "../core/apiClient";
import { CategoryInterface } from "../interfaces/CategoryInterface";

export const categoryService = {
    getCategories: async (): Promise<CategoryInterface[]> => {
        return await apiClient.get("categories");
    },

    getParentCategories: async (
        query?: string
    ): Promise<CategoryInterface[]> => {
        return await apiClient.get(
            `categories?only_parents=true${query ? `&query=${query}` : ""}`
        );
    },

    getCategory: async (id?: string): Promise<CategoryInterface> => {
        return await apiClient.get(`categories/${id}`);
    },

    createCategory: async (
        payload: FormData | object
    ): Promise<CategoryInterface> => {
        return await apiClient.post("categories", payload);
    },

    updateCategory: async (params: {
        id?: string;
        payload: FormData | object;
    }): Promise<CategoryInterface> => {
        return await apiClient.post(
            `categories/update/${params.id}`,
            params.payload
        );
    },

    deleteCategory: async (id?: string): Promise<any> => {
        return await apiClient.delete(`categories/${id}`);
    },
};
