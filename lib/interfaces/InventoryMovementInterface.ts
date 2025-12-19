import { InventoryInterface } from "./InventoryInterface";
import { UserInterface } from "./UserInterface";

export interface InventoryMovementInterface {
    id: string;
    inventory: InventoryInterface;
    type: string;
    quantity: number;
    reference_text: string;
    reference_id: string;
    performed_by: UserInterface;
    current_stock_value: number;
    updated_at: string;
}
