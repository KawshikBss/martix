import { apiClient } from "../core/apiClient";
import { PaginatedResponse } from "../core/PaginatedResponse";
import { InventoryInterface } from "../interfaces/InventoryInterface";
import { InventoryMovementInterface } from "../interfaces/InventoryMovementInterface";

export const inventoryService = {
    getInventories: async (params: {
        query?: string;
        page?: number;
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
            has_low_stock?: string;
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

    adjustInventory: async (payload: FormData | object): Promise<any> =>
        await apiClient.post("inventories/adjustment", payload),

    getInventoryMovements: async (): Promise<InventoryMovementInterface[]> =>
        await apiClient.get("inventories/movements"),
};
