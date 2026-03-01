import { useCancelOrder } from "@/lib/hooks/sales/useCancelOrder";
import { useRefundOrder } from "@/lib/hooks/sales/useRefundOrder";
import { SaleInterface } from "@/lib/interfaces/SaleInterface";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";

type Props = { sale?: SaleInterface };

const OrdersTableItem = ({ sale }: Props) => {
    const [showAllItems, setShowAllItems] = useState(false);
    const toggleShowAllItems = () => setShowAllItems((prev) => !prev);

    const { mutateAsync: refundOrderMutation } = useRefundOrder();
    const onRefund = async (saleId?: string) => {
        const res = await refundOrderMutation({
            saleId: saleId?.toString(),
            payload: {},
        });
        if (res) {
            toast.success("Order refunded successfully!");
        }
    };

    const { mutateAsync: cancelOrderMutation } = useCancelOrder();
    const onCancel = async (saleId?: string) => {
        const res = await cancelOrderMutation({
            saleId: saleId?.toString(),
            payload: {},
        });
        if (res) {
            toast.success("Order cancelled successfully!");
        }
    };
    return (
        <tr className="border-b border-gray-300 hover:bg-gray-50 align-top">
            <td className="px-2 py-4">{sale?.sale_number}</td>
            <td className="px-2 py-4">{sale?.created_at}</td>
            <td className="px-2 py-4">
                {sale?.store?.name} - {sale?.store?.branch}
            </td>
            <td className="px-2 py-4">
                {sale?.customer?.name ?? "Walk In Customer"}
            </td>
            <td className="px-2 py-4">
                {(sale?.items?.length &&
                sale?.items?.length > 3 &&
                !showAllItems
                    ? sale?.items.slice(0, 3)
                    : sale?.items
                )?.map((saleItem, index) => (
                    <p key={index}>
                        [{index + 1}]{" "}
                        <Link
                            href={`/dashboard/products/${saleItem?.product?.id}`}
                        >
                            {saleItem?.product?.name}
                        </Link>
                    </p>
                ))}
                {sale?.items?.length && sale?.items?.length > 3 ? (
                    <p
                        onClick={toggleShowAllItems}
                        className="text-indigo-600 hover:text-indigo-500 text-sm/6 cursor-pointer text-end"
                    >
                        {showAllItems ? "Hide" : "Show more"}
                    </p>
                ) : (
                    ""
                )}
            </td>
            <td className="px-2 py-4">${sale?.grand_total}</td>
            <td className="px-2 py-4">{sale?.payment_status}</td>
            <td className="px-2 py-4">{sale?.status}</td>
            <td className="px-2 py-4 flex flex-wrap gap-2">
                <Link
                    href={`/dashboard/sales/${sale?.id}`}
                    className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white"
                >
                    View
                </Link>
                {sale?.status !== "completed" && (
                    <Link
                        href={`/dashboard/sales/receipts/${sale?.id}`}
                        className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white"
                    >
                        Invoice
                    </Link>
                )}
                {sale?.status !== "refunded" &&
                    sale?.payment_status !== "paid" && (
                        <Link
                            href={`/`}
                            className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white"
                        >
                            Add Payment
                        </Link>
                    )}
                {sale?.status === "pending" && (
                    <button
                        // onClick={() => onRefund(sale?.id)}
                        className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white cursor-pointer"
                    >
                        Complete
                    </button>
                )}
                {sale?.status !== "refunded" && (
                    <button
                        onClick={() => onRefund(sale?.id)}
                        className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white cursor-pointer"
                    >
                        Refund
                    </button>
                )}
                {sale?.status !== "canceled" && (
                    <button
                        onClick={() => onCancel(sale?.id)}
                        className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white cursor-pointer"
                    >
                        Cancel
                    </button>
                )}
            </td>
        </tr>
    );
};

export default OrdersTableItem;
