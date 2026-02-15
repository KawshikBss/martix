"use client";

import Loader from "@/components/ui/loaders/Loader";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import StockAdjustForm from "./components/StockAdjustForm";

type Props = {};

const StockAdjustPage = (props: Props) => {
    const adjustFormRef = React.useRef<HTMLFormElement | null>(null);
    const { back } = useRouter();
    const [adjustingStock, setAdjustingStock] = useState(false);
    const resetForm = () => {};
    const handleStockAdjust = async () => {};
    return (
        <main className="p-4 md:p-8">
            <div className="w-full bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row justify-between items-center">
                <h3 className="text-2xl font-medium mb-4 md:mb-0">
                    Stock Adjustment
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
                    {!adjustingStock ? (
                        <button
                            onClick={handleStockAdjust}
                            className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md cursor-pointer"
                        >
                            Save
                        </button>
                    ) : (
                        <Loader inline />
                    )}
                </div>
            </div>
            <StockAdjustForm ref={adjustFormRef} />
        </main>
    );
};

export default StockAdjustPage;
