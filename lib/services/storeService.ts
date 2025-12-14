import { apiClient } from "../core/apiClient";
import { StoreInterface } from "../interfaces/StoreIntefrace";

export const storeService = {
    getStores: async (): Promise<StoreInterface[]> =>
        await apiClient.get("stores"),
    createStore: async (payload: FormData | object): Promise<StoreInterface> =>
        await apiClient.post("stores", payload),
};
