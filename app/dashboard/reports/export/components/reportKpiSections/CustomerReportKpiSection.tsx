import KpiCard from "@/components/ui/KpiCard";
import * as React from "react";
import { FaMoneyBill1Wave, FaPerson } from "react-icons/fa6";
import { GrCycle } from "react-icons/gr";

export interface ICustomerReportKpiSectionProps {}

export default function CustomerReportKpiSection(
  props: ICustomerReportKpiSectionProps
) {
  return (
    <div className="my-6 w-full flex flex-col md:flex-row justify-between gap-4">
      <KpiCard
        title="Total Customers"
        icon={<FaPerson className="text-xl" />}
        value="+ 10,000"
      />
      <KpiCard
        title="Returning vs New"
        icon={<GrCycle className="text-xl" />}
        value="+ 10,000"
      />
      <KpiCard
        title="Avg Spend/Customer"
        icon={<FaMoneyBill1Wave className="text-xl" />}
        value="$ 10,000"
      />
    </div>
  );
}
