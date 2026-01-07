"use client";

import { useCart } from "@/lib/providers/CartProvider";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import CartItem from "./CartItem";
import { FaTrash } from "react-icons/fa";
import PaymentModal from "../Modals/PaymentModal";
import CustomerSelectModal from "../Modals/CustomerSelectModal";
import { IoCloseCircle } from "react-icons/io5";
import { StoreInterface } from "@/lib/interfaces/StoreIntefrace";
import { CustomerInterface } from "@/lib/interfaces/CustomerInterface";

type Props = {
    show?: boolean;
    onClose?: () => void;
    selectedStore?: StoreInterface;
};

const SideCart = ({ show, onClose, selectedStore }: Props) => {
    const [selectedCustomer, setSelectedCustomer] = useState<
        CustomerInterface | undefined
    >(undefined);

    const [showCustomerModal, setShowCustomerModal] =
        React.useState<boolean>(false);

    const openCustomerModal = () => setShowCustomerModal(true);
    const closeCustomerModal = () => setShowCustomerModal(false);

    const { items, isEmpty, subTotal, taxTotal, cartTotal, clearCart } =
        useCart();

    const [showPaymentModal, setShowPaymentModal] =
        React.useState<boolean>(false);

    const openPaymentModal = () => setShowPaymentModal(true);
    const closePaymentModal = () => setShowPaymentModal(false);

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

                <h4 className="text-xl font-medium mt-4">Customer</h4>
                {selectedCustomer ? (
                    <p className="text-base text-gray-400 font-medium">
                        {selectedCustomer?.name} ( Email:{" "}
                        {selectedCustomer?.email ?? "N/A"} ; Phone:
                        {selectedCustomer?.phone ?? "N/A"} )
                        <IoCloseCircle
                            onClick={() => setSelectedCustomer(undefined)}
                            className="cursor-pointer text-2xl text-red-400 inline-block ms-4"
                        />
                    </p>
                ) : (
                    <p className="text-base text-gray-400 font-medium">
                        Walk In Customer
                    </p>
                )}
                <button
                    onClick={openCustomerModal}
                    className="cursor-pointer mt-2 bg-[#615cf6] hover:bg-transparent text-sm text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md"
                >
                    Add / Select Customer
                </button>
                {!isEmpty ? (
                    <div className="flex flex-col h-full mt-4">
                        <h4 className="text-xl font-medium">Items</h4>
                        <div className="mt-2 pe-3 flex flex-col gap-2 flex-2 overflow-y-scroll">
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
                            <button
                                disabled={isEmpty}
                                onClick={openPaymentModal}
                                className="cursor-pointer block mx-auto mt-4 bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md"
                            >
                                Proceed To Pay
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className="text-start text-gray-500 mt-4">
                        Cart is currently empty add products to continue
                    </p>
                )}
            </div>
            <CustomerSelectModal
                show={showCustomerModal}
                onClose={closeCustomerModal}
                currentSelected={selectedCustomer}
                onSelect={setSelectedCustomer}
                selectedStore={selectedStore}
            />
            <PaymentModal show={showPaymentModal} onClose={closePaymentModal} />
        </div>
    );
};

export default SideCart;
