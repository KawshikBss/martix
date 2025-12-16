import { apiClient } from "../core/apiClient";
import { ProductInterface } from "../interfaces/ProductInterface";

export const productService = {
    getProducts: async (): Promise<ProductInterface[]> =>
        await apiClient.get("products"),

    getProduct: async (id?: string): Promise<ProductInterface> =>
        await apiClient.get(`products/${id}`),

    createProduct: async (
        payload: FormData | object
    ): Promise<ProductInterface> => await apiClient.post("products", payload),

    updateProduct: async (params: {
        id?: string;
        payload: FormData | object;
    }): Promise<ProductInterface> =>
        await apiClient.post(`products/${params.id}`, params.payload),
};
