import { apiClient } from "../core/apiClient";
import { PaginatedResponse } from "../core/PaginatedResponse";
import { CustomerInterface } from "../interfaces/CustomerInterface";
import { SaleInterface } from "../interfaces/SaleInterface";
import { SalesProduct } from "../interfaces/SalesProduct";
import { UserInterface } from "../interfaces/UserInterface";

export const saleService = {
    getSaleProducts: async (params: {
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
            `sales/products?store=${params?.storeId ?? ""}&page=${
                params?.page ?? 1
            }&query=${params?.query ?? ""}&${Object.entries(
                params?.filters ?? {},
            )
                .map((item) => (item[1].length ? `${item[0]}=${item[1]}` : ""))
                .join("&")}`,
        ),

    getCustomers: async (params: {
        query?: string;
        store?: string;
        page?: number;
    }): Promise<PaginatedResponse<UserInterface>> =>
        await apiClient.get(
            `customers?store=${params?.store ?? ""}&query=${
                params?.query ?? ""
            }`,
        ),

    createCustomer: async (
        payload: FormData | object,
    ): Promise<CustomerInterface> => await apiClient.post("customers", payload),

    getOrders: async (params: {
        query?: string;
        page?: number;
        saleType?: string;
        filters?: {
            store: string;
            user: string;
            payment_status: string;
            status: string;
            min_order_value: string;
            max_order_value: string;
            min_create_date: string;
            max_create_date: string;
            min_update_date: string;
            max_update_date: string;
        };
    }): Promise<PaginatedResponse<SaleInterface>> =>
        await apiClient.get(
            `sales?page=${params?.page ?? 1}&sale_type=${params?.saleType ?? "order"}
            &query=${params?.query ?? ""}&${Object.entries(
                params?.filters ?? {},
            )
                .map((item) => (item[1].length ? `${item[0]}=${item[1]}` : ""))
                .join("&")}`,
        ),

    getOrder: async (id?: string): Promise<SaleInterface> =>
        await apiClient.get(`sales/${id}`),

    createOrder: async (payload: FormData | object): Promise<SaleInterface> =>
        await apiClient.post("sales", payload),

    completeOrder: async (params: {
        saleId?: string;
        payload: FormData | object;
    }): Promise<SaleInterface> =>
        await apiClient.post(
            `sales/${params?.saleId}/complete`,
            params?.payload,
        ),

    refundOrder: async (params: {
        saleId?: string;
        payload: FormData | object;
    }): Promise<SaleInterface> =>
        await apiClient.post(`sales/${params?.saleId}/refund`, params?.payload),

    cancelOrder: async (params: {
        saleId?: string;
        payload: FormData | object;
    }): Promise<SaleInterface> =>
        await apiClient.post(`sales/${params?.saleId}/cancel`, params?.payload),

    getSaleMetrics: async ({ pos = true }): Promise<any> =>
        await apiClient.get(`sales/${pos ? "pos" : "order"}-metrics`),

    getSalesGraphData: async (): Promise<any> =>
        await apiClient.get("sales/graph?sale_type=pos"),

    getOrdersGraphData: async (): Promise<any> =>
        await apiClient.get("sales/graph?sale_type=order"),
};
