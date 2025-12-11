import { RoleInterface } from "./RoleInterface";

export interface UserInterface {
    id: string;
    name: string;
    image: string;
    email: string;
    phone: string;
    address: string;
    nid: string;
    role: RoleInterface;
    tfa_enabled: boolean;
}
