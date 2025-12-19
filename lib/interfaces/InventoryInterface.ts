import { ProductInterface } from "./ProductInterface";
import { StoreInterface } from "./StoreIntefrace";

export interface InventoryInterface {
    id: string;
    initial_quantity: number;
    quantity: number;
    reorder_level: number;
    barcode: string;
    selling_price: number;
    expiry_date: string;
    store: StoreInterface;
    product: ProductInterface;
}
