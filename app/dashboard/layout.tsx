import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { Sidebar } from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";

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
    <div
      className='flex flex-row h-full'
    >
      <Sidebar />
      <div className="md:h-[100vh] w-full md:w-9/11 md:overflow-y-scroll">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
