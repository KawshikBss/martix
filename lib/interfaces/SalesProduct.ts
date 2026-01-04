import { CategoryInterface } from "./CategoryInterface";

export interface SalesProduct {
    product_id: number;
    name: string;
    image: string;
    tax: number;
    total_stock: number;
    price_range: { min: number; max: number };
    variants: SalesVariant[];
    category: CategoryInterface;
}

export interface SalesVariant {
    inventory_id: number;
    product_id: number;
    variation: { option: string; value: string } | null;
    price: number;
    stock: number;
}
