import { apiClient } from "../core/apiClient";
import { PaginatedResponse } from "../core/PaginatedResponse";
import { ProductInterface } from "../interfaces/ProductInterface";

export const productService = {
    getProducts: async (params: {
        query?: string;
        page?: number;
        filters?: {
            category: string;
            product_type: string;
            min_price: string;
            max_price: string;
            stock_level: string;
            status: string;
            brand: string;
            tag: string;
            has_expiry_date: string;
            expiring_soon: string;
            has_barcode: string;
            has_variants: string;
            min_create_date: string;
            max_create_date: string;
            min_update_date: string;
            max_update_date: string;
        };
    }): Promise<PaginatedResponse<ProductInterface>> =>
        await apiClient.get(
            `products?page=${params?.page ?? 1}&query=${
                params?.query ?? ""
            }&${Object.entries(params?.filters ?? {})
                .map((item) => (item[1].length ? `${item[0]}=${item[1]}` : ""))
                .join("&")}`
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
