import {
    CartItem as CartItemInterface,
    useCart,
} from "@/lib/providers/CartProvider";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";

type Props = {
    item: CartItemInterface;
};

const CartItem = ({ item }: Props) => {
    const { updateItemQuantity, removeItem } = useCart();
    return (
        <div className="grid grid-cols-6 gap-2 md:gap-4 items-center">
            <Image
                src={item?.image ?? ""}
                alt={item?.name ?? "N/A"}
                width={60}
                height={60}
                className="col-span-2 w-full aspect-square object-cover rounded-lg bg-gray-600"
            />
            <div className="col-span-4 text-sm">
                <div className="flex justify-between items-center">
                    <Link href={`/dashboard/products/${item?.product_id}`}>
                        {item?.name}
                        {item?.variation && (
                            <>
                                {" "}
                                [{item?.variation.option.toLocaleUpperCase()}:{" "}
                                {item?.variation.value}]
                            </>
                        )}
                    </Link>
                    <FaTrash
                        onClick={() => removeItem(item.inventory_id)}
                        className="cursor-pointer text-center text-gray-400 hover:text-red-400"
                    />
                </div>
                <p className="text-[#615cf6] font-semibold">
                    ${item?.price ?? 0}{" "}
                    {item.tax > 0 ? (
                        <span className="text-gray-600 font-normal">
                            + (Tax: ${item?.tax})
                        </span>
                    ) : (
                        ""
                    )}
                </p>
                <div className="grid grid-cols-5 items-center mt-2">
                    <p className="col-span-2 md:col-span-3 text-start">
                        Total: {item?.itemTotal?.toFixed(2)}
                    </p>
                    <div className="col-span-3 md:col-span-2 flex rounded-lg">
                        <button
                            onClick={() =>
                                updateItemQuantity(item.inventory_id, -1)
                            }
                            type="button"
                            className="size-7 shrink-0 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-s-md cursor-pointer bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6]"
                        >
                            <FaMinus className="text-xs" />
                        </button>
                        <input
                            value={item.quantity}
                            onChange={(e) => {
                                var quantity = Number(e.target.value) ?? 0;
                                var increase = quantity - item.quantity;
                                updateItemQuantity(item.inventory_id, increase);
                            }}
                            type="text"
                            id="hs-trailing-button-add-on-with-icon"
                            name="hs-trailing-button-add-on-with-icon"
                            className="py-0 px-4 block w-full border border-[#615cf6] sm:text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                        />
                        <button
                            onClick={() =>
                                updateItemQuantity(item.inventory_id, 1)
                            }
                            type="button"
                            className="size-7 shrink-0 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-e-md cursor-pointer bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6]"
                        >
                            <FaPlus />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
