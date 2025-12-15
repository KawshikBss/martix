"use client";

import * as React from "react";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import CategoryForm from "../../components/CategoryForm";
import { useCategory } from "@/lib/hooks/categories/useCategory";
import { useUpdateCategory } from "@/lib/hooks/categories/useUpdateCategory";
import Loader from "@/components/ui/loaders/Loader";
import { StoreInterface } from "@/lib/interfaces/StoreIntefrace";
import { useQueryClient } from "@tanstack/react-query";

export default function UpdateCategory() {
    const { categoryId } = useParams();

    const { data: category } = useCategory(categoryId?.toString());

    const { back } = useRouter();

    const { mutateAsync: updateCategoryMutation } = useUpdateCategory();

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
        setSelectedStores(category?.visible_to_stores ?? []);
    };

    const [updatingCategory, setUpdatingCategory] = React.useState(false);

    const queryClient = useQueryClient();

    const handleCategoryUpdate = async () => {
        if (!categoryFormRef.current) return;
        setUpdatingCategory(true);

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

            const response = await updateCategoryMutation({
                id: category?.id,
                payload: formData,
            });
            if (response) {
                toast.success("Category updated successfully!");
            }
        } catch (error) {
            console.error("Error creating category:", error);
        } finally {
            setUpdatingCategory(false);
            queryClient.invalidateQueries({
                queryKey: ["category", category?.id],
            });
        }
    };

    React.useEffect(() => {
        if (category && !selectedStores.length) {
            setSelectedStores(category?.visible_to_stores ?? []);
        }
    }, [category]);

    return (
        <main className="p-8">
            <div className="w-full bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row justify-between items-center">
                <h3 className="text-2xl font-medium mb-4 md:mb-0">
                    Update Category
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
                    {!updatingCategory ? (
                        <button
                            onClick={handleCategoryUpdate}
                            className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md cursor-pointer"
                        >
                            Update
                        </button>
                    ) : (
                        <Loader inline />
                    )}
                </div>
            </div>
            <CategoryForm
                ref={categoryFormRef}
                imagePreview={imagePreview ?? category?.image_url}
                setImagePreview={setImagePreview}
                category={category}
                selectedStores={selectedStores}
                addToSelectedStores={addToSelectedStores}
                removeFromSelectedStores={removeFromSelectedStores}
            />
        </main>
    );
}
