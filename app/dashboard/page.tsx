import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaCaretUp } from "react-icons/fa";
import { GrMoney } from "react-icons/gr";
import { FiShoppingCart } from 'react-icons/fi';
import { FaRegBell } from "react-icons/fa6";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "User Dashboard",
};

const chartData = {
  options: {
    chart: {
      id: "basic-bar"
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
    }
  },
  series: [
    {
      name: "series-1",
      data: [30, 40, 45, 50, 49, 60, 70, 91]
    }
  ]
};

export default function Dashboard() {
  return (
    <main className="p-4">
      <div className="my-6">
        <div className="w-full flex flex-row justify-between items-center">
          <h3 className="text-2xl font-medium">Dashboard</h3>
          <Link href="/" className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md">
            + Add New Product
          </Link>
        </div>
        <div className="mt-6 w-full flex flex-row justify-between gap-4">
          <div className="w-full bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between">
            <div className="flex flex-row justify-between items-center">
              <h4 className="text-lg font-normal">Todays Sales</h4>
            </div>
            <h3 className="text-2xl font-semibold">$10,000</h3>
            <span className="text-sm text-green-500 flex items-center"><FaCaretUp /> 70%</span>
          </div>
          <div className="w-full bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between">
            <div className="flex flex-row justify-between items-center">
              <h4 className="text-lg font-normal">Todays Orders</h4>
            </div>
            <h3 className="text-2xl font-semibold">+ 10,000</h3>
            <span className="text-sm text-green-500 flex items-center"><FaCaretUp /> 70%</span>
          </div>
          <div className="w-full bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between">
            <div className="flex flex-row justify-between items-center">
              <h4 className="text-lg font-normal">Top Product</h4>
            </div>
            <Link href='/' className="flex flex-row justify-between items-center my-2">
              <Image src="https://globalcare.com.bd/public/uploads/all/u0KM6G8OypRGBAJ1YxNk0mbpi9zhEbRWfa1ogSm0.jpg" alt="Sergel 20mg" width={60} height={40} className="aspect-3/2 object-cover rounded-lg" />
              <h3 className="text-lg font-semibold">Sergel 20mg</h3>
            </Link>
            <Link href='/' className="text-sm text-blue-500 flex items-center">See More</Link>
          </div>
          <div className="w-full bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between">
            <div className="flex flex-row justify-between items-center">
              <h4 className="text-lg font-normal">Low Stocks</h4>
            </div>
            <h3 className="text-2xl font-semibold">- 10,000</h3>
            <Link href='/' className="text-sm text-blue-500 flex items-center">See More</Link>
          </div>
        </div>
      </div>
      <div className="my-6">
        <div className="w-full flex flex-row justify-between items-start gap-6">
          <div className="w-full bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between">
            <div className="flex flex-row justify-start items-center">
              <GrMoney className="mr-6" />
              <h4 className="text-lg font-normal">Sales</h4>
            </div>

          </div>
          <div className="w-full bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between">
            <div className="flex flex-row justify-start items-center">
              <FaRegBell className="mr-6" />
              <div>
                <h4 className="text-lg font-normal">Notifications</h4>
                <p className="text-sm text-gray-500">You have 5 new notifications</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-6">
        <div className="w-full flex flex-row justify-between items-start gap-6">
          <div className="w-full bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between">
            <div className="flex flex-row justify-start items-center">
              <FiShoppingCart className="mr-6" />
              <div>
                <h4 className="text-lg font-normal">Recent Orders</h4>
                <p className="text-sm text-gray-500">You have completed 350 orders this month</p>
              </div>
            </div>
          </div>
          <div className="w-full bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between">
            <div className="flex flex-row justify-start items-center">
              <FaRegBell className="mr-6" />
              <div>
                <h4 className="text-lg font-normal">Notifications</h4>
                <p className="text-sm text-gray-500">You have 5 new notifications</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
