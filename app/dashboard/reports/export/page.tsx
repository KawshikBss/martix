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
import productsData from "@/public/data/productsData";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement,
} from "chart.js";
import ReportTable from "./components/reportTables/ReportTable";
import { ReportList } from "./components/ReportList/ReportList";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title
);

const barChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Top 5 Products Sold",
    },
  },
};

const barChartLabels = [...productsData.map((product) => product.name)];

const barChartData = {
  labels: barChartLabels,
  datasets: [
    {
      label: "Products",
      data: barChartLabels.map(() => Math.floor(Math.random() * 1001)),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

const doughnutChartData = {
  labels: ["Red", "Yellow"],
  datasets: [
    {
      label: "#",
      data: [12, 19],
      backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(255, 206, 86, 0.2)"],
      borderColor: ["rgba(255, 99, 132, 1)", "rgba(255, 206, 86, 1)"],
      borderWidth: 1,
    },
  ],
};

const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const lineChartLabels = [...productsData.map((prod) => prod.name).slice(0, 7)];

const lineChartData = {
  labels: lineChartLabels,
  datasets: [
    {
      label: "Dataset 1",
      data: lineChartLabels.map(() => Math.floor(Math.random() * 1001)),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

export default function ExportReports() {
  const [orderType, setOrderType] = React.useState("Sales");
  return (
    <main className="p-4 md:p-8">
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
          <h3 className="text-2xl font-medium self-start">Export Reports</h3>
          <div className="flex flex-row flex-wrap gap-4">
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
        <div className="mt-4 flex flex-wrap flex-col md:flex-row justify-between gap-4">
          <select className="bg-white border border-gray-300 rounded-md px-2 py-2 w-full md:w-1/6">
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
          <select className="bg-white border border-gray-300 rounded-md px-2 py-2 w-full md:w-1/6">
            <option>Today</option>
            <option>Last 7 days</option>
            <option>This Month</option>
            <option>Custom</option>
          </select>
          <select className="bg-white border border-gray-300 rounded-md px-2 py-2 w-full md:w-1/6">
            <option>All</option>
            <option>Medicine</option>
            <option>Electronics</option>
            <option>Home</option>
          </select>
          <select className="bg-white border border-gray-300 rounded-md px-2 py-2 w-full md:w-1/6">
            <option>All Suppliers</option>
            <option>Supplier A</option>
            <option>Supplier B</option>
            <option>Supplier C</option>
          </select>
          <select className="bg-white border border-gray-300 rounded-md px-2 py-2 w-full md:w-1/6">
            <option>All Customers</option>
            <option>Customer A</option>
            <option>Customer B</option>
            <option>Customer C</option>
          </select>
          <select className="bg-white border border-gray-300 rounded-md px-2 py-2 w-full md:w-1/6">
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
          {orderType === "Sales" ? (
            <Bar options={barChartOptions} data={barChartData} />
          ) : orderType === "Profit & Loss" ? (
            <Bar options={barChartOptions} data={barChartData} />
          ) : orderType === "Product Performance" ? (
            <Bar options={barChartOptions} data={barChartData} />
          ) : orderType === "Inventory" ? (
            <div className="w-full md:w-1/2 center mx-auto">
              <Doughnut data={doughnutChartData} />
            </div>
          ) : orderType === "Purchase" ? (
            <Line options={lineChartOptions} data={lineChartData} />
          ) : orderType === "Customer" ? (
            <Bar options={barChartOptions} data={barChartData} />
          ) : orderType === "Supplier" ? (
            <div className="w-full md:w-1/2 center mx-auto">
              <Doughnut data={doughnutChartData} />
            </div>
          ) : orderType === "Tax/VAT" ? (
            <Line options={lineChartOptions} data={lineChartData} />
          ) : (
            ""
          )}
        </div>
        <ReportTable
          headers={
            orderType == "Sales"
              ? ["Product", "Units Sold", "Revenue", "Profit", "Margin %"]
              : orderType === "Profit & Loss"
              ? ["Month", "Revenue", "COGS", "Expenses", "Profit"]
              : orderType === "Product Performance"
              ? ["Product", "Category", "Units Sold", "Profit", "Turnover Rate"]
              : orderType === "Inventory"
              ? ["Product", "Current Stock", "Min Stock", "Status"]
              : orderType === "Purchase"
              ? ["Supplier", "Product", "Qty Purchased", "Cost"]
              : orderType === "Customer"
              ? ["Customer", "Orders", "Total Spend", "Avg Order Value"]
              : orderType === "Supplier"
              ? [
                  "Supplier",
                  "Products Supplied",
                  "Total Value",
                  "Avg Lead Time",
                ]
              : orderType === "Tax/VAT"
              ? ["Invoice", "Taxable Amount", "Tax Rate", "Tax Amount"]
              : []
          }
          data={
            orderType == "Sales"
              ? [
                  ...productsData.map((product) => [
                    { value: product, type: "product" },
                    { value: product.stockQty, type: "number" },
                    {
                      value: product.stockQty * product.price,
                      type: "currency",
                    },
                    {
                      value: (100 - product.stockQty) * product.price,
                      type: "currency",
                    },
                    { value: "12", type: "number" },
                  ]),
                ]
              : orderType == "Profit & Loss"
              ? [
                  ...productsData.map((product) => [
                    { title: "Month", value: "April", type: "date" },
                    {
                      title: "Revenue",
                      value: product.stockQty * product.price,
                      type: "currency",
                    },
                    {
                      title: "COGS",
                      value: product.stockQty * product.price * 1.5,
                      type: "currency",
                    },
                    {
                      title: "Expenses",
                      value: product.stockQty * product.price * 0.5,
                      type: "currency",
                    },
                    {
                      title: "Profit",
                      value: product.stockQty * product.price * 0.75,
                      type: "currency",
                    },
                  ]),
                ]
              : orderType === "Product Performance"
              ? [
                  ...productsData.map((product) => [
                    { title: "Product", value: product, type: "product" },
                    {
                      title: "Category",
                      value: product.category,
                      type: "category",
                    },
                    {
                      title: "Units Sold",
                      value: product.stockQty,
                      type: "number",
                    },
                    {
                      title: "Profit",
                      value: product.stockQty * product.price * 0.75,
                      type: "currency",
                    },
                    {
                      title: "Turnover Rate",
                      value: product.stockQty * product.price * 0.5,
                      type: "currency",
                    },
                  ]),
                ]
              : orderType === "Inventory"
              ? [
                  ...productsData.map((product) => [
                    { title: "Product", value: product, type: "product" },
                    {
                      title: "Current Stock",
                      value: product.stockQty,
                      type: "number",
                    },
                    {
                      title: "Min Stock",
                      value: 50 - product.stockQty,
                      type: "number",
                    },
                    { title: "Status", value: "In Stock", type: "status" },
                  ]),
                ]
              : orderType === "Purchase"
              ? [
                  ...productsData.map((product) => [
                    {
                      title: "Supplier",
                      value: {
                        id: 0,
                        image: "/images/user-placeholder.jpg",
                        name: "Robert California",
                      },
                      type: "user",
                    },
                    { title: "Product", value: product, type: "product" },
                    {
                      title: "Qty Purchased",
                      value: product.stockQty,
                      type: "number",
                    },
                    { title: "Cost", value: product.price, type: "currency" },
                  ]),
                ]
              : orderType === "Customer"
              ? [
                  ...productsData.map((product) => [
                    {
                      title: "Customer",
                      value: {
                        id: 0,
                        image: "/images/user-placeholder.jpg",
                        name: "Robert California",
                      },
                      type: "user",
                    },
                    {
                      title: "Orders",
                      value: product.stockQty,
                      type: "number",
                    },
                    {
                      title: "Total Spend",
                      value: product.stockQty * product.price,
                      type: "number",
                    },
                    { title: "Avg Order Value", value: 30, type: "number" },
                  ]),
                ]
              : orderType === "Supplier"
              ? [
                  ...productsData.map((product) => [
                    {
                      title: "Supplier",
                      value: {
                        id: 0,
                        image: "/images/user-placeholder.jpg",
                        name: "Robert California",
                      },
                      type: "user",
                    },
                    {
                      title: "Products Supplied",
                      value: product.stockQty,
                      type: "number",
                    },
                    {
                      title: "Total Value",
                      value: product.stockQty * product.price,
                      type: "number",
                    },
                    { title: "Avg Lead Time", value: 30, type: "number" },
                  ]),
                ]
              : orderType === "Tax/VAT"
              ? [
                  ...Array(5)
                    .fill(0)
                    .map((_, i) => [
                      {
                        title: "Invoice",
                        value: `INV-${1000 + i}`,
                        type: "string",
                      },
                      {
                        title: "Taxable Amount",
                        value: Math.floor(Math.random() * 10000),
                        type: "currency",
                      },
                      { title: "Tax Rate", value: `${5 + i}%`, type: "string" },
                      {
                        title: "Tax Amount",
                        value: Math.floor(Math.random() * 500),
                        type: "currency",
                      },
                    ]),
                ]
              : []
          }
        />
        <ReportList
          data={
            orderType == "Sales"
              ? [
                  ...productsData.map((product) => [
                    { title: "Product", value: product, type: "product" },
                    {
                      title: "Units Sold",
                      value: product.stockQty,
                      type: "number",
                    },
                    {
                      title: "Revenue",
                      value: product.stockQty * product.price,
                      type: "currency",
                    },
                    {
                      title: "Profit",
                      value: (100 - product.stockQty) * product.price,
                      type: "currency",
                    },
                    { title: "Margin %", value: "12", type: "number" },
                  ]),
                ]
              : orderType == "Profit & Loss"
              ? [
                  ...productsData.map((product) => [
                    { title: "Month", value: "April", type: "date" },
                    {
                      title: "Revenue",
                      value: product.stockQty * product.price,
                      type: "currency",
                    },
                    {
                      title: "COGS",
                      value: product.stockQty * product.price * 1.5,
                      type: "currency",
                    },
                    {
                      title: "Expenses",
                      value: product.stockQty * product.price * 0.5,
                      type: "currency",
                    },
                    {
                      title: "Profit",
                      value: product.stockQty * product.price * 0.75,
                      type: "currency",
                    },
                  ]),
                ]
              : orderType === "Product Performance"
              ? [
                  ...productsData.map((product) => [
                    { title: "Product", value: product, type: "product" },
                    {
                      title: "Category",
                      value: product.category,
                      type: "category",
                    },
                    {
                      title: "Units Sold",
                      value: product.stockQty,
                      type: "number",
                    },
                    {
                      title: "Profit",
                      value: product.stockQty * product.price * 0.75,
                      type: "currency",
                    },
                    {
                      title: "Turnover Rate",
                      value: product.stockQty * product.price * 0.5,
                      type: "currency",
                    },
                  ]),
                ]
              : orderType === "Inventory"
              ? [
                  ...productsData.map((product) => [
                    { title: "Product", value: product, type: "product" },
                    {
                      title: "Current Stock",
                      value: product.stockQty,
                      type: "number",
                    },
                    {
                      title: "Min Stock",
                      value: 50 - product.stockQty,
                      type: "number",
                    },
                    { title: "Status", value: "In Stock", type: "status" },
                  ]),
                ]
              : orderType === "Purchase"
              ? [
                  ...productsData.map((product) => [
                    {
                      title: "Supplier",
                      value: {
                        id: 0,
                        image: "/images/user-placeholder.jpg",
                        name: "Robert California",
                      },
                      type: "user",
                    },
                    { title: "Product", value: product, type: "product" },
                    {
                      title: "Qty Purchased",
                      value: product.stockQty,
                      type: "number",
                    },
                    { title: "Cost", value: product.price, type: "currency" },
                  ]),
                ]
              : orderType === "Customer"
              ? [
                  ...productsData.map((product) => [
                    {
                      title: "Customer",
                      value: {
                        id: 0,
                        image: "/images/user-placeholder.jpg",
                        name: "Robert California",
                      },
                      type: "user",
                    },
                    {
                      title: "Orders",
                      value: product.stockQty,
                      type: "number",
                    },
                    {
                      title: "Total Spend",
                      value: product.stockQty * product.price,
                      type: "number",
                    },
                    { title: "Avg Order Value", value: 30, type: "number" },
                  ]),
                ]
              : orderType === "Supplier"
              ? [
                  ...productsData.map((product) => [
                    {
                      title: "Supplier",
                      value: {
                        id: 0,
                        image: "/images/user-placeholder.jpg",
                        name: "Robert California",
                      },
                      type: "user",
                    },
                    {
                      title: "Products Supplied",
                      value: product.stockQty,
                      type: "number",
                    },
                    {
                      title: "Total Value",
                      value: product.stockQty * product.price,
                      type: "number",
                    },
                    { title: "Avg Lead Time", value: 30, type: "number" },
                  ]),
                ]
              : orderType === "Tax/VAT"
              ? [
                  ...Array(5)
                    .fill(0)
                    .map((_, i) => [
                      {
                        title: "Invoice",
                        value: `INV-${1000 + i}`,
                        type: "string",
                      },
                      {
                        title: "Taxable Amount",
                        value: Math.floor(Math.random() * 10000),
                        type: "currency",
                      },
                      { title: "Tax Rate", value: `${5 + i}%`, type: "string" },
                      {
                        title: "Tax Amount",
                        value: Math.floor(Math.random() * 500),
                        type: "currency",
                      },
                    ]),
                ]
              : []
          }
        />
      </div>
    </main>
  );
}
