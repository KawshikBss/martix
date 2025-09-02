import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { FaAngleDown, FaRegUserCircle, FaRegUser } from "react-icons/fa";
import { FiHome } from 'react-icons/fi';
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { LuStore, LuChartNoAxesCombined } from "react-icons/lu";
import { BsBank, BsGear } from "react-icons/bs";

export interface ISidebarProps {
}

interface INavItem {
    icon?: React.ReactNode;
    title: string;
    href: string;
    children?: INavItem[];
}

const navItems: INavItem[] = [
    { icon: <FiHome />, title: "Home", href: "/" },
    {
        icon: <RiDashboardHorizontalLine />, title: "Dashboard", href: "/dashboard", children: [
            {
                icon: <LuStore />, title: 'Store', href: '/dashboard/store', children: [
                    {
                        title: 'Products', href: '/dashboard/store/products'
                    },
                    {
                        title: 'Add Product', href: '/dashboard/store/products/add'
                    },
                    {
                        title: 'Categories', href: '/dashboard/store/categories'
                    }
                ]
            },
            {
                icon: <LuChartNoAxesCombined />, title: 'Analytics', href: '/dashboard/analytics', children: [
                    {
                        title: 'Traffic', href: '/dashboard/analytics/traffic'
                    },
                    {
                        title: 'Earning', href: '/dashboard/analytics/earning'
                    }
                ]
            },
            {
                icon: <BsBank />, title: 'Finances', href: '/dashboard/finances', children: [
                    {
                        title: 'Payment', href: '/dashboard/finances/payment'
                    },
                    {
                        title: 'Payout', href: '/dashboard/finances/payout'
                    }
                ]
            }
        ]
    },
    {
        icon: <FaRegUserCircle />, title: "Account", href: "/account", children: [
            {
                icon: <FaRegUser />, title: 'Profile', href: '/account/profile',
            },
            {
                icon: <BsGear />, title: 'Settings', href: '/account/settings',
            }
        ]
    },
];

export function Sidebar(props: ISidebarProps) {
    return (
        <div className='w-2/11 h-[100vh] px-8 overflow-y-scroll'>
            <Link href="/">
                <Image src="/logo.png" alt="Description" className='rounded-full hover:scale-105 transition-transform duration-200 my-10 mx-auto' width={150} height={150} />
            </Link>
            <ul className='list-none'>
                {navItems.map((item) => (
                    <li key={item.title} className='my-4 flex flex-col'>
                        <Link href={item.href}>
                            <span className='w-full bg-white rounded-md flex flex-row justify-start items-center gap-2 px-2 py-1'>
                                {item.icon && item.icon}{item.title}
                                {item.children && item.children.length > 0 && <FaAngleDown className='ms-auto' />}
                            </span>
                        </Link>
                        {
                            item.children && item.children.length > 0 && (
                                <div className='px-1 py-2'>{
                                    item.children.map(itemChild => (
                                        <div key={itemChild.title}>
                                            <Link href={itemChild.href} key={itemChild.title}>
                                                <span className='w-full hover:bg-white rounded-md flex flex-row justify-start items-center gap-3 px-2 py-1'>
                                                    {itemChild.icon && itemChild.icon}{itemChild.title}
                                                    {itemChild.children && itemChild.children.length > 0 && <FaAngleDown className='ms-auto' />}
                                                </span>
                                            </Link>
                                            {
                                                itemChild.children && itemChild.children.length > 0 && (
                                                    <div className='ms-3 px-1 border-l-1 border-l-gray-400'>{
                                                        itemChild.children.map(itemChild2 => (
                                                            <div key={itemChild2.title}>
                                                                <Link href={itemChild2.href}>
                                                                    <span className='w-full hover:bg-white rounded-md flex flex-row justify-start items-center gap-3 ps-2 py-1'>
                                                                        {itemChild2.icon && itemChild2.icon}{itemChild2.title}
                                                                        {itemChild2.children && itemChild2.children.length > 0 && <FaAngleDown className='ms-auto' />}
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                        ))
                                                    }
                                                    </div>
                                                )
                                            }
                                        </div>
                                    ))
                                }
                                </div>
                            )
                        }
                    </li>
                ))}
            </ul>
        </div>
    );
}
