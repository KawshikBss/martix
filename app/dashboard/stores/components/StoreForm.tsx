"use client";

import { useRoles } from "@/lib/hooks/roles/useRoles";
import { useUsers } from "@/lib/hooks/users/useUsers";
import Image from "next/image";
import Link from "next/link";
import React, {
    ChangeEvent,
    Dispatch,
    Ref,
    SetStateAction,
    useRef,
    useState,
} from "react";
import { FaCamera } from "react-icons/fa";
import { toast } from "react-toastify";

type Props = {
    ref: Ref<HTMLFormElement>;
    imagePreview?: string | null;
    setImagePreview: Dispatch<SetStateAction<string | null>>;
    staffList: StaffRecord[];
    setSelectedStaff: Dispatch<SetStateAction<RecordInterface | null>>;
    setSelectedRole: Dispatch<SetStateAction<RecordInterface | null>>;
    removeFromStaffList: (staff_id: string) => void;
    onStaffSelect: (id: string, name: string) => void;
    onRoleSelect: (id: string, name: string) => void;
    onAddStaffToList: () => void;
};

interface RecordInterface {
    id: string;
    name: string;
}

interface StaffRecord {
    staff: RecordInterface;
    role: RecordInterface;
}

const StoreForm = ({
    ref,
    imagePreview,
    setImagePreview,
    staffList,
    setSelectedStaff,
    setSelectedRole,
    removeFromStaffList,
    onStaffSelect,
    onRoleSelect,
    onAddStaffToList,
}: Props) => {
    const imageInputRef = useRef<HTMLInputElement | null>(null);

    const handleImageClick = () => imageInputRef.current?.click();

    const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        setImagePreview(url);
    };

    const { data: users } = useUsers();
    const { data: roles } = useRoles();

    return (
        <form ref={ref} className="flex flex-col md:flex-row md:gap-6">
            <div className="w-full md:w-1/2 bg-white rounded-2xl shadow-md p-6 mt-6 md:my-6">
                <h3 className="text-2xl font-medium">General Information</h3>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="col-span-full">
                        <label
                            htmlFor="cover-photo"
                            className="block text-sm/6 font-medium text-gray-900"
                        >
                            Store Logo
                        </label>
                        <div
                            onClick={handleImageClick}
                            className="relative cursor-pointer mt-2 as flex justify-center rounded-lg overflow-hidden bg-gray-100 outline-1 -outline-offset-1 outline-gray-300 px-6 py-24"
                        >
                            <div className="text-center flex flex-col items-center">
                                <FaCamera
                                    aria-hidden="true"
                                    className="mx-auto size-12 text-gray-300"
                                />
                                <div className="mt-4 flex text-sm/6 text-gray-600">
                                    <label
                                        htmlFor="image"
                                        className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-600 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-600 hover:text-indigo-500"
                                    >
                                        <span>Upload a file</span>
                                        <input
                                            ref={imageInputRef}
                                            id="image"
                                            name="image"
                                            type="file"
                                            className="sr-only"
                                            onChange={handleImageChange}
                                        />
                                    </label>
                                </div>
                                <p className="text-xs/5 text-gray-600">
                                    PNG, JPG, GIF up to 10MB
                                </p>
                            </div>
                            {imagePreview && (
                                <Image
                                    src={imagePreview ?? ""}
                                    alt="preview"
                                    className="absolute inset-0 w-full h-full object-cover overflow-hidden focus:outline-none"
                                    width={600}
                                    height={400}
                                />
                            )}
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label
                            htmlFor="name"
                            className="block text-sm/6 font-medium"
                        >
                            Store Name
                        </label>
                        <div className="mt-2">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label
                            htmlFor="branch"
                            className="block text-sm/6 font-medium"
                        >
                            Store Branch
                        </label>
                        <div className="mt-2">
                            <input
                                id="branch"
                                name="branch"
                                type="text"
                                autoComplete="branch"
                                className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label
                            htmlFor="unique_id"
                            className="block text-sm/6 font-medium"
                        >
                            Store Code
                        </label>
                        <div className="mt-2">
                            <input
                                id="unique_id"
                                name="unique_id"
                                type="text"
                                autoComplete="unique_id"
                                className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label
                            htmlFor="type"
                            className="block text-sm/6 font-medium"
                        >
                            Store Type
                        </label>
                        <div className="mt-2">
                            <input
                                id="type"
                                name="type"
                                type="text"
                                autoComplete="type"
                                className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                            />
                        </div>
                    </div>
                    <div className="col-span-full">
                        <label
                            htmlFor="description"
                            className="block text-sm/6 font-medium text-gray-900"
                        >
                            Description
                        </label>
                        <div className="mt-2">
                            <textarea
                                id="description"
                                name="description"
                                rows={3}
                                className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                defaultValue={""}
                            />
                        </div>
                        <p className="mt-3 text-sm/6 text-gray-600">
                            Write a few sentences about your store.
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-full md:w-1/2">
                <div className="w-full bg-white rounded-2xl shadow-md p-6 my-6">
                    <h3 className="text-2xl font-medium">
                        Location & Contact Information
                    </h3>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label
                                htmlFor="email"
                                className="block text-sm/6 font-medium"
                            >
                                Store Email
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
                        <div className="sm:col-span-3">
                            <label
                                htmlFor="phone"
                                className="block text-sm/6 font-medium"
                            >
                                Store Phone
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
                        <div className="col-span-full">
                            <label
                                htmlFor="address"
                                className="block text-sm/6 font-medium"
                            >
                                Store Address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="address"
                                    name="address"
                                    type="text"
                                    autoComplete="address"
                                    className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <div className="col-span-full">
                            <label
                                htmlFor="address_line_2"
                                className="block text-sm/6 font-medium"
                            >
                                Store Address 2 (optional)
                            </label>
                            <div className="mt-2">
                                <input
                                    id="address_line_2"
                                    name="address_line_2"
                                    type="text"
                                    autoComplete="address_line_2"
                                    className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full bg-white rounded-2xl shadow-md p-6 my-6">
                    <h3 className="text-2xl font-medium">Staff & Roles</h3>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 items-end sm:grid-cols-7">
                        <div className="col-span-full">
                            <label
                                htmlFor="manager"
                                className="block text-sm/6 font-medium"
                            >
                                Manager
                            </label>
                            <div className="mt-2 grid grid-cols-1">
                                <select
                                    id="manager"
                                    name="manager"
                                    autoComplete="manager"
                                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                >
                                    <option>None</option>
                                    {users?.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mt-2">
                                <Link
                                    href="/dashboard/categories/add"
                                    className="text-indigo-600 hover:text-indigo-500 text-sm/6"
                                >
                                    Add New Staff
                                </Link>
                            </div>
                        </div>
                        {!staffList.length ? (
                            <div className="col-span-full">Add Staffs</div>
                        ) : (
                            staffList.map((staffRecord, index) => (
                                <React.Fragment key={index.toString()}>
                                    <div className="sm:col-span-3">
                                        {staffRecord.staff.name}
                                    </div>
                                    <div className="sm:col-span-3">
                                        [ {staffRecord.role.name} ]
                                    </div>
                                    <button
                                        onClick={() =>
                                            removeFromStaffList(
                                                staffRecord.staff.id
                                            )
                                        }
                                        className="sm:col-span-1 bg-red-400 hover:bg-transparent text-white hover:text-red-400 border border-red-400 px-2 py-1 rounded-md cursor-pointer"
                                    >
                                        Remove
                                    </button>
                                </React.Fragment>
                            ))
                        )}
                        <div className="sm:col-span-3">
                            <label
                                htmlFor="staff"
                                className="block text-sm/6 font-medium"
                            >
                                Staff
                            </label>
                            <div className="mt-2 grid grid-cols-1">
                                <select
                                    id="staff"
                                    name="staff"
                                    autoComplete="staff"
                                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                >
                                    <option
                                        onClick={() => setSelectedStaff(null)}
                                    >
                                        None
                                    </option>

                                    {users?.map((user) => (
                                        <option
                                            key={user.id}
                                            onClick={() =>
                                                onStaffSelect(
                                                    user.id,
                                                    user.name
                                                )
                                            }
                                        >
                                            {user.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label
                                htmlFor="role"
                                className="block text-sm/6 font-medium"
                            >
                                Role
                            </label>
                            <div className="mt-2 grid grid-cols-1">
                                <select
                                    id="role"
                                    name="role"
                                    autoComplete="role"
                                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                >
                                    <option
                                        onClick={() => setSelectedRole(null)}
                                    >
                                        None
                                    </option>
                                    {roles?.map((role) => (
                                        <option
                                            key={role.id}
                                            onClick={() =>
                                                onRoleSelect(role.id, role.name)
                                            }
                                        >
                                            {role.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <span
                            onClick={onAddStaffToList}
                            className="sm:col-span-1 bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md cursor-pointer"
                        >
                            Add
                        </span>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default StoreForm;
