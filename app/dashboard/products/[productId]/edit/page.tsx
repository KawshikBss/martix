"use client";

import Loader from "@/components/ui/loaders/Loader";
import { useProduct } from "@/lib/hooks/products/useProduct";
import { useUpdateProduct } from "@/lib/hooks/products/useUpdateProduct";
import { StoreInterface } from "@/lib/interfaces/StoreIntefrace";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import ProductForm from "../../components/ProductForm";

interface ProductVariation {
    option: string;
    value: string;
}

interface ProductStock {
    store: StoreInterface;
    variant: ProductVariation | null;
    barcode: string;
    selling_price: number;
    quantity: number;
    reorder_level: number;
    expiry_date: string;
}

type Props = {};

const EditProduct = (props: Props) => {
    const { productId } = useParams();
    const { data: product } = useProduct(productId?.toString());

    const productFormRef = React.useRef<HTMLFormElement | null>(null);

    const [imagePreview, setImagePreview] = React.useState<string | null>(null);

    const [enableTax, setEnableTax] = React.useState<boolean>(false);
    const toggleEnableTax = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.currentTarget.checked;
        setEnableTax(checked);
    };

    const [productStocks, setProductStocks] = React.useState<ProductStock[]>(
        []
    );

    const [enableVariations, setEnableVariations] =
        React.useState<boolean>(false);

    const [productVariations, setProductVariations] = React.useState<
        ProductVariation[]
    >([]);

    const { mutateAsync: updateProductMutation } = useUpdateProduct();

    const { back } = useRouter();

    const setDefaultStocks = () => {
        setProductStocks(
            product?.inventories.map((item) => {
                return {
                    store: item.store,
                    variant: null,
                    barcode: item.barcode,
                    selling_price: item.selling_price,
                    quantity: item.quantity,
                    reorder_level: item.reorder_level,
                    expiry_date: item.expiry_date,
                };
            }) ?? []
        );
    };

    const setDefaultVariations = () => {
        setProductVariations(
            product?.variants?.map((variant) => {
                return {
                    option: variant.variation_meta.option,
                    value: variant.variation_meta.value,
                };
            }) ?? []
        );
    };

    useEffect(() => {
        if (!product) return;
        setDefaultStocks();
        setDefaultVariations();
    }, [product]);

    const resetForm = () => {
        if (!productFormRef) return;
        productFormRef.current?.reset();
        setImagePreview(null);
        setEnableTax(false);
    };

    const [updatingProduct, setUpdatingProduct] = React.useState(false);

    const handleProductUpdate = async () => {
        if (!productFormRef) return;
        setUpdatingProduct(true);

        const formElements = productFormRef.current?.elements;
        const image = (formElements?.namedItem("image") as HTMLInputElement)
            .files?.[0];
        const name = (formElements?.namedItem("name") as HTMLInputElement)
            .value;
        const sku = (formElements?.namedItem("sku") as HTMLInputElement).value;
        const cost_price = (
            formElements?.namedItem("cost_price") as HTMLInputElement
        ).value;
        const category = (
            formElements?.namedItem("category") as HTMLInputElement
        ).value;
        const brand = (formElements?.namedItem("brand") as HTMLInputElement)
            .value;
        const tags = (formElements?.namedItem("tags") as HTMLInputElement)
            .value;
        const description = (
            formElements?.namedItem("description") as HTMLInputElement
        ).value;
        const tax_type = (
            formElements?.namedItem("tax_type") as HTMLInputElement
        ).value;
        const tax_rate = (
            formElements?.namedItem("tax_rate") as HTMLInputElement
        ).value;

        try {
            const formData = new FormData();
            // if (image) formData.append("image", image);
            formData.append("name", name);
            formData.append("sku", sku);
            formData.append("cost_price", cost_price);
            formData.append("category_id", category);
            formData.append("brand", brand);
            formData.append("tags", tags);
            formData.append("description", description);
            if (enableTax) {
                formData.append("tax_type", tax_type);
                formData.append("tax_rate", tax_rate);
            }
            if (enableVariations && productVariations.length) {
                productVariations.forEach((variation, index) => {
                    formData.append(
                        `variations[${index}][option]`,
                        variation.option
                    );
                    formData.append(
                        `variations[${index}][value]`,
                        variation.value
                    );
                });
            }
            if (productStocks.length) {
                productStocks.forEach((stock, index) => {
                    formData.append(
                        `product_stocks[${index}][store]`,
                        stock.store.id
                    );
                    if (stock.variant) {
                        formData.append(
                            `product_stocks[${index}][variant][option]`,
                            stock.variant?.option
                        );
                        formData.append(
                            `product_stocks[${index}][variant][value]`,
                            stock.variant?.value
                        );
                    }
                    formData.append(
                        `product_stocks[${index}][barcode]`,
                        stock.barcode
                    );
                    formData.append(
                        `product_stocks[${index}][selling_price]`,
                        `${stock.selling_price}`
                    );
                    formData.append(
                        `product_stocks[${index}][quantity]`,
                        `${stock.quantity}`
                    );
                    formData.append(
                        `product_stocks[${index}][reorder_level]`,
                        `${stock.reorder_level}`
                    );
                    formData.append(
                        `product_stocks[${index}][expiry_date]`,
                        stock.expiry_date
                    );
                });
            }

            const response = await updateProductMutation({
                id: productId?.toString(),
                payload: formData,
            });
            console.log(response);

            if (response) {
                toast.success("Product updated successfully!");
                resetForm();
            }
        } catch (error) {
            console.error(error);
        } finally {
            setUpdatingProduct(false);
        }
    };
    
    return (
        <main className="p-4 md:p-8">
            <div className="w-full bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row justify-between items-center">
                <h3 className="text-2xl font-medium mb-4 md:mb-0">
                    Edit Product
                </h3>
                <div className="flex flex-row gap-4">
                    <button
                        onClick={back}
                        className="bg-transparent hover:bg-gray-500 text-gray-500 hover:text-white border border-gray-500 px-2 py-1 rounded-md cursor-pointer mr-2"
                    >
                        Go Back
                    </button>
                    <button
                        onClick={resetForm}
                        className="bg-transparent hover:bg-red-500 text-red-500 hover:text-white border border-red-500 px-2 py-1 rounded-md cursor-pointer mr-2"
                    >
                        Discard Changes
                    </button>
                    {!updatingProduct ? (
                        <button
                            onClick={handleProductUpdate}
                            className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md cursor-pointer"
                        >
                            Update
                        </button>
                    ) : (
                        <Loader inline />
                    )}
                </div>
            </div>
            <ProductForm
                ref={productFormRef}
                product={product}
                imagePreview={imagePreview ?? product?.image_url}
                setImagePreview={setImagePreview}
                enableTax={enableTax}
                toggleEnableTax={toggleEnableTax}
                productStocks={productStocks}
                setProductStocks={setProductStocks}
                enableVariations={enableVariations}
                setEnableVariations={setEnableVariations}
                productVariations={productVariations}
                setProductVariations={setProductVariations}
            />
        </main>
    );
};

export default EditProduct;
