"use client";

import Loader from "@/components/ui/loaders/Loader";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import StoreForm from "../../components/StoreForm";
import { useUpdateStore } from "@/lib/hooks/stores/useUpdatetStore";
import { useStore } from "@/lib/hooks/stores/useStore";
import { useQueryClient } from "@tanstack/react-query";

type Props = {};

interface RecordInterface {
    id: string;
    name: string;
}

interface StaffRecord {
    staff: RecordInterface;
    role: RecordInterface;
}

const UpdateStore = (props: Props) => {
    const { storeId } = useParams();
    const { data: store } = useStore(storeId?.toString());

    const { back } = useRouter();

    const [imagePreview, setImagePreview] = useState<string | undefined | null>(
        store?.image_url
    );
    const storeFormRef = useRef<HTMLFormElement>(null);

    const [staffList, setStaffList] = useState<StaffRecord[]>([]);

    const addToStaffList = (staff: RecordInterface, role: RecordInterface) => {
        const staffRecord = { staff, role } as StaffRecord;
        setStaffList((prev) => {
            return [...prev, staffRecord];
        });
    };

    const removeFromStaffList = (staff_id: string) => {
        setStaffList((prev) =>
            prev.filter((item) => item.staff.id != staff_id)
        );
    };

    useEffect(() => {
        if (!store) return;
        setStaffList(
            store.staff.map((item) => {
                return {
                    staff: { id: item.user.id, name: item.user.name },
                    role: { id: item.role.id, name: item.role.name },
                };
            })
        );
        setImagePreview(store.image_url);
    }, [store]);

    const [selectedStaff, setSelectedStaff] = useState<RecordInterface | null>(
        null
    );
    const [selectedRole, setSelectedRole] = useState<RecordInterface | null>(
        null
    );

    const onStaffSelect = (id: string, name: string) => {
        setSelectedStaff({ id, name });
    };

    const onRoleSelect = (id: string, name: string) => {
        setSelectedRole({ id, name });
    };

    const onAddStaffToList = () => {
        if (!selectedStaff || !selectedRole) {
            toast.error("Select both staff and role to add!");
            return;
        }
        addToStaffList(selectedStaff, selectedRole);
    };

    const { mutateAsync: updateStoreMutation } = useUpdateStore();

    const resetForm = () => {
        if (!storeFormRef.current) return;
        storeFormRef.current?.reset();
        setImagePreview(null);
        setStaffList(
            store?.staff?.map((item) => {
                return {
                    staff: { id: item.user.id, name: item.user.name },
                    role: { id: item.role.id, name: item.role.name },
                };
            }) ?? []
        );
    };

    const [savingStore, setSavingStore] = useState(false);

    const queryClient = useQueryClient();

    const handleStoreCreate = async () => {
        if (!storeFormRef.current) return;
        setSavingStore(true);

        const elements = storeFormRef.current?.elements;
        const image = (elements?.namedItem("image") as HTMLInputElement)
            .files?.[0];
        const name = (elements?.namedItem("name") as HTMLInputElement).value;
        const branch = (elements?.namedItem("branch") as HTMLInputElement)
            .value;
        const unique_id = (elements?.namedItem("unique_id") as HTMLInputElement)
            .value;
        const type = (elements?.namedItem("type") as HTMLInputElement).value;
        const description = (
            elements?.namedItem("description") as HTMLInputElement
        ).value;
        const email = (elements?.namedItem("email") as HTMLInputElement).value;
        const phone = (elements?.namedItem("phone") as HTMLInputElement).value;
        const address = (elements?.namedItem("address") as HTMLInputElement)
            .value;
        const address_2 = (
            elements?.namedItem("address_line_2") as HTMLInputElement
        ).value;
        const manager_id = (elements?.namedItem("manager") as HTMLInputElement)
            .value;

        try {
            const formData = new FormData();
            if (image) formData.append("image", image);
            formData.append("name", name);
            formData.append("branch", branch);
            formData.append("unique_id", unique_id);
            formData.append("type", type);
            formData.append("description", description);
            formData.append("email", email);
            formData.append("phone", phone);
            formData.append("address", address);
            formData.append("address_2", address_2);
            if (manager_id) formData.append("manager_id", manager_id);
            if (staffList.length) {
                staffList.forEach((record, index) => {
                    formData.append(
                        `staff_list[${index}][staff_id]`,
                        String(record.staff.id)
                    );
                    formData.append(
                        `staff_list[${index}][role_id]`,
                        String(record.role.id)
                    );
                });
            }
            const response = await updateStoreMutation({
                id: storeId?.toString(),
                payload: formData,
            });
            console.log(response);
            if (response) {
                toast.success("Store created successfully!");
                resetForm();
            }
        } catch (error) {
            console.error("Error creating category:", error);
        } finally {
            setSavingStore(false);
            queryClient.invalidateQueries({ queryKey: ["store", store?.id] });
        }
    };
    return (
        <main className="p-4 md:p-8">
            <div className="w-full bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row justify-between items-center">
                <h3 className="text-2xl font-medium mb-4 md:mb-0">
                    Update Store
                </h3>
                <div className="flex flex-row gap-4">
                    <button
                        onClick={back}
                        className="bg-transparent hover:bg-gray-500 text-gray-500 hover:text-white border border-gray-500 px-2 py-1 rounded-md cursor-pointer mr-2"
                    >
                        Go Back
                    </button>
                    <button
                        onClick={resetForm}
                        className="bg-transparent hover:bg-red-500 text-red-500 hover:text-white border border-red-500 px-2 py-1 rounded-md cursor-pointer mr-2"
                    >
                        Discard Changes
                    </button>
                    {!savingStore ? (
                        <button
                            onClick={handleStoreCreate}
                            className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md cursor-pointer"
                        >
                            Update
                        </button>
                    ) : (
                        <Loader inline />
                    )}
                </div>
            </div>
            <StoreForm
                imagePreview={imagePreview}
                store={store}
                setImagePreview={setImagePreview}
                ref={storeFormRef}
                staffList={staffList}
                setSelectedStaff={setSelectedStaff}
                setSelectedRole={setSelectedRole}
                removeFromStaffList={removeFromStaffList}
                onStaffSelect={onStaffSelect}
                onRoleSelect={onRoleSelect}
                onAddStaffToList={onAddStaffToList}
            />
        </main>
    );
};

export default UpdateStore;
