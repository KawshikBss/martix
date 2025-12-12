import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import Content from "./components/layout/Content";
import ReactQueryProvider from "@/lib/providers/ReactQueryProvider";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Martix",
    description: "Inventory Management System",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-row h-full">
            <ReactQueryProvider>
                <Content children={children} />
            </ReactQueryProvider>
        </div>
    );
}
