import DashboardAccordion from "@/components/ui/accordions/DashboardAccordion";
import { useCancelOrder } from "@/lib/hooks/sales/useCancelOrder";
import { useRefundOrder } from "@/lib/hooks/sales/useRefundOrder";
import { SaleInterface } from "@/lib/interfaces/SaleInterface";
import Image from "next/image";
import Link from "next/link";
import { FaCashRegister, FaReceipt, FaUser } from "react-icons/fa";
import { FaMoneyBill1Wave, FaShop } from "react-icons/fa6";
import { toast } from "react-toastify";

export interface IOrdersListItemProps {
    sale: SaleInterface;
}

export function OrdersListItem({ sale }: IOrdersListItemProps) {
    const { mutateAsync: refundOrderMutation } = useRefundOrder();
    const onRefund = async (saleId: string) => {
        const res = await refundOrderMutation({
            saleId: saleId?.toString(),
            payload: {},
        });
        if (res) {
            toast.success("Order refunded successfully!");
        }
    };

    const { mutateAsync: cancelOrderMutation } = useCancelOrder();
    const onCancel = async (saleId: string) => {
        const res = await cancelOrderMutation({
            saleId: saleId?.toString(),
            payload: {},
        });
        if (res) {
            toast.success("Order cancelled successfully!");
        }
    };
    return (
        <DashboardAccordion.Container>
            <DashboardAccordion.Header>
                <FaReceipt className="flex-shrink-0 w-6 h-6 text-gray-400" />
                <div className="flex-1 ml-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-xs font-medium text-gray-900">
                                {sale.sale_number}
                            </h3>
                            <p className="text-xs text-gray-500">
                                {sale?.created_at}
                            </p>
                        </div>

                        <div className="text-right mr-4">
                            <div
                                className={`text-xs font-bold ${
                                    sale?.status == "pending"
                                        ? "text-yellow-600"
                                        : sale?.status == "completed"
                                          ? "text-green-600"
                                          : "text-red-600"
                                }`}
                            >
                                {sale?.status}
                            </div>
                        </div>
                    </div>
                </div>
            </DashboardAccordion.Header>
            <DashboardAccordion.Expanded>
                <DashboardAccordion.Section
                    icon={<FaShop className="w-4 h-4 text-blue-500 mr-2" />}
                    title="Store"
                >
                    <Link
                        href="/dashboard/profile"
                        className="flex flex-row items-center gap-4"
                    >
                        <Image
                            src={
                                sale?.store?.image_url ??
                                "/images/user-placeholder.jpg"
                            }
                            alt={sale?.store?.name ?? "Profile"}
                            className="rounded-full w-[40px] h-[40px] border object-cover"
                            width={40}
                            height={40}
                        />
                        <span className="text-gray-700">
                            {sale?.store?.name ?? "N/A"}
                        </span>
                    </Link>
                </DashboardAccordion.Section>
                <DashboardAccordion.Section
                    icon={<FaUser className="w-4 h-4 text-amber-500 mr-2" />}
                    title="Customer"
                >
                    {sale?.customer ? (
                        <Link
                            href="/dashboard/customers"
                            className="flex flex-row items-center gap-4"
                        >
                            <span className="text-gray-700">
                                {sale?.customer?.name ?? "N/A"}
                            </span>
                        </Link>
                    ) : (
                        "Walk In Customer"
                    )}
                </DashboardAccordion.Section>
                <DashboardAccordion.Section
                    icon={
                        <FaMoneyBill1Wave className="w-4 h-4 text-green-500 mr-2" />
                    }
                    title="Total"
                >
                    ${sale?.grand_total}
                </DashboardAccordion.Section>
                <DashboardAccordion.Section
                    icon={
                        <FaCashRegister
                            className={`w-4 h-4 ${
                                sale?.payment_status == "pending"
                                    ? "text-yellow-600"
                                    : sale?.status == "paid"
                                      ? "text-green-600"
                                      : sale?.status == "partial"
                                        ? "text-orange-600"
                                        : "text-red-600"
                            } mr-2`}
                        />
                    }
                    title="Payment"
                >
                    {sale?.payment_status}
                </DashboardAccordion.Section>

                <div className="mt-4 flex flex-wrap gap-2">
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
                </div>
            </DashboardAccordion.Expanded>
        </DashboardAccordion.Container>
    );
}
