"use client";

import useAuth from "@/lib/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { toast } from "react-toastify";

export interface ILoginPageProps {}

export default function LoginPage(props: ILoginPageProps) {
    const { login } = useAuth();
    const hanleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formElements = e.currentTarget.elements;
        const email = (formElements.namedItem("email") as HTMLInputElement)
            .value;
        const password = (
            formElements.namedItem("password") as HTMLInputElement
        ).value;
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                }
            );
            const data = await response.json();

            if (response.ok && data && data.token && data.user) {
                toast.success(`Login successful! Welcome back`);
                await login(data.token, data.user);
            } else if (data && data.error) {
                toast.error(data.error);
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    };
    return (
        <div
            className="bg-[url(https://images.unsplash.com/photo-1557264337-e8a93017fe92?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]
        w-[100vw] h-[100vh] bg-no-repeat bg-cover flex items-center justify-center"
        >
            <form
                onSubmit={hanleLogin}
                className="bg-white rounded-md p-8 shadow-xl sm:w-1/2 md:w-1/3"
            >
                <Link href="/">
                    <Image
                        src="/logo.png"
                        alt="Description"
                        className="rounded-full hover:scale-105 transition-transform duration-200 mb-6 mx-auto"
                        width={150}
                        height={150}
                    />
                </Link>
                <h2 className="text-4xl font-bold mb-1 text-center">
                    Welcome Back
                </h2>
                <h2 className="text-xl font-medium mb-6 text-center">
                    Login to catch up
                </h2>
                <div className="flex flex-col gap-6 mb-6">
                    <div className="w-full">
                        <label
                            htmlFor="email"
                            className="block text-sm/6 font-medium"
                        >
                            Email
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="text"
                                autoComplete="email"
                                className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                            />
                        </div>
                    </div>
                    <div className="w-full">
                        <label
                            htmlFor="password"
                            className="block text-sm/6 font-medium"
                        >
                            Password
                        </label>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex gap-3">
                    <div className="flex h-6 shrink-0 items-center">
                        <div className="group grid size-4 grid-cols-1">
                            <input
                                defaultChecked
                                id="remember_me"
                                name="remember_me"
                                type="checkbox"
                                aria-describedby="remember_me"
                                className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                            />
                            <svg
                                fill="none"
                                viewBox="0 0 14 14"
                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                            >
                                <path
                                    d="M3 8L6 11L11 3.5"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-checked:opacity-100"
                                />
                                <path
                                    d="M3 7H11"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-indeterminate:opacity-100"
                                />
                            </svg>
                        </div>
                    </div>
                    <div className="text-sm/6">
                        <label
                            htmlFor="remember_me"
                            className="font-medium text-gray-900"
                        >
                            Remember me
                        </label>
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full text-center mt-6 bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md cursor-pointer"
                >
                    Login
                </button>
                <p className="text-md font-medium mt-6">
                    Don't have an account?{" "}
                    <Link href="/signup" className="text-[#615cf6]">
                        Sign up
                    </Link>
                </p>
            </form>
        </div>
    );
}
