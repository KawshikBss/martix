import KpiCard from "@/components/ui/KpiCard";
import * as React from "react";
import {
  FaBarcode,
  FaChartLine,
  FaDropbox,
  FaShoppingCart,
} from "react-icons/fa";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { IoWarning } from "react-icons/io5";

export interface IInventoryReportKpiSectionProps {}

export default function InventoryReportKpiSection(
  props: IInventoryReportKpiSectionProps
) {
  return (
    <div className="my-6 w-full flex flex-col md:flex-row justify-between gap-4">
      <KpiCard
        title="Total SKUs"
        icon={<FaBarcode className="text-xl" />}
        value="+ 10,000"
      />
      <KpiCard
        title="Low Stock Items"
        icon={<IoWarning className="text-xl" />}
        value="+ 10,000"
      />
      <KpiCard
        title="Out-of-Stock Items"
        icon={<FaDropbox className="text-xl" />}
        value="+ 10,000"
      />
    </div>
  );
}
