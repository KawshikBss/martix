import { apiClient } from "../core/apiClient";
import { StoreInterface } from "../interfaces/StoreIntefrace";

export const storeService = {
    getStores: async (): Promise<StoreInterface[]> =>
        await apiClient.get("stores"),

    getStore: async (id?: string): Promise<StoreInterface> =>
        await apiClient.get(`stores/${id}`),

    createStore: async (payload: FormData | object): Promise<StoreInterface> =>
        await apiClient.post("stores", payload),

    updateStore: async (params: {
        id?: string;
        payload: FormData | object;
    }): Promise<StoreInterface> =>
        await apiClient.post(`stores/update/${params.id}`, params.payload),
};
