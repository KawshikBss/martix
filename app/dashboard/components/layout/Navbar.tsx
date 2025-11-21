import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { FaRegBell, FaRegUser } from "react-icons/fa6";
import { IoMdMenu } from "react-icons/io";

export interface INavbarProps {
  openSidebar?: () => void;
}

export default function Navbar(props: INavbarProps) {
  return (
    <div className="w-full px-8 pt-6 flex flex-row justify-between items-center">
      <IoMdMenu
        className="w-6 h-6 pointer text-gray-600 hover:text-gray-800 transition-colors duration-200 md:hidden"
        onClick={props.openSidebar}
      />
      <div className="hidden md:block">
        <input
          type="text"
          placeholder="Search..."
          className="bg-white border border-gray-300 rounded-md px-4 py-1"
        />
        <button className="bg-blue-500 text-white rounded-md px-4 py-1 ms-2">
          Search
        </button>
      </div>
      <div className="flex flex-row items-center gap-8">
        <Link href="/notifications">
          <FaRegBell className="w-5 h-5 mt-1 text-gray-600 hover:text-gray-800 transition-colors duration-200" />
        </Link>
        <Link href="/dashboard/profile">
          <Image
            src="/images/user-placeholder.jpg"
            alt="Profile"
            className="rounded-full w-[40px] h-[40px] object-cover"
            width={40}
            height={40}
          />
        </Link>
      </div>
    </div>
  );
}
