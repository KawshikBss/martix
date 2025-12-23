import { apiClient } from "../core/apiClient";
import { StoreInterface } from "../interfaces/StoreIntefrace";

export const storeService = {
    getStores: async (params: {
        query?: string;
        filters?: {
            manager?: string;
            branch?: string;
            location?: string;
            status?: string;
            stock_level?: string;
            type?: string;
            min_inventory_value?: string;
            max_inventory_value?: string;
            has_staff?: string;
            has_expired_products?: string;
            min_create_date?: string;
            max_create_date?: string;
            min_update_date?: string;
            max_update_date?: string;
        };
    }): Promise<StoreInterface[]> =>
        await apiClient.get(
            `stores?query=${params?.query ?? ""}&${Object.entries(
                params?.filters ?? {}
            )
                .map((item) => (item[1].length ? `${item[0]}=${item[1]}` : ""))
                .join("&")}`
        ),

    getStore: async (id?: string): Promise<StoreInterface> =>
        await apiClient.get(`stores/${id}`),

    createStore: async (payload: FormData | object): Promise<StoreInterface> =>
        await apiClient.post("stores", payload),

    updateStore: async (params: {
        id?: string;
        payload: FormData | object;
    }): Promise<StoreInterface> =>
        await apiClient.post(`stores/update/${params.id}`, params.payload),
    toggleStoreStatus: async (id?: string): Promise<any> =>
        await apiClient.get(`stores/toggle-status/${id}`),
};
