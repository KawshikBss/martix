import { ProductInterface } from "./ProductInterface";

export interface SaleItemInterface {
    id: string;
    product: ProductInterface;
    quantity: number;
    price: number;
    tax: number;
    discount: number;
    total: number;
    created_at: string;
}
