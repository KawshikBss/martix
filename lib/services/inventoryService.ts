import { apiClient } from "../core/apiClient";
import { InventoryInterface } from "../interfaces/InventoryInterface";
import { InventoryMovementInterface } from "../interfaces/InventoryMovementInterface";

export const inventoryService = {
    getInventories: async (): Promise<InventoryInterface[]> =>
        await apiClient.get("inventories"),
    getInventoryMovements: async (): Promise<InventoryMovementInterface[]> =>
        await apiClient.get("inventories/movements"),
};
