import * as React from "react";
import { StoresListItem } from "./StoresListItem";
import { Order } from "@/public/data/ordersData";

export interface IStoresListProps {
  data: Order[];
}

export function StoresList(props: IStoresListProps) {
  return (
    <div className="md:hidden mt-4">
      {props.data.length === 0 && <p>No stores found.</p>}
      {props.data.length > 0 && (
        <>
          <span className="text-center text-gray-500">
            Showing {props.data.length} stores
          </span>
          <div className="space-y-4 mt-4">
            {props.data.map((product) => (
              <StoresListItem key={product.id} product={product} />
            ))}
          </div>
          <div className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-4 py-1 rounded-full w-fit mx-auto">
            See More
          </div>
        </>
      )}
    </div>
  );
}
