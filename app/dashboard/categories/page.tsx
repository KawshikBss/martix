import categoriesData from "@/public/data/categoriesData";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

export default function Categories() {
  return (
    <main className="p-8">
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="w-full flex flex-row justify-between items-center">
          <h3 className="text-2xl font-medium">Categories</h3>
          <Link
            href="/"
            className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md"
          >
            + Add New Category
          </Link>
        </div>

        <input
          type="text"
          placeholder="Search categories..."
          className="border border-gray-300 rounded-md my-4 px-2 py-1 w-2/5"
        />

        {categoriesData.map((category) => (
          <div key={category.slug} className="px-4 py-2 my-1">
            <div className="flex flex-row justify-start items-center">
              {category.image && (
                <Image
                  src={category.image}
                  alt={category.name}
                  width={20}
                  height={20}
                  className="rounded-md w-10 h-8 object-cover me-2"
                />
              )}
              {category.name}
            </div>
            <div className="flex flex-col pl-4 mt-1">
              {category.children &&
                category.children.map((child) => (
                  <div
                    key={child.slug}
                    className="my-1 flex flex-row justify-start items-center"
                  >
                    {child.image && (
                      <Image
                        src={child.image}
                        alt={child.name}
                        width={20}
                        height={20}
                        className="rounded-md w-10 h-8 object-cover me-2"
                      />
                    )}
                    {child.name}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
