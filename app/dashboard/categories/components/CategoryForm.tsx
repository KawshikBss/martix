import { useCategories } from "@/lib/hooks/categories/useCategories";
import { useStores } from "@/lib/hooks/stores/useStores";
import { CategoryInterface } from "@/lib/interfaces/CategoryInterface";
import { StoreInterface } from "@/lib/interfaces/StoreIntefrace";
import Image from "next/image";
import React, { ChangeEvent, Ref, useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";

type Props = {
    ref: Ref<HTMLFormElement>;
    imagePreview?: string | null;
    setImagePreview: React.Dispatch<React.SetStateAction<string | null>>;
    category?: CategoryInterface;
    selectedStores?: StoreInterface[];
    addToSelectedStores?: (store: StoreInterface) => void;
    removeFromSelectedStores?: (store: StoreInterface) => void;
};

const CategoryForm = ({
    ref,
    imagePreview,
    setImagePreview,
    category,
    selectedStores,
    addToSelectedStores,
    removeFromSelectedStores,
}: Props) => {
    const { data: categories } = useCategories();

    const imageInputRef = React.useRef<HTMLInputElement | null>(null);

    const handleImageClick = () => imageInputRef.current?.click();
    const handleImageChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        setImagePreview(url);
    };

    const [status, setStatus] = useState(true);

    useEffect(() => {
        setStatus(
            category ? (category?.status === "active" ? true : false) : true
        );
    }, [category]);

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) =>
        setStatus(e.currentTarget.checked);

    const { data: stores } = useStores();

    return (
        <form ref={ref} className="flex flex-col md:flex-row md:gap-6">
            <div className="w-full md:w-1/2 bg-white rounded-2xl shadow-md p-6 mt-6 md:my-6">
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="col-span-full h-fit md:h-auto mb-1">
                        <label
                            htmlFor="cover-photo"
                            className="block text-sm/6 font-medium text-gray-900"
                        >
                            Category Image
                        </label>
                        <div
                            onClick={handleImageClick}
                            className="cursor-pointer h-full relative mt-2 flex justify-center rounded-lg overflow-hidden bg-gray-100 outline-1 -outline-offset-1 outline-gray-300 px-6 py-10"
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
                            Category Name
                        </label>
                        <div className="mt-2">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                defaultValue={category?.name ?? ""}
                                className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label
                            htmlFor="sku"
                            className="block text-sm/6 font-medium"
                        >
                            Slug / Code
                        </label>
                        <div className="mt-2">
                            <input
                                id="sku"
                                name="sku"
                                type="text"
                                autoComplete="sku"
                                defaultValue={category?.slug ?? ""}
                                className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full md:w-1/2 bg-white rounded-2xl shadow-md p-6 mt-6 md:my-6">
                <div className="sm:col-span-3">
                    <label
                        htmlFor="parent_id"
                        className="block text-sm/6 font-medium"
                    >
                        Parent Category
                    </label>
                    <div className="mt-2 grid grid-cols-1">
                        <select
                            id="parent_id"
                            name="parent_id"
                            autoComplete="parent-category"
                            defaultValue={category?.parent_id}
                            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        >
                            <option value="">None</option>
                            {categories?.map((parentCategory) => (
                                <option
                                    value={parentCategory.id}
                                    key={parentCategory.id}
                                    selected={
                                        category?.parent_id ===
                                        parentCategory.id
                                    }
                                >
                                    {parentCategory.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="sm:col-span-3 mt-1">
                    <label
                        htmlFor="status"
                        className="block text-sm/6 font-medium"
                    >
                        Status
                    </label>
                    <div className="flex gap-3 mt-2">
                        <div className="flex h-6 shrink-0 items-center">
                            <div className="group grid size-4 grid-cols-1">
                                <input
                                    checked={status}
                                    onChange={onStatusChange}
                                    id="status"
                                    name="status"
                                    type="checkbox"
                                    aria-describedby="status-description"
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
                                htmlFor="status"
                                className="font-medium text-gray-900"
                            >
                                Active
                            </label>
                        </div>
                    </div>
                </div>

                <div className="sm:col-span-3 mt-1">
                    <label
                        htmlFor="visible_stores"
                        className="block text-sm/6 font-medium"
                    >
                        Visibility
                    </label>
                    {!selectedStores?.length ? (
                        <div className="col-span-full">
                            Add Stores where category will be visible
                        </div>
                    ) : (
                        selectedStores?.map((store) => (
                            <div
                                key={store.id}
                                className="mt-2 grid grid-cols-6"
                            >
                                <div className="col-span-5 me-1">
                                    {store.name}
                                </div>
                                <div
                                    className="col-span-1"
                                    onClick={() =>
                                        removeFromSelectedStores?.(store)
                                    }
                                >
                                    <div className="ms-auto h-full w-fit bg-red-400 hover:bg-transparent text-white hover:text-red-400 border border-red-400 px-2 py-1 rounded-md cursor-pointer">
                                        Remove
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                    <select
                        id="visible_stores"
                        name="visible_stores"
                        autoComplete="visible_stores"
                        className="col-span-full mt-2 col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    >
                        <option value="">All</option>
                        {stores?.map((store) => (
                            <option
                                key={store.id}
                                onClick={() => addToSelectedStores?.(store)}
                            >
                                {store.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </form>
    );
};

export default CategoryForm;
