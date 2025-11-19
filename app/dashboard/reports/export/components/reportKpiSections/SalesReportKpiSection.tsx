import KpiCard from "@/components/ui/KpiCard";
import * as React from "react";
import { FaChartLine, FaShoppingCart } from "react-icons/fa";
import { FaMoneyBill1Wave } from "react-icons/fa6";

export interface ISalesReportKpiSectionProps {}

export default function SalesReportKpiSection(
  props: ISalesReportKpiSectionProps
) {
  return (
    <div className="my-6 w-full flex flex-col md:flex-row justify-between gap-4">
      <KpiCard
        title="Total Sales"
        icon={<FaMoneyBill1Wave className="text-xl" />}
        value="$ 10,000"
      />
      <KpiCard
        title="Total Orders"
        icon={<FaShoppingCart className="text-xl" />}
        value="+ 10,000"
      />
      <KpiCard
        title="Avg Order Value"
        icon={<FaChartLine className="text-xl" />}
        value="$ 10,000"
      />
    </div>
  );
}
