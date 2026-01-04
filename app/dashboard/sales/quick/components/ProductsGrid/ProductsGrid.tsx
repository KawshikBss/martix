import { PaginatedResponse } from "@/lib/core/PaginatedResponse";
import { InfiniteData } from "@tanstack/react-query";
import React from "react";
import ProductGridItem from "./ProductGridItem";
import { SalesProduct } from "@/lib/interfaces/SalesProduct";

type Props = {
    data?: InfiniteData<PaginatedResponse<SalesProduct>>;
};

const ProductsGrid = ({ data }: Props) => {
    return data?.pages?.[0].total ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-4">
            {data?.pages?.map((page) =>
                page.data.map((product) => (
                    <ProductGridItem
                        key={product.product_id}
                        product={product}
                    />
                ))
            )}
        </div>
    ) : (
        ""
    );
};

export default ProductsGrid;
