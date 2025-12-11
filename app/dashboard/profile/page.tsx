"use client";

import useAuth from "@/lib/hooks/useAuth";
import Link from "next/link";
import * as React from "react";
import ProfileInformationForm from "./components/ProfileInformationForm";
import SecurityInformationForm from "./components/SecurityInformationForm";
import ProfileSummary from "./components/ProfileSummary";

export interface IProfilePageProps {}

export default function ProfilePage(props: IProfilePageProps) {
    const { authUser, updateAuthUser } = useAuth();

    const [editStoreDetails, setEditStoreDetails] = React.useState(false);
    const toggleEditStoreDetails = () => setEditStoreDetails((prev) => !prev);

    return (
        <main className="p-4 md:p-8">
            <ProfileSummary
                authUser={authUser}
                updateAuthUser={updateAuthUser}
            />

            <ProfileInformationForm
                authUser={authUser}
                updateAuthUser={updateAuthUser}
            />

            <div className="my-4 bg-white rounded-2xl shadow-md p-4 md:p-6 w-full">
                <div className="flex flex-row justify-between items-center">
                    <h3 className="text-2xl font-medium">Store Details</h3>
                    <button
                        className="w-fit bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md"
                        onClick={toggleEditStoreDetails}
                    >
                        {editStoreDetails ? "Save" : "Update"} Store Info
                    </button>
                </div>
                <div className="flex flex-col w-full md:w-1/3 mt-2">
                    <label className="mb-1 text-sm text-gray-600">Store</label>
                    <select className="bg-white border border-gray-300 rounded-md px-2 py-1">
                        <option>Midfort Branch</option>
                        <option>Banani Branch</option>
                    </select>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <h4 className="text-lg font-normal text-gray-600">
                            Store Name
                        </h4>
                        {editStoreDetails ? (
                            <input
                                type="text"
                                placeholder="Enter store name"
                                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#615cf6] focus:border-transparent"
                            />
                        ) : (
                            <p className="text-md font-medium">Medicol</p>
                        )}
                    </div>
                    <div>
                        <h4 className="text-lg font-normal text-gray-600">
                            Store Type
                        </h4>
                        {editStoreDetails ? (
                            <input
                                type="text"
                                placeholder="Enter store type"
                                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#615cf6] focus:border-transparent"
                            />
                        ) : (
                            <p className="text-md font-medium">Pharmacy</p>
                        )}
                    </div>
                    <div>
                        <h4 className="text-lg font-normal text-gray-600">
                            Branch
                        </h4>
                        {editStoreDetails ? (
                            <input
                                type="text"
                                placeholder="Enter branch"
                                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#615cf6] focus:border-transparent"
                            />
                        ) : (
                            <p className="text-md font-medium">
                                Midfort Branch
                            </p>
                        )}
                    </div>
                    <div>
                        <h4 className="text-lg font-normal text-gray-600">
                            Business Address
                        </h4>
                        {editStoreDetails ? (
                            <input
                                type="text"
                                placeholder="Enter business address"
                                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#615cf6] focus:border-transparent"
                            />
                        ) : (
                            <p className="text-md font-medium">
                                123 Business Rd, Metropolis
                            </p>
                        )}
                    </div>
                    <div>
                        <h4 className="text-lg font-normal text-gray-600">
                            Business Phone
                        </h4>
                        {editStoreDetails ? (
                            <input
                                type="text"
                                placeholder="Enter business phone"
                                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#615cf6] focus:border-transparent"
                            />
                        ) : (
                            <p className="text-md font-medium">123-456-7890</p>
                        )}
                    </div>
                    <div>
                        <h4 className="text-lg font-normal text-gray-600">
                            Business Email
                        </h4>
                        {editStoreDetails ? (
                            <input
                                type="text"
                                placeholder="Enter business email"
                                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#615cf6] focus:border-transparent"
                            />
                        ) : (
                            <p className="text-md font-medium">
                                contact@medicol.com
                            </p>
                        )}
                    </div>
                    <div>
                        <h4 className="text-lg font-normal text-gray-600">
                            Store Manager
                        </h4>
                        {editStoreDetails ? (
                            <input
                                type="text"
                                placeholder="Enter store manager"
                                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#615cf6] focus:border-transparent"
                            />
                        ) : (
                            <p className="text-md font-medium">John Doe</p>
                        )}
                    </div>
                    <div>
                        <h4 className="text-lg font-normal text-gray-600">
                            Manager Phone
                        </h4>
                        {editStoreDetails ? (
                            <input
                                type="text"
                                placeholder="Enter manager phone"
                                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#615cf6] focus:border-transparent"
                            />
                        ) : (
                            <p className="text-md font-medium">123-456-7890</p>
                        )}
                    </div>
                    <div>
                        <h4 className="text-lg font-normal text-gray-600">
                            Manager Email
                        </h4>
                        {editStoreDetails ? (
                            <input
                                type="text"
                                placeholder="Enter manager email"
                                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#615cf6] focus:border-transparent"
                            />
                        ) : (
                            <p className="text-md font-medium">
                                john.doe@medicol.com
                            </p>
                        )}
                    </div>
                    <Link
                        href="/"
                        className="w-fit bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md"
                    >
                        Manage Stores
                    </Link>
                </div>
            </div>

            <SecurityInformationForm
                authUser={authUser}
                updateAuthUser={updateAuthUser}
            />

            <div className="my-4 bg-white rounded-2xl shadow-md shadow-red-400 p-4 md:p-6 w-full">
                <h3 className="text-2xl font-medium">Danger Zone</h3>
                <div className="mt-4 flex flex-row justify-start items-center gap-4">
                    <button className="w-fit bg-red-400 hover:bg-transparent text-white hover:text-red-400 border border-red-400 px-2 py-1 rounded-md">
                        Deactivate Account
                    </button>
                    <button className="w-fit bg-red-400 hover:bg-transparent text-white hover:text-red-400 border border-red-400 px-2 py-1 rounded-md">
                        Permenantly Delete Account
                    </button>
                </div>
            </div>
        </main>
    );
}
