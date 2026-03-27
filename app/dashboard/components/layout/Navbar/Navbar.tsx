import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { FaRegBell } from "react-icons/fa6";
import { IoMdMenu } from "react-icons/io";
import { FaTimes } from "react-icons/fa";
import useAuth from "@/lib/hooks/useAuth";
import Notifications from "./Notifications";

export interface INavbarProps {
    openSidebar?: () => void;
}

export default function Navbar(props: INavbarProps) {
    const { authUser } = useAuth();

    return (
        <div className="w-full px-8 pt-6 flex flex-row justify-end items-center">
            <IoMdMenu
                className="w-6 h-6 pointer text-gray-600 hover:text-gray-800 transition-colors duration-200 md:hidden"
                onClick={props.openSidebar}
            />
            <div className="flex flex-row items-center gap-8">
                <Notifications />

                <Link
                    href="/dashboard/profile"
                    className="flex flex-row items-center gap-2"
                >
                    <Image
                        src={authUser?.image ?? "/images/user-placeholder.jpg"}
                        alt={authUser?.name ?? "Profile"}
                        className="rounded-full w-[40px] h-[40px] object-cover"
                        width={40}
                        height={40}
                    />
                    {authUser?.name && (
                        <span className="hidden md:inline-block ms-2 text-gray-700 font-semibold">
                            {authUser.name}
                        </span>
                    )}
                </Link>
            </div>
        </div>
    );
}
