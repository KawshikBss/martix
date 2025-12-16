import { CategoryInterface } from "./CategoryInterface";

export interface ProductInterface {
    id: string;
    image_url: string;
    name: string;
    sku: string;
    category: CategoryInterface;
    description: string;
    cost_price: number;
    tax_type: string;
    tax_rate: number;
    category_id: string;
    brand: string;
    tags: string;
}
