import { InventoryInterface } from "./InventoryInterface";
import { RoleInterface } from "./RoleInterface";
import { UserInterface } from "./UserInterface";

export interface StoreInterface {
    id: string;
    name: string;
    image: string;
    image_url: string;
    unique_id: string;
    branch: string;
    type: string;
    description: string;
    email: string;
    phone: string;
    address: string;
    address_2: string;
    current_inventory_count: number;
    current_inventory_value: number;
    low_stock_items_count: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    manager_id: string;
    manager: UserInterface;
    owner: UserInterface;
    staff: {
        role: RoleInterface;
        user: UserInterface;
    }[];
    inventories: InventoryInterface[];
}
