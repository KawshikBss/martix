"use client";

import React, { ReactNode } from "react";
import { IoMdClose } from "react-icons/io";

type Props = {
    show?: boolean;
    onClose?: () => void;
    title?: string;
    children?: ReactNode;
};

const DashboardModal = ({ show, onClose, title, children }: Props) => {
    return (
        <div
            className={`fixed inset-0 bg-black/25 flex justify-center items-center transition-opacity duration-300 z-[1000] ease-in-out ${
                show
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
            }`}
            role="dialog"
            aria-modal="true"
            onClick={onClose}
        >
            <div
                className={`bg-white rounded-2xl shadow-md p-4 md:p-6 w-11/12 md:w-2/3 transform transition-all duration-300 ease-in-out ${
                    show ? "scale-100 opacity-100" : "scale-25 opacity-0"
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center">
                    {title && <h3 className="text-2xl font-medium">{title}</h3>}
                    <button
                        onClick={onClose}
                        className="ms-auto bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md"
                    >
                        <IoMdClose />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default DashboardModal;
