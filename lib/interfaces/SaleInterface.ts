export interface SaleInterface {
    id: string;
    user_id: string;
    store_id: string;
    customer_id: string;
    sub_total: number;
    tax_total: number;
    discount_total: number;
    grand_total: number;
    paid_amount: number;
    due_amount: number;
    payment_method: string;
    sale_number: string;
    payment_status: string;
}
