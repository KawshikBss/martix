import { apiClient } from "../core/apiClient";
import { PaginatedResponse } from "../core/PaginatedResponse";
import { CustomerInterface } from "../interfaces/CustomerInterface";
import { SalesProduct } from "../interfaces/SalesProduct";
import { UserInterface } from "../interfaces/UserInterface";

export const saleService = {
    getPosProducts: async (params: {
        storeId?: string;
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
    }): Promise<PaginatedResponse<SalesProduct>> =>
        await apiClient.get(
            `pos/products?store=${params?.storeId ?? ""}&page=${
                params?.page ?? 1
            }&query=${params?.query ?? ""}&${Object.entries(
                params?.filters ?? {}
            )
                .map((item) => (item[1].length ? `${item[0]}=${item[1]}` : ""))
                .join("&")}`
        ),
    getCustomers: async (params: {
        query?: string;
        store?: string;
        page?: number;
    }): Promise<PaginatedResponse<UserInterface>> =>
        await apiClient.get(
            `customers?store=${params?.store ?? ""}&query=${
                params?.query ?? ""
            }`
        ),

    createCustomer: async (
        payload: FormData | object
    ): Promise<CustomerInterface> => await apiClient.post("customers", payload),
};
