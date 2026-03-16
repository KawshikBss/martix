"use client";

import DashboardModal from "@/components/ui/modals/DashboardModal";
import { useRoles } from "@/lib/hooks/roles/useRoles";
import { useAddStoreMember } from "@/lib/hooks/stores/useAddStoreMember";
import { useUsers } from "@/lib/hooks/users/useUsers";
import { StoreInterface } from "@/lib/interfaces/StoreIntefrace";
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
    show?: boolean;
    onClose?: () => void;
    store?: StoreInterface;
};

const AddMemberModal = ({ store, show, onClose }: Props) => {
    const ref = useRef<HTMLFormElement>(null);
    const { data: roles } = useRoles();

    const { mutateAsync: addStoreMemberMutation } = useAddStoreMember();

    const handleAddMember = async () => {
        if (!ref.current) return;
        if (!store) {
            toast.error("No store selected");
            return;
        }

        const elements = ref.current?.elements;
        const user = (elements?.namedItem("identity") as HTMLInputElement)
            .value;
        const role = (elements?.namedItem("role") as HTMLInputElement).value;
        if (!user.length) {
            toast.error(
                "Need to enter at least an email, phone or uid for identifying user",
            );
            return;
        }
        if (!role.length) {
            toast.error("Select a role to assign");
            return;
        }
        const formData = new FormData();
        formData.append("user", user);
        formData.append("role", role);
        const response = await addStoreMemberMutation({
            id: store.id,
            payload: formData,
        });
        if (response && response.message) {
            toast(response.message);
            if (onClose) onClose!();
        }
    };

    const onReset = () => {
        if (!ref.current) return;
        ref.current.reset();
    };

    return (
        <DashboardModal title="Add Member" show={show} onClose={onClose}>
            <form ref={ref} className="">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <label
                            htmlFor="identity"
                            className="block text-sm/6 font-medium"
                        >
                            User (Email, phone, UID)
                        </label>
                        <div className="mt-2">
                            <input
                                id="identity"
                                name="identity"
                                // defaultValue={store?.identity ?? ""}
                                type="text"
                                autoComplete="identity"
                                className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                            />
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
                                <option value={""}>None</option>
                                {roles?.map((role) => (
                                    <option key={role.id} value={role.id}>
                                        {role.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </form>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <button
                    onClick={onReset}
                    className="col-end-4 bg-red-400 hover:bg-transparent text-white hover:text-red-400 border border-red-400 px-2 py-1 rounded-md cursor-pointer"
                >
                    Reset
                </button>

                <button
                    onClick={handleAddMember}
                    className="col-end-5 bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md cursor-pointer"
                >
                    Add
                </button>
            </div>
        </DashboardModal>
    );
};

export default AddMemberModal;
