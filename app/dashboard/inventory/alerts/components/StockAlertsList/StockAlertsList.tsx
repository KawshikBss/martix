import { IProduct } from "@/public/data/productsData";
import * as React from "react";
import { StockAlertsListItem } from "./StockAlertsListItem";

export interface IStockAlertsListProps {
  data: IProduct[];
}

export function StockAlertsList(props: IStockAlertsListProps) {
  return (
    <div>
      <div className="md:hidden">
        <h4 className="text-lg font-semibold mb-2">Stock Alerts</h4>
        {props.data.length === 0 && <p>No data found.</p>}
        {props.data.length > 0 && (
          <>
            <span className="text-center text-gray-500">
              Showing {props.data.length} results
            </span>
            <div className="space-y-4 mt-4">
              {props.data.map((product) => (
                <StockAlertsListItem key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
