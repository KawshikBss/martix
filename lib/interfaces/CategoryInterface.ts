import { StoreInterface } from "./StoreIntefrace";

export interface CategoryInterface {
    id: string;
    name: string;
    slug: string;
    image: string;
    image_url: string;
    parent_id: string;
    visible_stores: string[];
    status: string;
    children?: CategoryInterface[];
    visible_to_stores?: StoreInterface[];
}
