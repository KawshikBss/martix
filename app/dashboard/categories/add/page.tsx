"use client";

import { useCreateCategory } from "@/lib/hooks/categories/useCreateCategory";
import * as React from "react";
import { toast } from "react-toastify";
import CategoryForm from "../components/CategoryForm";
import { useRouter } from "next/navigation";
import Loader from "@/components/ui/loaders/Loader";
import { StoreInterface } from "@/lib/interfaces/StoreIntefrace";

export default function AddCategory() {
    const { back } = useRouter();

    const { mutateAsync: createCategoryMutation } = useCreateCategory();

    const categoryFormRef = React.useRef<HTMLFormElement>(null);

    const [imagePreview, setImagePreview] = React.useState<string | null>(null);
    const [selectedStores, setSelectedStores] = React.useState<
        StoreInterface[]
    >([]);

    const addToSelectedStores = (store: StoreInterface) => {
        setSelectedStores((prev) => [...prev, store]);
    };

    const removeFromSelectedStores = (store: StoreInterface) => {
        setSelectedStores((prev) => prev.filter((item) => item.id != store.id));
    };

    const resetForm = () => {
        if (!categoryFormRef.current) return;
        categoryFormRef.current.reset();
        setImagePreview(null);
        setSelectedStores([]);
    };

    const [savingCategory, setSavingCategory] = React.useState(false);

    const handleCategoryCreate = async () => {
        if (!categoryFormRef.current) return;
        setSavingCategory(true);

        const formElements = categoryFormRef.current.elements;
        const image = (formElements.namedItem("image") as HTMLInputElement)
            .files?.[0];
        const name = (formElements.namedItem("name") as HTMLInputElement).value;
        const slug = (formElements.namedItem("sku") as HTMLInputElement).value;
        const parentId = (
            formElements.namedItem("parent_id") as HTMLInputElement
        ).value;
        const status = (formElements.namedItem("status") as HTMLInputElement)
            .checked;

        try {
            const formData = new FormData();
            if (image) formData.append("image", image);
            formData.append("name", name);
            formData.append("slug", slug);
            if (parentId) formData.append("parent_id", parentId);
            formData.append("status", status ? "active" : "inactive");
            if (selectedStores.length) {
                selectedStores.forEach((item, index) => {
                    formData.append(`visible_stores[${index}]`, item.id);
                });
            }

            const response = await createCategoryMutation(formData);
            console.log("Category created:", response);
            if (response) {
                toast.success("Category created successfully!");
                categoryFormRef.current.reset();
                setImagePreview(null);
            }
        } catch (error) {
            console.error("Error creating category:", error);
        } finally {
            setSavingCategory(false);
        }
    };

    return (
        <main className="p-8">
            <div className="w-full bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row justify-between items-center">
                <h3 className="text-2xl font-medium mb-4 md:mb-0">
                    New Category
                </h3>
                <div>
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
                    {!savingCategory ? (
                        <button
                            onClick={handleCategoryCreate}
                            className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md cursor-pointer"
                        >
                            Save
                        </button>
                    ) : (
                        <Loader inline />
                    )}
                </div>
            </div>
            <CategoryForm
                ref={categoryFormRef}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
                selectedStores={selectedStores}
                addToSelectedStores={addToSelectedStores}
                removeFromSelectedStores={removeFromSelectedStores}
            />
        </main>
    );
}
