import Link from "next/link";
import * as React from "react";

export default function Products() {
  return (
    <main className="p-8">
      <div className="w-full flex flex-row justify-between items-center">
        <h3 className="text-2xl font-medium">Products</h3>
        <Link
          href="/"
          className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md"
        >
          + Add New Product
        </Link>
      </div>
      <div className="my-6 flex flex-row justify-between"></div>
    </main>
  );
}
