import { InfiniteData } from "@tanstack/react-query";
import { ProductCard } from "./ProductCard";
import { ProductInterface } from "@/lib/interfaces/ProductInterface";
import { PaginatedResponse } from "@/lib/core/PaginatedResponse";

export interface IProductsCatalogProps {
    data?: InfiniteData<PaginatedResponse<ProductInterface>>;
}

export function ProductsCatalog({ data }: IProductsCatalogProps) {
    const shownCount =
        data?.pages.reduce((total, page) => total + page.data.length, 0) ?? 0;

    return data?.pages?.length ? (
        <div className="mt-8 md:hidden">
            <div className="grid grid-cols-1 gap-6">
                <span className="text-start text-gray-500">
                    Showing {shownCount} of {data?.pages?.[0].total ?? 0}{" "}
                    products
                </span>
                {data?.pages?.map((page) =>
                    page.data.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                )}
            </div>
        </div>
    ) : (
        ""
    );
}
