import { ProductCard } from "./ProductCard";
import { ProductInterface } from "@/lib/interfaces/ProductInterface";

export interface IProductsCatalogProps {
    data?: ProductInterface[];
}

export function ProductsCatalog({ data }: IProductsCatalogProps) {
    return data?.length ? (
        <div className="mt-8 md:hidden">
            <div className="grid grid-cols-1 gap-6">
                <span className="text-start text-gray-500">
                    Showing {data?.length} products
                </span>
                {data?.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
                <span className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-4 py-1 rounded-full w-fit mx-auto">
                    See More
                </span>
            </div>
        </div>
    ) : (
        ""
    );
}
