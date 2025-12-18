import { CategoryInterface } from "./CategoryInterface";

export interface ProductInterface {
    id: string;
    image_url: string;
    name: string;
    variation_meta: string;
    sku: string;
    category: CategoryInterface;
    description: string;
    current_stock_quantity: number;
    cost_price: number;
    tax_type: string;
    tax_rate: number;
    category_id: string;
    brand: string;
    tags: string;
    variants: ProductInterface[];
}
