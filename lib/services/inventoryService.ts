import { apiClient } from "../core/apiClient";
import { PaginatedResponse } from "../core/PaginatedResponse";
import { InventoryInterface } from "../interfaces/InventoryInterface";
import { InventoryMovementInterface } from "../interfaces/InventoryMovementInterface";
import { InventoryTransferInterface } from "../interfaces/InventoryTransferInterface";

export const inventoryService = {
    getInventories: async (params: {
        query?: string;
        page?: number;
        filters?: {
            store?: string;
            status?: string;
            category?: string;
            brand?: string;
            min_inventory_value?: string;
            max_inventory_value?: string;
            has_expired_products?: string;
            has_soon_expiring_products?: string;
            min_create_date?: string;
            max_create_date?: string;
            min_update_date?: string;
            max_update_date?: string;
        };
    }): Promise<PaginatedResponse<InventoryInterface>> =>
        await apiClient.get(
            `inventories?page=${params?.page ?? 1}&query=${
                params?.query ?? ""
            }&${Object.entries(params?.filters ?? {})
                .map((item) => (item[1].length ? `${item[0]}=${item[1]}` : ""))
                .join("&")}`,
        ),

    findInventory: async (
        storeId: string,
        productId: string,
    ): Promise<
        { inventory: InventoryInterface } | { message: string } | undefined
    > =>
        await apiClient.post("inventories/find", {
            store: storeId,
            product: productId,
        }),

    transferInventory: async (payload: FormData | object): Promise<any> =>
        await apiClient.post("inventories/transfer", payload),

    getInventoryTransfers: async (params: {
        query?: string;
        page?: number;
        filters?: {
            user?: string;
            store?: string;
            product?: string;
            status?: string;
            min_create_date?: string;
            max_create_date?: string;
            min_update_date?: string;
            max_update_date?: string;
        };
    }): Promise<PaginatedResponse<InventoryTransferInterface>> =>
        await apiClient.get(
            `inventories/transfers?page=${params?.page ?? 1}&query=${
                params?.query ?? ""
            }&${Object.entries(params?.filters ?? {})
                .map((item) => (item[1].length ? `${item[0]}=${item[1]}` : ""))
                .join("&")}`,
        ),

    adjustInventory: async (payload: FormData | object): Promise<any> =>
        await apiClient.post("inventories/adjustment", payload),

    getInventoryMovements: async (params: {
        query?: string;
        page?: number;
        filters?: {
            user?: string;
            store?: string;
            product?: string;
            adjustment_type?: string;
            reason?: string;
            min_create_date?: string;
            max_create_date?: string;
            min_update_date?: string;
            max_update_date?: string;
        };
    }): Promise<PaginatedResponse<InventoryMovementInterface>> =>
        await apiClient.get(
            `inventories/movements?page=${params?.page ?? 1}&query=${
                params?.query ?? ""
            }&${Object.entries(params?.filters ?? {})
                .map((item) => (item[1].length ? `${item[0]}=${item[1]}` : ""))
                .join("&")}`,
        ),

    getInventoryMetrics: async (): Promise<any> =>
        await apiClient.get("inventories/metrics"),

    getInventoryTransferMetrics: async (): Promise<any> =>
        await apiClient.get("inventories/transfer-metrics"),

    getInventoryMovementMetrics: async (): Promise<any> =>
        await apiClient.get("inventories/movement-metrics"),

    getStatusGraphData: async (): Promise<any> =>
        await apiClient.get("inventories/status-graph"),

    getCategoryGraphData: async (): Promise<any> =>
        await apiClient.get("inventories/category-value-graph"),

    getMovementLevelsGraphData: async (): Promise<any> =>
        await apiClient.get("inventories/movement-levels-graph"),

    getMovementTypesGraphData: async (): Promise<any> =>
        await apiClient.get("inventories/movement-types-graph"),

    getTransferLevelsGraphData: async (): Promise<any> =>
        await apiClient.get("inventories/transfer-levels-graph"),

    getTransferByStoresGraphData: async (): Promise<any> =>
        await apiClient.get("inventories/transfer-stores-graph"),
};
