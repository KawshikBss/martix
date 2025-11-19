import KpiCard from "@/components/ui/KpiCard";
import * as React from "react";
import { FaTrophy, FaTruck } from "react-icons/fa";
import { FaMoneyBill1Wave, FaPerson } from "react-icons/fa6";
import { GiPayMoney } from "react-icons/gi";
import { RiRefund2Line } from "react-icons/ri";

export interface IVatTaxReportKpiSectionProps {}

export default function VatTaxReportKpiSection(
  props: IVatTaxReportKpiSectionProps
) {
  return (
    <div className="my-6 w-full flex flex-col md:flex-row justify-between gap-4">
      <KpiCard
        title="Total Tax Collected"
        icon={<FaMoneyBill1Wave className="text-xl" />}
        value="$ 10,000"
      />
      <KpiCard
        title="Total Tax Paid"
        icon={<GiPayMoney className="text-xl" />}
        value="$ 10,000"
      />
      <KpiCard
        title="Net Tax Liability"
        icon={<RiRefund2Line className="text-xl" />}
        value="$ 10,000"
      />
    </div>
  );
}
