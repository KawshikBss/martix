"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { usePathname } from "next/navigation";
import { FaAngleDown } from "react-icons/fa";
import { FiHome, FiShoppingCart } from "react-icons/fi";
import { LuStore, LuChartNoAxesCombined } from "react-icons/lu";
import { BsBoxes, BsHandbag, BsGear } from "react-icons/bs";
import { TbReportSearch } from "react-icons/tb";
import { MdPointOfSale, MdOutlineFactory } from "react-icons/md";
import { GrGroup } from "react-icons/gr";
import { IoCloseCircle } from "react-icons/io5";

export interface ISidebarProps {
  isSidebarOpen?: boolean;
  closeSidebar?: () => void;
}

interface INavItem {
  icon?: React.ReactNode;
  title: string;
  href: string;
  children?: INavItem[];
}

export const navItems: INavItem[] = [
  {
    icon: <FiHome />,
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: <BsHandbag />,
    title: "Products",
    href: "/dashboard/products",
    children: [
      { title: "All Products", href: "/dashboard/products" },
      { title: "Add Product", href: "/dashboard/products/add" },
      { title: "Categories", href: "/dashboard/categories" },
      { title: "Import / Export", href: "/dashboard/products/import-export" }, // Premium
    ],
  },
  {
    icon: <BsBoxes />,
    title: "Inventory",
    href: "/dashboard/inventory",
    children: [
      { title: "Stock Levels", href: "/dashboard/inventory/stock-levels" },
      { title: "Stock In / Stock Out", href: "/dashboard/inventory/adjust" },
      { title: "Low Stock Alerts", href: "/dashboard/inventory/alerts" },
      { title: "Adjustment History", href: "/dashboard/inventory/history" },
    ],
  },
  {
    icon: <FiShoppingCart />,
    title: "Orders",
    href: "/dashboard/orders",
    children: [
      { title: "All Orders", href: "/dashboard/orders" },
      { title: "Create New Order", href: "/dashboard/orders/new" },
      { title: "Pending Orders", href: "/dashboard/orders/pending" },
      { title: "Completed Orders", href: "/dashboard/orders/completed" },
    ],
  },
  {
    icon: <MdPointOfSale />,
    title: "Sales / POS",
    href: "/dashboard/sales",
    children: [
      { title: "Quick Sale", href: "/dashboard/sales/quick" },
      { title: "Receipts / Invoices", href: "/dashboard/sales/receipts" },
    ],
  },
  {
    icon: <TbReportSearch />,
    title: "Reports",
    href: "/dashboard/reports",
    children: [
      { title: "Sales Report", href: "/dashboard/reports/sales" },
      { title: "Profit / Loss Report", href: "/dashboard/reports/profit-loss" }, // Premium
      { title: "Product Performance", href: "/dashboard/reports/performance" }, // Premium
      { title: "Export Reports", href: "/dashboard/reports/export" }, // Premium
    ],
  },
  {
    icon: <MdOutlineFactory />,
    title: "Suppliers",
    href: "/dashboard/suppliers",
    children: [
      { title: "All Suppliers", href: "/dashboard/suppliers" },
      { title: "Purchase Orders", href: "/dashboard/suppliers/orders" },
      { title: "Supplier Payments", href: "/dashboard/suppliers/payments" },
    ],
  },
  {
    icon: <GrGroup />,
    title: "Customers",
    href: "/dashboard/customers",
    children: [
      { title: "Customer List", href: "/dashboard/customers" },
      { title: "Order History", href: "/dashboard/customers/history" },
    ],
  },
  /* {
    icon: <LuChartNoAxesCombined />,
    title: "Analytics / Trends",
    href: "/dashboard/analytics",
    children: [
      { title: "Sales Forecast", href: "/dashboard/analytics/forecast" },
      { title: "Stock Suggestions", href: "/dashboard/analytics/suggestions" },
    ],
  }, */
  {
    icon: <LuStore />,
    title: "Stores",
    href: "/dashboard/stores",
    children: [
      { title: "Branch Overview", href: "/dashboard/stores" },
      { title: "Transfer Stock", href: "/dashboard/stores/transfer" },
    ],
  },
  {
    icon: <BsGear />,
    title: "System",
    href: "/dashboard/system",
    children: [
      { title: "Settings", href: "/dashboard/system/settings" },
      { title: "Billing / Subscription", href: "/dashboard/system/billing" },
      { title: "Help & Support", href: "/dashboard/system/help" },
    ],
  },
];

