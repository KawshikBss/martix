import Link from "next/link";
import CategoryList from "./components/CategoryList/CategoryList";

export default function Categories() {
    return (
        <main className="p-4 md:p-8">
            <div className="bg-white rounded-2xl shadow-md p-2 md:p-6">
                <div className="w-full flex flex-col md:flex-row justify-between items-center">
                    <h3 className="text-2xl font-medium mb-4 md:mb-0">
                        Categories
                    </h3>
                    <Link
                        href="/dashboard/categories/add"
                        className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md"
                    >
                        + Add New Category
                    </Link>
                </div>

                <CategoryList />
            </div>
        </main>
    );
}
