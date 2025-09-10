import KpiCard from "@/components/ui/KpiCard";
import * as React from "react";
import { FaChartLine, FaShoppingCart } from "react-icons/fa";
import { FaMoneyBill1Wave, FaMoneyBillTrendUp } from "react-icons/fa6";
import { GiPayMoney } from "react-icons/gi";

export interface IProfitLossReportKpiSectionProps {}

export default function ProfitLossReportKpiSection(
  props: IProfitLossReportKpiSectionProps
) {
  return (
    <div className="my-6 w-full flex flex-row justify-between gap-4">
      <KpiCard
        title="Total Revenue"
        icon={<FaMoneyBill1Wave className="text-xl" />}
        value="$ 10,000"
      />
      <KpiCard
        title="Total Expenses"
        icon={<GiPayMoney className="text-xl" />}
        value="$ 10,000"
      />
      <KpiCard
        title="Net Profit"
        icon={<FaMoneyBillTrendUp className="text-xl" />}
        value="$ 10,000"
      />
    </div>
  );
}
