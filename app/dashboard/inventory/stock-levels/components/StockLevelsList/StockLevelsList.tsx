import { IProduct } from "@/public/data/productsData";
import Link from "next/link";
import * as React from "react";
import { StockLevelsListItem } from "./StockLevelsListItem";

export interface IStockLevelsListProps {
  data: IProduct[];
}

export function StockLevelsList(props: IStockLevelsListProps) {
  return (
    <div className="md:hidden">
      <h4 className="text-lg font-semibold mb-2">Stock Details</h4>
      {props.data.length === 0 && <p>No data found.</p>}
      {props.data.length > 0 && (
        <>
          <span className="text-center text-gray-500">
            Showing {props.data.length} results
          </span>
          <div className="space-y-4 mt-4">
            {props.data.map((product) => (
              <StockLevelsListItem key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
