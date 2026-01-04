"use client";

import { useCart } from "@/lib/providers/CartProvider";
import React from "react";
import { IoMdClose } from "react-icons/io";
import CartItem from "./CartItem";
import { FaTrash } from "react-icons/fa";

type Props = {
    show?: boolean;
    onClose?: () => void;
};

const SideCart = ({ show, onClose }: Props) => {
    const { items, isEmpty, subTotal, taxTotal, cartTotal, clearCart } =
        useCart();
    return (
        <div
            className={`absolute inset-0 bg-black/25 transition-opacity duration-300 z-[1000] ease-in-out ${
                show
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
            }`}
            role="dialog"
            aria-modal="true"
            onClick={onClose}
        >
            <div
                className={`bg-white rounded-l-2xl shadow-md p-4 md:p-6 w-11/12 md:w-2/7 absolute top-0 bottom-0 transform transition-all duration-300 ease-in-out ${
                    show ? " right-0" : " -right-full"
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-medium">Cart</h3>
                    <button
                        onClick={onClose}
                        className="cursor-pointer bg-[#615cf6] hover:bg-transparent w-6 h-6 text-center rounded-full text-white hover:text-[#615cf6] border border-[#615cf6]"
                    >
                        <IoMdClose className="mx-auto text-xl" />
                    </button>
                </div>
                {!isEmpty ? (
                    <div className="flex flex-col h-full">
                        <div className="mt-4 pe-3 flex flex-col gap-2 flex-2 overflow-y-scroll">
                            {items.map((item) => (
                                <CartItem key={item.inventory_id} item={item} />
                            ))}
                        </div>
                        <div className="flex-1">
                            <button
                                onClick={clearCart}
                                className="cursor-pointer block ms-auto my-4 px-2 py-1 bg-red-400 hover:bg-transparent text-center rounded-xl text-white hover:text-red-400 border border-red-400"
                            >
                                <FaTrash className="me-2 inline" /> Clear
                            </button>

                            <table className="w-full text-left">
                                <tbody>
                                    <tr className="border border-gray-300 text-gray-500">
                                        <td className="px-2 py-2 font-semibold text-start">
                                            Sub Total
                                        </td>
                                        <td className="px-2 py-2 font-normal text-end">
                                            {subTotal.toFixed(2)}
                                        </td>
                                    </tr>
                                    <tr className="border border-gray-300 text-gray-500">
                                        <td className="px-2 py-2 font-semibold text-start">
                                            Tax
                                        </td>
                                        <td className="px-2 py-2 font-normal text-end">
                                            {taxTotal.toFixed(2)}
                                        </td>
                                    </tr>
                                    <tr className="border border-gray-300 text-gray-500">
                                        <td className="px-2 py-2 font-semibold text-start">
                                            Discount
                                        </td>
                                        <td className="px-2 py-2 font-normal text-end">
                                            {0}
                                        </td>
                                    </tr>
                                    <tr className="border border-gray-300 text-gray-500">
                                        <td className="px-2 py-2 font-semibold text-start">
                                            Total
                                        </td>
                                        <td className="px-2 py-2 font-normal text-end">
                                            {cartTotal.toFixed(2)}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <button className="cursor-pointer block mx-auto mt-4 bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md">
                                Proceed
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className="text-start text-gray-500 mt-4">
                        Cart is currently empty add products to continue
                    </p>
                )}
            </div>
        </div>
    );
};

export default SideCart;
