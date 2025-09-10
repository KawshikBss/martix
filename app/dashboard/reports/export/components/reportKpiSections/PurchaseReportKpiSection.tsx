import KpiCard from "@/components/ui/KpiCard";
import * as React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FaMoneyBill1Wave, FaPerson } from "react-icons/fa6";

export interface IPurchaseReportKpiSectionProps {}

export default function PurchaseReportKpiSection(
  props: IPurchaseReportKpiSectionProps
) {
  return (
    <div className="my-6 w-full flex flex-row justify-between gap-4">
      <KpiCard
        title="Total Purchases"
        icon={<FaShoppingCart className="text-xl" />}
        value="+ 10,000"
      />
      <KpiCard
        title="Avg Purchase Value"
        icon={<FaMoneyBill1Wave className="text-xl" />}
        value="+ 10,000"
      />
      <KpiCard
        title="Top Supplier"
        icon={<FaPerson className="text-xl text-orange-500" />}
        user={{
          id: "",
          name: "Rober California",
          image: "/images/user-placeholder.jpg",
        }}
      />
    </div>
  );
}
