import { CategoryInterface } from "./CategoryInterface";
import { InventoryInterface } from "./InventoryInterface";
import { UserInterface } from "./UserInterface";

export interface ProductInterface {
    id: string;
    image_url: string;
    name: string;
    variation_meta: { option: string; value: string };
    sku: string;
    category: CategoryInterface;
    description: string;
    current_stock_quantity: number;
    cost_price: number;
    min_selling_price: number;
    max_selling_price: number;
    tax_type: string;
    tax_rate: number;
    category_id: string;
    brand: string;
    tags: string;
    variants: ProductInterface[];
    inventories: InventoryInterface[];
    is_active: boolean;
    owner: UserInterface;
    created_at: string;
    updated_at: string;
}
