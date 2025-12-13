import { apiClient } from "../core/apiClient";
import { CategoryInterface } from "../interfaces/CategoryInterface";

export const categoryService = {
    getCategories: async (): Promise<CategoryInterface[]> => {
        return await apiClient.get("categories");
    },

    getParentCategories: async (): Promise<CategoryInterface[]> => {
        return await apiClient.get("categories?only_parents=true");
    },

    createCategory: async (
        payload: FormData | object
    ): Promise<CategoryInterface> => {
        return await apiClient.post("categories", payload);
    },
};
