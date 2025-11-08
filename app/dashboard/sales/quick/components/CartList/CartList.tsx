import { IProduct } from "@/public/data/productsData";
import * as React from "react";
import { CartListItem } from "./CartListItem";

export interface ICartListProps {
  data: IProduct[];
}

export function CartList(props: ICartListProps) {
  return (
    <div className="md:hidden mt-6">
      {props.data.length === 0 && <p>No items found.</p>}
      {props.data.length > 0 && (
        <div className="space-y-4 mt-4">
          {props.data.map((product) => (
            <CartListItem key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
