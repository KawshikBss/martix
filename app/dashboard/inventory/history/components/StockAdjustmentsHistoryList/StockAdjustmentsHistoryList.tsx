import { IProduct } from "@/public/data/productsData";
import * as React from "react";
import { StockAdjustmentsHistoryListItem } from "./StockAdjustmentsHistoryListItem";

export interface IStockAdjustmentsHistoryListProps {
  data: IProduct[];
}

export function StockAdjustmentsHistoryList(
  props: IStockAdjustmentsHistoryListProps
) {
  return (
    <div>
      <div className="md:hidden">
        <h4 className="text-lg font-semibold mb-2">Adjustment Details</h4>
        {props.data.length === 0 && <p>No data found.</p>}
        {props.data.length > 0 && (
          <>
            <span className="text-center text-gray-500">
              Showing {props.data.length} results
            </span>
            <div className="space-y-4 mt-4">
              {props.data.map((product) => (
                <StockAdjustmentsHistoryListItem
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
