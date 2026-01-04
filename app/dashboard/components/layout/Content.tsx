"use client";

import * as React from "react";
import { Sidebar } from "./Sidebar";
import Navbar from "./Navbar";
import PageLoader from "@/components/ui/loaders/PageLoader";
import { CartProvider } from "@/lib/providers/CartProvider";

export default function Content({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
    return (
        <CartProvider>
            <Sidebar
                isSidebarOpen={isSidebarOpen}
                closeSidebar={() => setIsSidebarOpen(false)}
            />
            <div className="md:h-[100vh] w-full md:w-9/11 md:overflow-y-scroll">
                <Navbar openSidebar={() => setIsSidebarOpen(true)} />
                <React.Suspense fallback={<PageLoader />}>
                    {children}
                </React.Suspense>
            </div>
        </CartProvider>
    );
}
