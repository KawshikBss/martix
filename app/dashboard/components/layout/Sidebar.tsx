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

export interface ISidebarProps {}

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
    href: "/inventory",
    children: [
      { title: "Stock Levels", href: "/inventory" },
      { title: "Stock In / Stock Out", href: "/inventory/adjust" },
      { title: "Low Stock Alerts", href: "/inventory/alerts" },
      { title: "Adjustment History", href: "/inventory/history" },
    ],
  },
  {
    icon: <FiShoppingCart />,
    title: "Orders",
    href: "/orders",
    children: [
      { title: "All Orders", href: "/orders" },
      { title: "Create New Order", href: "/orders/new" },
      { title: "Pending Orders", href: "/orders/pending" },
      { title: "Completed Orders", href: "/orders/completed" },
    ],
  },
  {
    icon: <MdPointOfSale />,
    title: "Sales / POS",
    href: "/sales",
    children: [
      { title: "Quick Sale", href: "/sales/quick" },
      { title: "Receipts / Invoices", href: "/sales/receipts" },
    ],
  },
  {
    icon: <TbReportSearch />,
    title: "Reports",
    href: "/reports",
    children: [
      { title: "Sales Report", href: "/reports/sales" },
      { title: "Profit / Loss Report", href: "/reports/profit-loss" }, // Premium
      { title: "Product Performance", href: "/reports/performance" }, // Premium
      { title: "Export Reports", href: "/reports/export" }, // Premium
    ],
  },
  {
    icon: <MdOutlineFactory />,
    title: "Suppliers",
    href: "/suppliers",
    children: [
      { title: "All Suppliers", href: "/suppliers" },
      { title: "Purchase Orders", href: "/suppliers/orders" },
      { title: "Supplier Payments", href: "/suppliers/payments" },
    ],
  },
  {
    icon: <GrGroup />,
    title: "Customers",
    href: "/customers",
    children: [
      { title: "Customer List", href: "/customers" },
      { title: "Order History", href: "/customers/history" },
    ],
  },
  {
    icon: <LuChartNoAxesCombined />,
    title: "Analytics / Trends",
    href: "/analytics",
    children: [
      { title: "Sales Forecast", href: "/analytics/forecast" },
      { title: "Stock Suggestions", href: "/analytics/suggestions" },
    ],
  },
  {
    icon: <LuStore />,
    title: "Stores",
    href: "/stores",
    children: [
      { title: "Branch Overview", href: "/stores" },
      { title: "Transfer Stock", href: "/stores/transfer" },
    ],
  },
  {
    icon: <BsGear />,
    title: "System",
    href: "/system",
    children: [
      { title: "Settings", href: "/system/settings" },
      { title: "Billing / Subscription", href: "/system/billing" },
      { title: "Help & Support", href: "/system/help" },
    ],
  },
];

export function Sidebar(props: ISidebarProps) {
  const [expanded, setExpanded] = React.useState<string[]>([]);
  const pathname = usePathname();

  const handleToggle = (title: string) => {
    setExpanded((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
    );
  };

  return (
    <div className="w-2/11 h-[100vh] px-8 overflow-y-scroll">
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
                className={`w-full rounded-md flex flex-row justify-start items-center gap-2 px-2 py-1 text-left ${pathname.startsWith(item.href) ? 'bg-white' : ''}`}
                onClick={() => handleToggle(item.title)}
              >
                {item.icon && item.icon}
                {item.title}
                <FaAngleDown className={`ms-auto transition-transform ${expanded.includes(item.title) ? 'rotate-180' : ''}`} />
              </button>
            ) : (
              <Link href={item.href} className={`w-full rounded-md flex flex-row justify-start items-center gap-2 px-2 py-1 ${pathname === item.href ? 'bg-white' : ''}`}>
                {item.icon && item.icon}
                {item.title}
              </Link>
            )}
            {item.children && item.children.length > 0 && expanded.includes(item.title) && (
              <div className="px-1 py-2">
                {item.children.map((itemChild) => (
                  <div key={itemChild.title}>
                    {!itemChild.children ? (
                      <Link href={itemChild.href} key={itemChild.title}>
                        <span className={`w-full hover:bg-white rounded-md flex flex-row justify-start items-center gap-3 px-2 py-1 ${pathname === itemChild.href ? 'bg-white' : ''}`}>
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
                          <FaAngleDown className={`ms-auto transition-transform ${expanded.includes(itemChild.title) ? 'rotate-180' : ''}`} />
                        </button>
                        {expanded.includes(itemChild.title) && itemChild.children && (
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
