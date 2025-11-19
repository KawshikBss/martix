import { IProduct } from "@/public/data/productsData";
import * as React from "react";
import { PerformanceReportListItem } from "./PerformanceReportListItem";

export interface IPerformanceReportListProps {
  data: IProduct[];
}

export function PerformanceReportList(props: IPerformanceReportListProps) {
  return (
    <div className="md:hidden mt-2">
      {props.data.length === 0 && <p>No reports found.</p>}
      {props.data.length > 0 && (
        <>
          <span className="text-center text-gray-500">
            Showing {props.data.length} reports
          </span>
          <div className="space-y-4 mt-4">
            {props.data.map((product) => (
              <PerformanceReportListItem key={product.id} product={product} />
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
