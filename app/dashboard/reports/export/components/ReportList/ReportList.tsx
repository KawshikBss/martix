import * as React from "react";
import { ReportListItem } from "./ReportListItem";

interface IData {
  type?: string;
  title: string;
  value: any;
}

export interface IReportListProps {
  data: IData[][];
}

export function ReportList(props: IReportListProps) {
  return (
    <div className="md:hidden space-y-4 mt-4">
      {props.data.map((data, index) => (
        <ReportListItem key={index.toString()} data={data} />
      ))}
    </div>
  );
}
