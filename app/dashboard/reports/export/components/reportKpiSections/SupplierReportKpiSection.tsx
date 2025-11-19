import KpiCard from "@/components/ui/KpiCard";
import * as React from "react";
import { FaTrophy, FaTruck } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";

export interface ISupplierReportKpiSectionProps {}

export default function SupplierReportKpiSection(
  props: ISupplierReportKpiSectionProps
) {
  return (
    <div className="my-6 w-full flex flex-col md:flex-row justify-between gap-4">
      <KpiCard
        title="Active Suppliers"
        icon={<FaPerson className="text-xl" />}
        value="+ 10,000"
      />
      <KpiCard
        title="Top Supplier by Volume"
        icon={<FaTrophy className="text-xl" />}
        user={{
          id: "",
          name: "Rober California",
          image: "/images/user-placeholder.jpg",
        }}
      />
      <KpiCard
        title="On-Time Delivery %"
        icon={<FaTruck className="text-xl" />}
        value="10,000"
      />
    </div>
  );
}
