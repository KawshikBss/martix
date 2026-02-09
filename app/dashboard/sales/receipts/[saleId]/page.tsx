"use client";

import { useSale } from "@/lib/hooks/sales/useSale";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React from "react";

type Props = {};

const SingleReceipt = (props: Props) => {
    const { saleId } = useParams();
    const { data: sale } = useSale(saleId?.toString());

    const { back } = useRouter();

    const onPrint = () => {
        const content = document.getElementById("printableArea");
        const pri = window.open("", "PRINT", "height=600,width=800");
        if (pri && content) {
            pri.document.write(`<html><head><title>Receipt</title>`);
            pri.document.write(
                `<style>
                @media print {
                    body {
                        width: 80mm;
                        margin: 0;
                        padding: 0;
                    }

                    #printableArea {
                        width: 80mm;
                        margin: 0;
                        padding: 0;
                    }
                }
                </style>`,
            );
            pri.document.write(`</head><body >`);
            pri.document.write(content.innerHTML);
            pri.document.write(`</body></html>`);
            pri.document.close();
            pri.focus();
            pri.print();
            pri.close();
        }
    };

    return (
        <main className="p-4 md:p-8">
            <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
                <h3 className="text-2xl font-semibold">
                    # {sale?.sale_number ?? "N/A"}
                </h3>
                <div className="flex flex-row flex-wrap gap-4">
                    <button
                        onClick={back}
                        className="bg-transparent hover:bg-gray-500 text-gray-500 hover:text-white border border-gray-500 px-2 py-1 rounded-md cursor-pointer"
                    >
                        Go Back
                    </button>
                    <button
                        onClick={onPrint}
                        className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md cursor-pointer"
                    >
                        Print
                    </button>
                    {sale?.customer && sale?.customer?.email && (
                        <button
                            onClick={onPrint}
                            className="bg-blue-500 hover:bg-transparent text-white hover:text-blue-500 border border-blue-500 px-2 py-1 rounded-md cursor-pointer"
                        >
                            Send
                        </button>
                    )}
                </div>
            </div>
            <div
                id="printableArea"
                style={{ width: "80mm" }}
                className="border-2 border-dashed p-4 rounded-md mt-8 mx-auto bg-white shadow-md hover:shadow-2xl hover:transform hover:scale-105 transition-all duration-300 cursor-pointer"
            >
                <div className="mb-4 pb-4 border-b-2 border-dotted">
                    <div className="flex flex-row items-center gap-6 mb-2">
                        <Image
                            src={
                                sale?.store?.image_url ??
                                "/images/user-placeholder.jpg"
                            }
                            alt={sale?.store?.name ?? "Store Logo"}
                            className="rounded-full w-[40px] h-[40px] bg-gray-500 object-cover"
                            width={40}
                            height={40}
                        />
                        <div>
                            <h1 className="text-xl font-bold">
                                {sale?.store?.name ?? "Store Name"}
                            </h1>
                            <span className="text-lg font-semibold">
                                {sale?.store?.branch ?? "Store Branch"}
                            </span>
                        </div>
                    </div>
                    <p className="text-sm">
                        {sale?.store?.address ?? "Store Address"}
                    </p>
                    {sale?.store?.address_2 && (
                        <p className="text-sm">
                            {sale?.store?.address_2 ?? "Store Address 2"}
                        </p>
                    )}
                    {sale?.store?.phone && (
                        <p className="text-sm">
                            {sale?.store?.phone ?? "Store Phone"}
                        </p>
                    )}
                    {sale?.store?.email && (
                        <p className="text-sm">
                            {sale?.store?.email ?? "Store Email"}
                        </p>
                    )}
                </div>

                <div className="mb-4 pb-4 border-b-2 border-dotted">
                    <h3 className="text-lg font-semibold">
                        Invoice #:{" "}
                        <span className="text-base">
                            {sale?.sale_number ?? "N/A"}
                        </span>
                    </h3>
                    <p className="text-sm">Date: {sale?.created_at ?? "N/A"}</p>
                    <p className="text-sm">
                        Cashier: {sale?.user?.name ?? "N/A"}
                    </p>
                </div>

                <div className="flex flex-col gap-2 mb-4 pb-4 border-b-2 border-dotted">
                    {sale?.items?.map((item) => (
                        <div key={item.id} className="w-full">
                            <h5 className="text-base font-semibold">
                                {item?.product?.name ?? "N/A"}
                            </h5>
                            {item?.product?.is_variation ? (
                                <p className="text-sm">
                                    {item?.product?.variation_meta?.option?.toUpperCase() ??
                                        "N/A"}
                                    :{" "}
                                    {item?.product?.variation_meta?.value?.toUpperCase() ??
                                        "N/A"}
                                </p>
                            ) : (
                                ""
                            )}
                            <p className="text-sm text-end">
                                {item?.quantity ?? 0} x ${item?.price ?? 0} = $
                                {item?.total ?? 0}
                            </p>
                        </div>
                    ))}
                </div>
                <table className="w-full text-left">
                    <tbody>
                        <tr className="text-base font-normal text-end">
                            <td className="text-sm font-semibold text-start">
                                Sub Total:
                            </td>
                            <td>{sale?.sub_total}</td>
                        </tr>
                        <tr className="text-base font-normal text-end">
                            <td className="text-sm font-semibold text-start">
                                Tax:
                            </td>
                            <td>{sale?.tax_total}</td>
                        </tr>
                        <tr className="text-base font-normal text-end">
                            <td className="text-sm font-semibold text-start">
                                Discount:
                            </td>
                            <td>{sale?.discount_total}</td>
                        </tr>
                        <tr className="text-base font-normal text-end">
                            <td className="text-sm font-semibold text-start">
                                Total:
                            </td>
                            <td>{sale?.grand_total}</td>
                        </tr>
                        <tr className="text-base font-normal text-end">
                            <td className="text-sm font-semibold text-start">
                                Paid:
                            </td>
                            <td>{sale?.paid_amount}</td>
                        </tr>
                    </tbody>
                </table>

                {sale?.customer ? (
                    <div className="mt-4 pt-4 border-t-2 border-dotted">
                        <p className="text-sm">
                            Customer: {sale?.customer?.name ?? "N/A"}
                        </p>
                        <p className="text-sm">
                            Phone: {sale?.customer?.phone ?? "N/A"}
                        </p>
                        <p className="text-sm">
                            Email: {sale?.customer?.email ?? "N/A"}
                        </p>
                    </div>
                ) : (
                    ""
                )}

                <p className="pt-6">
                    Thank you for shopping from{" "}
                    {sale?.store?.name ?? "our store"}!
                </p>
            </div>
        </main>
    );
};

export default SingleReceipt;
