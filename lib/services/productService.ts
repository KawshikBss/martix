import { apiClient } from "../core/apiClient";
import { ProductInterface } from "../interfaces/ProductInterface";

export const productService = {
    getProducts: async (params: {
        query?: string;
        category?: string;
        stockStatus?: string;
        minPrice?: string;
        maxPrice?: string;
    }): Promise<ProductInterface[]> =>
        await apiClient.get(
            `products?query=${params?.query ?? ""}&category=${
                params.category ?? ""
            }&stock_status=${params.stockStatus ?? ""}&min_price=${
                params.minPrice ?? ""
            }&max_price=${params.maxPrice ?? ""}`
        ),

    getProduct: async (id?: string): Promise<ProductInterface> =>
        await apiClient.get(`products/${id}`),

    createProduct: async (
        payload: FormData | object
    ): Promise<ProductInterface> => await apiClient.post("products", payload),

    updateProduct: async (params: {
        id?: string;
        payload: FormData | object;
    }): Promise<ProductInterface> =>
        await apiClient.post(`products/update/${params.id}`, params.payload),
};
