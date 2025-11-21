"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";

export interface IProfilePageProps {}

export default function ProfilePage(props: IProfilePageProps) {
  const [editPersonalInfo, setEditPersonalInfo] = React.useState(false);
  const toggleEditPersonalInfo = () => setEditPersonalInfo((prev) => !prev);
  const [editStoreDetails, setEditStoreDetails] = React.useState(false);
  const toggleEditStoreDetails = () => setEditStoreDetails((prev) => !prev);

  return (
    <main className="p-4 md:p-8">
      <div className="flex flex-row justify-start items-center gap-6">
        <Image
          src="/images/user-placeholder.jpg"
          alt="Profile"
          className="rounded-full w-[120px] h-[120px] object-cover"
          width={120}
          height={120}
        />
        <div>
          <h2 className="text-xl font-medium">John Doe</h2>
          <p className="text-sm font-bold text-gray-500">Owner</p>
          <p className="bg-gray-300 px-4 py-1 rounded-lg mt-1">
            Active Subscription
          </p>
        </div>
      </div>
      <div className="my-4 bg-white rounded-2xl shadow-md p-4 md:p-6 w-full">
        <div className="flex flex-row justify-between items-center">
          <h3 className="text-2xl font-medium">Personal Information</h3>
          <button
            className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md"
            onClick={toggleEditPersonalInfo}
          >
            {editPersonalInfo ? "Save Data" : "Edit Profile"}
          </button>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h4 className="text-lg font-normal text-gray-600">Full Name</h4>
            {editPersonalInfo ? (
              <input
                type="text"
                placeholder="Enter full name"
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#615cf6] focus:border-transparent"
              />
            ) : (
              <p className="text-md font-medium">John Doe</p>
            )}
          </div>
          <div>
            <h4 className="text-lg font-normal text-gray-600">Email</h4>
            {editPersonalInfo ? (
              <input
                type="text"
                placeholder="Enter email"
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#615cf6] focus:border-transparent"
              />
            ) : (
              <p className="text-md font-medium">john.doe@example.com</p>
            )}
          </div>
          <div>
            <h4 className="text-lg font-normal text-gray-600">Phone</h4>
            {editPersonalInfo ? (
              <input
                type="text"
                placeholder="Enter phone"
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#615cf6] focus:border-transparent"
              />
            ) : (
              <p className="text-md font-medium">+1 234 567 890</p>
            )}
          </div>
          <div className="col-1">
            <h4 className="text-lg font-normal text-gray-600">Address</h4>
            {editPersonalInfo ? (
              <input
                type="text"
                placeholder="Enter address"
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#615cf6] focus:border-transparent"
              />
            ) : (
              <p className="text-md font-medium">123 Main St, Springfield</p>
            )}
          </div>
          <div>
            <h4 className="text-lg font-normal text-gray-600">NID</h4>
            {editPersonalInfo ? (
              <input
                type="text"
                placeholder="Enter NID"
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#615cf6] focus:border-transparent"
              />
            ) : (
              <p className="text-md font-medium">550021031001</p>
            )}
          </div>
        </div>
      </div>
      <div className="my-4 bg-white rounded-2xl shadow-md p-4 md:p-6 w-full">
        <div className="flex flex-row justify-between items-center">
          <h3 className="text-2xl font-medium">Store Details</h3>
          <Link
            href="/"
            className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md"
          >
            Manage Stores
          </Link>
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
            <h4 className="text-lg font-normal text-gray-600">Store Name</h4>
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
            <h4 className="text-lg font-normal text-gray-600">Store Type</h4>
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
            <h4 className="text-lg font-normal text-gray-600">Branch</h4>
            {editStoreDetails ? (
              <input
                type="text"
                placeholder="Enter branch"
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#615cf6] focus:border-transparent"
              />
            ) : (
              <p className="text-md font-medium">Midfort Branch</p>
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
              <p className="text-md font-medium">123 Business Rd, Metropolis</p>
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
              <p className="text-md font-medium">contact@medicol.com</p>
            )}
          </div>
          <div>
            <h4 className="text-lg font-normal text-gray-600">Store Manager</h4>
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
            <h4 className="text-lg font-normal text-gray-600">Manager Phone</h4>
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
            <h4 className="text-lg font-normal text-gray-600">Manager Email</h4>
            {editStoreDetails ? (
              <input
                type="text"
                placeholder="Enter manager email"
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#615cf6] focus:border-transparent"
              />
            ) : (
              <p className="text-md font-medium">john.doe@medicol.com</p>
            )}
          </div>
          <button
            className="w-fit bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md"
            onClick={toggleEditStoreDetails}
          >
            {editStoreDetails ? "Save" : "Update"} Store Info
          </button>
        </div>
      </div>
      <div className="my-4 bg-white rounded-2xl shadow-md p-4 md:p-6 w-full">
        <h3 className="text-2xl font-medium">Security</h3>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-lg font-normal text-gray-600">Password</h4>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="password"
                placeholder="Enter new password"
                className="w-3/5 border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#615cf6] focus:border-transparent"
              />
              <button className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-3 py-1 rounded-md text-sm">
                Update
              </button>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-normal text-gray-600">
              Two-Factor Authentication
            </h4>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#615cf6]"></div>
              <span className="ml-3 text-sm font-medium text-gray-900">
                Enabled
              </span>
            </label>
          </div>
          <button className="w-fit bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md">
            Active Sessions (logout from other devices)
          </button>
          <button className="w-fit bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md">
            Device Login History
          </button>
        </div>
      </div>
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
