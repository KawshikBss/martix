import { UserInterface } from "./UserInterface";

export interface StoreInterface {
    id: string;
    name: string;
    image: string;
    image_url: string;
    unique_id: string;
    branch: string;
    type: string;
    email: string;
    phone: string;
    address: string;
    address_2: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    manager_id: string;
    manager: UserInterface;
    owner: UserInterface;
}
