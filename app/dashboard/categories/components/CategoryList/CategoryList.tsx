"use client";

import Link from "next/link";
import CategoryListItem from "./CategoryListItem";
import { useParentCategories } from "@/lib/hooks/categories/useParentCategories";
import Loader from "@/components/ui/loaders/Loader";
import { ChangeEvent, useState } from "react";

type Props = {};

const CategoryList = (props: Props) => {
    const [query, setQuery] = useState<string | undefined>(undefined);
    const onQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const {
        data: categories,
        isLoading: categoriesIsLoading,
        isSuccess: categoriesIsSuccess,
    } = useParentCategories(query);
    return (
        <div className="md:w-3/5">
            <input
                type="text"
                placeholder="Search categories..."
                onChange={onQueryChange}
                className="border border-gray-300 rounded-md my-4 px-2 py-1 w-full md:w-2/5"
            />
            {categoriesIsLoading ? (
                <Loader />
            ) : !categoriesIsLoading &&
              categoriesIsSuccess &&
              !categories.length ? (
                <p>
                    No categories yet{" "}
                    <Link
                        href="/dashboard/categories/add"
                        className="text-[#615cf6]"
                    >
                        Add new
                    </Link>
                    ?
                </p>
            ) : (
                categories?.map((category) => (
                    <CategoryListItem key={category.slug} category={category} />
                ))
            )}
        </div>
    );
};

export default CategoryList;
