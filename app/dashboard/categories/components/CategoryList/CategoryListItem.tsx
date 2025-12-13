import { useDeleteCategory } from "@/lib/hooks/categories/useDeleteCategory";
import { CategoryInterface } from "@/lib/interfaces/CategoryInterface";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

type Props = {
    category: CategoryInterface;
};

const CategoryListItem = (props: Props) => {
    const { category } = props;
    const { mutateAsync: deleteCategory } = useDeleteCategory();
    const handleRemoveCategory = async () => {
        const response = await deleteCategory(category.id);
        if (response && response.message) {
            toast.success(response.message);
        }
    };
    return (
        <div className="px-4 py-2 mt-1">
            <div className="flex flex-col md:flex-row justify-start items-start md:items-center gap-2">
                <div className="flex flex-row justify-start items-start md:items-center">
                    {category.image_url && (
                        <Link href={`/dashboard/categories/${category.id}`}>
                            <Image
                                src={category.image_url}
                                alt="Cat"
                                width={20}
                                height={20}
                                className="rounded-md w-12 md:w-10 h-10 md:h-8 object-cover me-4 md:me-2 border border-gray-300"
                            />
                        </Link>
                    )}

                    <Link href={`/dashboard/categories/${category.id}`}>
                        {category.name}
                    </Link>
                </div>

                <div className="flex flex-row justify-end items-center self-end md:self-center gap-1">
                    <Link
                        href={`/dashboard/categories/${category.id}/edit`}
                        className="text-sm bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] py-0.5 px-2 ms-2 rounded-md"
                    >
                        <FaEdit className="inline mb-1" />
                        Edit
                    </Link>
                    <span
                        onClick={handleRemoveCategory}
                        className="text-sm cursor-pointer bg-red-400 hover:bg-transparent text-white hover:text-red-400 border border-red-400 py-0.5 px-2 ms-2 rounded-md"
                    >
                        <FaTrash className="inline mb-1" />
                        Remove
                    </span>
                </div>
            </div>
            {category.children && (
                <div className="flex flex-col mt-1">
                    {category.children &&
                        category.children.map((child) => (
                            <CategoryListItem
                                key={child.slug}
                                category={child}
                            />
                        ))}
                </div>
            )}
        </div>
    );
};

export default CategoryListItem;
