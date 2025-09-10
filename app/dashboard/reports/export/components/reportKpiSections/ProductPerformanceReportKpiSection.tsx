import KpiCard from "@/components/ui/KpiCard";
import productsData from "@/public/data/productsData";
import * as React from "react";
import { FaChartLine, FaShoppingCart, FaTrophy } from "react-icons/fa";
import {
  FaMoneyBill1Wave,
  FaMoneyBillTrendUp,
  FaPerson,
} from "react-icons/fa6";
import { MdDangerous } from "react-icons/md";

export interface IProductPerformanceReportKpiSectionProps {}

export default function ProductPerformanceReportKpiSection(
  props: IProductPerformanceReportKpiSectionProps
) {
  return (
    <div className="my-6 w-full flex flex-row justify-between gap-4">
      <KpiCard
        title="Best Seller"
        icon={<FaTrophy className="text-xl" />}
        product={{
          name: productsData[0].name,
          image: productsData[0].image,
          id: productsData[0].id.toString(),
        }}
      />
      <KpiCard
        title="Top Revenue Product"
        icon={<FaMoneyBillTrendUp className="text-xl" />}
        product={{
          name: productsData[0].name,
          image: productsData[0].image,
          id: productsData[0].id.toString(),
        }}
      />
      <KpiCard
        title="Dead Stock Value"
        icon={<MdDangerous className="text-xl" />}
        value="$ 10,000"
      />
    </div>
  );
}
