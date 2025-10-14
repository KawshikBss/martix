import { IProduct } from "@/public/data/productsData";
import * as React from "react";
import { ProductCard } from "./ProductCard";

export interface IProductsCatalogProps {
  items?: IProduct[];
}

export function ProductsCatalog(props: IProductsCatalogProps) {
  return (
    <div className="mt-8 md:hidden">
      {props.items && props.items.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          <span className="text-center text-gray-500">
            Showing {props.items.length} products
          </span>
          {props.items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          <span className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-4 py-1 rounded-full w-fit mx-auto">
            See More
          </span>
        </div>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
}
