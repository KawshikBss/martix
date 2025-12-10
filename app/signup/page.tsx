"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";

export interface ISignupPageProps {}

export default function SignupPage(props: ISignupPageProps) {
    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formElements = e.currentTarget.elements;
        const first_name = (
            formElements.namedItem("first_name") as HTMLInputElement
        ).value;
        const last_name = (
            formElements.namedItem("last_name") as HTMLInputElement
        ).value;
        const name = first_name + " " + last_name;
        const email = (formElements.namedItem("email") as HTMLInputElement)
            .value;
        const phone = (formElements.namedItem("phone") as HTMLInputElement)
            .value;
        const password = (
            formElements.namedItem("password") as HTMLInputElement
        ).value;
        const confirm_password = (
            formElements.namedItem("confirm_password") as HTMLInputElement
        ).value;
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("password", password);
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/register`,
                {
                    method: "POST",
                    body: formData,
                }
            );
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Error during signup:", error);
        }
    };
    return (
        <div
            className="bg-[url(https://images.unsplash.com/photo-1557264337-e8a93017fe92?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]
        w-[100vw] h-[100vh] bg-no-repeat bg-cover flex items-center justify-center"
        >
            <form
                onSubmit={handleSignup}
                className="bg-white rounded-md p-8 shadow-xl md:w-1/3"
            >
                <Link href="/">
                    <Image
                        src="/logo.png"
                        alt="Martix Logo"
                        className="rounded-full hover:scale-105 transition-transform duration-200 mb-6 mx-auto"
                        width={150}
                        height={150}
                    />
                </Link>
                <h2 className="text-4xl font-bold mb-1 text-center">
                    Join Martix
                </h2>
                <h2 className="text-xl font-medium mb-6 text-center">
                    Signup to get started
                </h2>
                <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6 mb-6">
                    <div className="sm:col-span-3">
                        <label
                            htmlFor="first_name"
                            className="block text-sm/6 font-medium"
                        >
                            First Name
                        </label>
                        <div className="mt-2">
                            <input
                                id="first_name"
                                name="first_name"
                                type="text"
                                autoComplete="first name"
                                className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label
                            htmlFor="last_name"
                            className="block text-sm/6 font-medium"
                        >
                            Last Name
                        </label>
                        <div className="mt-2">
                            <input
                                id="last_name"
                                name="last_name"
                                type="text"
                                autoComplete="last name"
                                className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-3">
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
                                type="email"
                                autoComplete="email"
                                className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label
                            htmlFor="phone"
                            className="block text-sm/6 font-medium"
                        >
                            Phone
                        </label>
                        <div className="mt-2">
                            <input
                                id="phone"
                                name="phone"
                                type="text"
                                autoComplete="phone"
                                className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-3">
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
                    <div className="sm:col-span-3">
                        <label
                            htmlFor="confirm_password"
                            className="block text-sm/6 font-medium"
                        >
                            Confirm Password
                        </label>
                        <div className="mt-2">
                            <input
                                id="confirm_password"
                                name="confirm_password"
                                type="confirm_password"
                                autoComplete="current-confirm_password"
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
                                id="terms_conditions"
                                name="terms_conditions"
                                type="checkbox"
                                aria-describedby="terms_conditions"
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
                            htmlFor="terms_conditions"
                            className="font-medium text-gray-900"
                        >
                            I agree to the Terms and Conditions
                        </label>
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full text-center mt-6 bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md cursor-pointer"
                >
                    Sign Up
                </button>
                <p className="text-md font-medium mt-6">
                    Already have an account?{" "}
                    <Link href="/login" className="text-[#615cf6]">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
}
