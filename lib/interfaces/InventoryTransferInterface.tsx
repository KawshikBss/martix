import { InventoryInterface } from "./InventoryInterface";
import { UserInterface } from "./UserInterface";

export interface InventoryTransferInterface {
    id: string;
    transfer_number: string;
    status: string;
    notes: string;
    source_inventory: InventoryInterface;
    destination_inventory: InventoryInterface;
    created_by: UserInterface;
    created_at: string;
    updated_at: string;
}
