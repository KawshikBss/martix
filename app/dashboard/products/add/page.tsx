"use client";

import Loader from "@/components/ui/loaders/Loader";
import { useCreateProduct } from "@/lib/hooks/products/useCreateProduct";
import { StoreInterface } from "@/lib/interfaces/StoreIntefrace";
import { useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "react-toastify";
import ProductForm from "../components/ProductForm";

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

export default function AddProduct() {
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

    const { mutateAsync: createProductMutation } = useCreateProduct();

    const { back } = useRouter();

    const resetForm = () => {
        if (!productFormRef) return;
        productFormRef.current?.reset();
        setImagePreview(null);
        setEnableTax(false);
    };

    const [creatingProduct, setCreatingProduct] = React.useState(false);

    const handleProductCreate = async () => {
        if (!productFormRef) return;
        setCreatingProduct(true);

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
                        stock.selling_price.toFixed(2)
                    );
                    formData.append(
                        `product_stocks[${index}][quantity]`,
                        stock.quantity.toFixed(2)
                    );
                    formData.append(
                        `product_stocks[${index}][reorder_level]`,
                        stock.reorder_level.toFixed(2)
                    );
                    formData.append(
                        `product_stocks[${index}][expiry_date]`,
                        stock.expiry_date
                    );
                });
            }

            const response = await createProductMutation(formData);
            console.log(response);

            if (response) {
                toast.success("Product created successfully!");
                resetForm();
            }
        } catch (error) {
            console.error(error);
        } finally {
            setCreatingProduct(false);
        }
    };

    return (
        <main className="p-4 md:p-8">
            <div className="w-full bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row justify-between items-center">
                <h3 className="text-2xl font-medium mb-4 md:mb-0">
                    New Product
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
                    {!creatingProduct ? (
                        <button
                            onClick={handleProductCreate}
                            className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md cursor-pointer"
                        >
                            Save
                        </button>
                    ) : (
                        <Loader inline />
                    )}
                </div>
            </div>
            <ProductForm
                ref={productFormRef}
                imagePreview={imagePreview}
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
}
