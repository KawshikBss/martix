import { IProduct } from "@/public/data/productsData";
import * as React from "react";
import { ProfitLossReportListItem } from "./ProfitLossReportListItem";

export interface IProfitLossReportListProps {
  data: IProduct[];
}

export function ProfitLossReportList(props: IProfitLossReportListProps) {
  return (
    <div className="md:hidden mt-6">
      {props.data.length === 0 && <p>No reports found.</p>}
      {props.data.length > 0 && (
        <>
          <span className="text-center text-gray-500">
            Showing {props.data.length} reports
          </span>
          <div className="space-y-4 mt-4">
            {props.data.map((product) => (
              <ProfitLossReportListItem key={product.id} product={product} />
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
