"use client";

import CategoryListItem from "./CategoryListItem";
import { useParentCategories } from "@/lib/hooks/categories/useParentCategories";

type Props = {};

const CategoryList = (props: Props) => {
    const { data: categories, isLoading: categoriesIsLoading } =
        useParentCategories();
    return (
        <div className="md:w-3/5">
            <input
                type="text"
                placeholder="Search categories..."
                className="border border-gray-300 rounded-md my-4 px-2 py-1 w-full md:w-2/5"
            />
            {categoriesIsLoading ? (
                <p>Loading...</p>
            ) : (
                categories?.map((category) => (
                    <CategoryListItem key={category.slug} category={category} />
                ))
            )}
        </div>
    );
};

export default CategoryList;