export function Sidebar(props: ISidebarProps) {
  const [expanded, setExpanded] = React.useState<string[]>([]);
  const pathname = usePathname();

  const handleToggle = (title: string) => {
    setExpanded((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  return (
    <div
      className={`w-full md:w-2/11 absolute md:static inset-0 bg-[#e9eef4] md:h-[100vh] px-8 overflow-y-scroll z-50 transition-transform duration-300 ease-in-out ${
        props.isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 md:block`}
    >
      <IoCloseCircle
        className="md:hidden w-8 h-8 ms-auto mt-6 text-gray-600 hover:text-gray-800 transition-colors duration-200 cursor-pointer"
        onClick={props.closeSidebar}
      />
      <Link href="/">
        <Image
          src="/logo.png"
          alt="Description"
          className="rounded-full hover:scale-105 transition-transform duration-200 my-10 mx-auto"
          width={150}
          height={150}
        />
      </Link>
      <ul className="list-none">
        {navItems.map((item) => (
          <li key={item.title} className="my-4 flex flex-col">
            {item.children && item.children.length > 0 ? (
              <button
                type="button"
                className={`w-full rounded-md flex flex-row justify-start items-center gap-2 px-2 py-1 text-left ${
                  pathname.startsWith(item.href) ? "bg-white" : ""
                }`}
                onClick={() => handleToggle(item.title)}
              >
                {item.icon && item.icon}
                {item.title}
                <FaAngleDown
                  className={`ms-auto transition-transform ${
                    expanded.includes(item.title) ? "rotate-180" : ""
                  }`}
                />
              </button>
            ) : (
              <Link
                href={item.href}
                className={`w-full rounded-md flex flex-row justify-start items-center gap-2 px-2 py-1 ${
                  pathname === item.href ? "bg-white" : ""
                }`}
                onClick={props.closeSidebar}
              >
                {item.icon && item.icon}
                {item.title}
              </Link>
            )}
            {item.children &&
              item.children.length > 0 &&
              expanded.includes(item.title) && (
                <div className="px-1 py-2">
                  {item.children.map((itemChild) => (
                    <div key={itemChild.title}>
                      {!itemChild.children ? (
                        <Link
                          href={itemChild.href}
                          key={itemChild.title}
                          onClick={props.closeSidebar}
                        >
                          <span
                            className={`w-full hover:bg-white rounded-md flex flex-row justify-start items-center gap-3 px-2 py-1 ${
                              pathname === itemChild.href ? "bg-white" : ""
                            }`}
                          >
                            {itemChild.icon && itemChild.icon}
                            {itemChild.title}
                          </span>
                        </Link>
                      ) : (
                        <>
                          <button
                            type="button"
                            className="w-full hover:bg-white rounded-md flex flex-row justify-start items-center gap-3 px-2 py-1 text-left"
                            onClick={() => handleToggle(itemChild.title)}
                          >
                            {itemChild.icon && itemChild.icon}
                            {itemChild.title}
                            <FaAngleDown
                              className={`ms-auto transition-transform ${
                                expanded.includes(itemChild.title)
                                  ? "rotate-180"
                                  : ""
                              }`}
                            />
                          </button>
                          {expanded.includes(itemChild.title) &&
                            itemChild.children && (
                              <div className="ml-6 px-1 border-l-1 border-l-gray-400">
                                {itemChild.children.map((itemChild2) => (
                                  <div key={itemChild2.title}>
                                    <Link href={itemChild2.href}>
                                      <span className="w-full hover:bg-white rounded-md flex flex-row justify-start items-center gap-3 ps-2 py-1">
                                        {itemChild2.icon && itemChild2.icon}
                                        {itemChild2.title}
                                      </span>
                                    </Link>
                                  </div>
                                ))}
                              </div>
                            )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
          </li>
        ))}
      </ul>
    </div>
  );
}
