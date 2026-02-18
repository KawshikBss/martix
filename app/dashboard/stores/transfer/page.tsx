"use client";

import { useRouter } from "next/navigation";
import React from "react";
import StockTransferForm from "./components/StockTransferForm";

type Props = {};

const AddStockTransfer = (props: Props) => {
    const { back } = useRouter();
    return (
        <main className="p-4 md:p-8">
            <div className="w-full bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row justify-between items-center">
                <h3 className="text-2xl font-medium mb-4 md:mb-0">
                    Stock Transfer
                </h3>
                <div className="flex flex-row gap-4">
                    <button
                        onClick={back}
                        className="bg-transparent hover:bg-gray-500 text-gray-500 hover:text-white border border-gray-500 px-2 py-1 rounded-md cursor-pointer mr-2"
                    >
                        Go Back
                    </button>
                </div>
            </div>
            <StockTransferForm />
        </main>
    );
};

export default AddStockTransfer;
