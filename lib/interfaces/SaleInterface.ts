import { CustomerInterface } from "./CustomerInterface";
import { SaleItemInterface } from "./SaleItemInterface";
import { StoreInterface } from "./StoreIntefrace";
import { UserInterface } from "./UserInterface";

export interface SaleInterface {
    id: string;
    user_id: string;
    user?: UserInterface;
    store_id: string;
    store?: StoreInterface;
    customer_id: string;
    customer?: CustomerInterface;
    sub_total: number;
    tax_total: number;
    discount_total: number;
    grand_total: number;
    paid_amount: number;
    due_amount: number;
    payment_method: string;
    sale_number: string;
    payment_status: string;
    status: string;
    created_at: string;
    items: SaleItemInterface[];
}
