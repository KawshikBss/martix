import { IProduct } from "@/public/data/productsData";
import * as React from "react";
import { ProductsListItem } from "./ProductsListItem";

export interface IProductsListProps {
  data: IProduct[];
}

export function ProductsList(props: IProductsListProps) {
  return (
    <div className="md:hidden mt-6">
      <input
        type="text"
        placeholder="Search products..."
        className="border border-gray-300 rounded-md px-2 py-1 w-full mb-2"
      />
      {props.data.length === 0 && <p>No products found.</p>}
      {props.data.length > 0 && (
        <div className="my-4">
          <span className="text-center text-gray-500">
            Showing {props.data.length} products
          </span>
          <div className="space-y-4 mt-4">
            {props.data.map((product) => (
              <ProductsListItem key={product.id} product={product} />
            ))}
          </div>
          <div className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-4 py-1 rounded-full w-fit mx-auto">
            See More
          </div>
        </div>
      )}
    </div>
  );
}
