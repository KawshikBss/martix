import { SaleItemInterface } from "@/lib/interfaces/SaleItemInterface";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
    data?: SaleItemInterface[];
};

const ItemsList = ({ data }: Props) => {
    return (
        <div className="md:hidden">
            <div className="grid grid-cols-1 gap-6">
                {data?.map((item) => (
                    <div
                        className={`border border-gray-300 bg-white shadow-sm rounded-2xl p-4 flex flex-col`}
                    >
                        <div className="w-full aspect-video relative bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                            <img
                                src={item?.product?.image_url}
                                alt={item?.product?.name}
                                className="w-full h-full object-cover rounded-lg"
                            />
                            <span className="absolute bottom-2 left-2 bg-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                                {item?.product?.category?.name}
                            </span>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                            <h4 className="text-xl font-semibold">
                                {item?.product?.name}
                            </h4>
                            <p className="text-lg font-normal text-gray-600">
                                {item.product.variation_meta ? (
                                    <>
                                        <br />
                                        {item.product.variation_meta.option.toLocaleUpperCase()}
                                        : {item.product.variation_meta.value}
                                    </>
                                ) : (
                                    "Main"
                                )}
                            </p>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                            <p className="text-md text-gray-600">
                                Quantity: {item?.quantity}
                            </p>
                            <p className="text-md text-gray-600">
                                Total: {item?.total}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ItemsList;
