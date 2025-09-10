"use client";

import * as React from "react";
import SalesReportKpiSection from "./components/reportKpiSections/SalesReportKpiSection";
import ProfitLossReportKpiSection from "./components/reportKpiSections/ProfitLossReportKpiSection";
import ProductPerformanceReportKpiSection from "./components/reportKpiSections/ProductPerformanceReportKpiSection";
import InventoryReportKpiSection from "./components/reportKpiSections/InventoryReportKpiSection";
import PurchaseReportKpiSection from "./components/reportKpiSections/PurchaseReportKpiSection";
import CustomerReportKpiSection from "./components/reportKpiSections/CustomerReportKpiSection";
import SupplierReportKpiSection from "./components/reportKpiSections/SupplierReportKpiSection";
import VatTaxReportKpiSection from "./components/reportKpiSections/VatTaxReportKpiSection";

export default function ExportReports() {
  const [orderType, setOrderType] = React.useState("Sales");
  return (
    <main className="p-8">
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="w-full flex flex-row justify-between items-center">
          <h3 className="text-2xl font-medium">Sales Reports</h3>
          <div className="flex flex-row gap-4">
            <select className="bg-white border border-gray-300 rounded-md px-2 py-2">
              <option>PDF</option>
              <option>Excel (XLSX)</option>
              <option>CSV</option>
            </select>
            <select className="bg-white border border-gray-300 rounded-md px-2 py-2">
              <option>Charts + Tables</option>
              <option>Only Tables</option>
            </select>
            <button className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md">
              Download Now
            </button>
            <button className="bg-blue-500 hover:bg-transparent text-white hover:text-blue-500 border border-blue-500 px-2 py-1 rounded-md">
              Send
            </button>
          </div>
        </div>
        <div className="mt-4 flex flex-row justify-between gap-4">
          <select className="bg-white border border-gray-300 rounded-md px-2 py-2 w-1/6">
            <option onClick={() => setOrderType("Sales")}>Sales</option>
            <option onClick={() => setOrderType("Profit & Loss")}>
              Profit & Loss
            </option>
            <option onClick={() => setOrderType("Product Performance")}>
              Product Performance
            </option>
            <option onClick={() => setOrderType("Inventory")}>Inventory</option>
            <option onClick={() => setOrderType("Purchase")}>Purchase</option>
            <option onClick={() => setOrderType("Customer")}>Customer</option>
            <option onClick={() => setOrderType("Supplier")}>Supplier</option>
            <option onClick={() => setOrderType("Tax/VAT")}>Tax/VAT</option>
          </select>
          <select className="bg-white border border-gray-300 rounded-md px-2 py-2 w-1/6">
            <option>Today</option>
            <option>Last 7 days</option>
            <option>This Month</option>
            <option>Custom</option>
          </select>
          <select className="bg-white border border-gray-300 rounded-md px-2 py-2 w-1/6">
            <option>All</option>
            <option>Medicine</option>
            <option>Electronics</option>
            <option>Home</option>
          </select>
          <select className="bg-white border border-gray-300 rounded-md px-2 py-2 w-1/6">
            <option>All Suppliers</option>
            <option>Supplier A</option>
            <option>Supplier B</option>
            <option>Supplier C</option>
          </select>
          <select className="bg-white border border-gray-300 rounded-md px-2 py-2 w-1/6">
            <option>All Customers</option>
            <option>Customer A</option>
            <option>Customer B</option>
            <option>Customer C</option>
          </select>
          <select className="bg-white border border-gray-300 rounded-md px-2 py-2 w-1/6">
            <option>All</option>
            <option>POS</option>
            <option>Online</option>
            <option>Wholesale</option>
          </select>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-md p-6 my-6">
        <h3 className="text-2xl font-medium">Preview</h3>
        <div className="mt-4 p-4 border-2 border-dashed border-gray-300 rounded-md">
          <h3 className="text-2xl font-bold text-center border-b-2 border-gray-300 py-4 mb-6">
            {orderType} Report - Augest
          </h3>
          {orderType === "Sales" ? (
            <SalesReportKpiSection />
          ) : orderType === "Profit & Loss" ? (
            <ProfitLossReportKpiSection />
          ) : orderType === "Product Performance" ? (
            <ProductPerformanceReportKpiSection />
          ) : orderType === "Inventory" ? (
            <InventoryReportKpiSection />
          ) : orderType === "Purchase" ? (
            <PurchaseReportKpiSection />
          ) : orderType === "Customer" ? (
            <CustomerReportKpiSection />
          ) : orderType === "Supplier" ? (
            <SupplierReportKpiSection />
          ) : orderType === "Tax/VAT" ? (
            <VatTaxReportKpiSection />
          ) : (
            <div className="text-center text-gray-500">
              Please select a valid report type.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
