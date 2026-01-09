import DashboardModal from "@/components/ui/modals/DashboardModal";
import { useCreateOrder } from "@/lib/hooks/sales/useCreateOrder";
import { CustomerInterface } from "@/lib/interfaces/CustomerInterface";
import { StoreInterface } from "@/lib/interfaces/StoreIntefrace";
import { useCart } from "@/lib/providers/CartProvider";
import React, { ChangeEvent, useEffect, useState } from "react";
import { FaCreditCard, FaDivide, FaMobile, FaTrash } from "react-icons/fa";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { toast } from "react-toastify";

type Props = {
    show?: boolean;
    onClose?: () => void;
    selectedStore?: StoreInterface;
    selectedCustomer?: CustomerInterface;
    onReset: () => void;
};

enum PaymentMethod {
    Cash,
    Card,
    Mobile,
}

interface PaymentDetail {
    method: PaymentMethod;
    amount: number;
    cardType?: string;
    provider?: string;
    reference?: string;
}

const PaymentModal = ({
    show,
    onClose,
    selectedStore,
    selectedCustomer,
    onReset,
}: Props) => {
    const { items, isEmpty, subTotal, taxTotal, cartTotal, clearCart } =
        useCart();

    const [paymentDetails, setPaymentDetails] = useState<PaymentDetail[]>([]);
    const addToPaymentDetails = (paymentDetail: PaymentDetail) => {
        setPaymentDetails((prev) => [...prev, paymentDetail]);
    };
    const removeFromPaymentDetails = (index: number) =>
        setPaymentDetails((prev) => prev.filter((_, i) => i != index));

    const [selectedPaymentMethod, setSelectedPaymentMethod] =
        useState<PaymentMethod>(PaymentMethod.Cash);

    const [totalAmount, setTotalAmount] = useState<number>(cartTotal);

    const [receivedAmount, setReceivedAmount] = useState<number>(0);
    const onReceivedAmountChanged = (e: ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value ?? -1);
        if (value >= 0) setReceivedAmount(value);
    };
    const [dueAmount, setDueAmount] = useState<number>(0);
    const [changeAmount, setChangeAmount] = useState<number>(0);

    const [cardType, setCardType] = useState<string | undefined>();
    const onCardTypeChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setCardType(e.target.value);
    };

    const [provider, setProvider] = useState<string | undefined>();
    const onProviderChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setProvider(e.target.value);
    };

    const [reference, setReference] = useState<string | undefined>();
    const onReferenceChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setReference(e.target.value);
    };

    const onSplit = () => {
        var paymentDetail: PaymentDetail = {
            method: selectedPaymentMethod,
            amount: receivedAmount,
            cardType: undefined,
            provider: undefined,
            reference: undefined,
        };

        if (selectedPaymentMethod === PaymentMethod.Card) {
            paymentDetail = {
                ...paymentDetail,
                cardType,
                reference,
            };
        } else if (selectedPaymentMethod === PaymentMethod.Mobile) {
            paymentDetail = {
                ...paymentDetail,
                provider,
                reference,
            };
        }
        addToPaymentDetails(paymentDetail);
        setReceivedAmount(0);
        setCardType(undefined);
        setProvider(undefined);
        setReference(undefined);
    };

    useEffect(() => {
        if (paymentDetails.length) {
            var totalReceived = paymentDetails.reduce(
                (prev, acc) => prev + acc.amount,
                0
            );
            var remaining = cartTotal - totalReceived;

            if (remaining >= 0) setTotalAmount(remaining);
        } else {
            setTotalAmount(cartTotal);
        }
    }, [paymentDetails, cartTotal]);

    useEffect(() => {
        var due = totalAmount - receivedAmount;
        if (due >= 0) {
            setDueAmount(due);
            setChangeAmount(0);
        } else {
            setChangeAmount(-1 * due);
            setDueAmount(0);
        }
    }, [totalAmount, receivedAmount]);

    const { mutateAsync: createOrderMutation } = useCreateOrder();

    const handleCreateOrder = async () => {
        var paidAmount = receivedAmount;
        var due = dueAmount;
        var paymentMethod = PaymentMethod[selectedPaymentMethod];
        if (paymentDetails.length) {
            paidAmount = paymentDetails.reduce(
                (prev, acc) => prev + acc.amount,
                0
            );
            due = cartTotal - paidAmount;
            if (due < 0) due = 0;
            paymentMethod = "Mixed";
        }
        var formData = {
            store_id: selectedStore?.id,
            customer_id: selectedCustomer?.id,
            sub_total: subTotal,
            tax_total: taxTotal,
            discount_total: 0,
            grand_total: cartTotal,
            paid_amount: paidAmount,
            due_amount: due,
            payment_method: paymentMethod,
            payment_details: paymentDetails,
            items: items,
        };
        const response = await createOrderMutation(formData);

        if (response) {
            toast.success("Sale recorded successfully!");
            onReset();
            clearCart();
            setPaymentDetails([]);
            setReceivedAmount(0);
            setCardType(undefined);
            setProvider(undefined);
            setReference(undefined);
            onClose!();
        }
    };

    return (
        <DashboardModal
            title={`Payment: $${cartTotal} - ${items.length} items`}
            show={show}
            onClose={onClose}
        >
            <div className="mt-6">
                {paymentDetails.length > 0 && (
                    <div className="flex flex-col gap-2 mb-6">
                        <h4 className="text-lg">Payment Details</h4>
                        {paymentDetails.map((paymentDetail, index) => (
                            <div key={index} className="grid grid-cols-5 gap-2">
                                <div className="col-span-1">
                                    {PaymentMethod[paymentDetail.method]}
                                </div>
                                <div className="col-span-1">
                                    ${paymentDetail.amount}
                                </div>
                                <div className="col-span-1">
                                    {paymentDetail.cardType ??
                                        paymentDetail.provider}
                                </div>
                                <div className="col-span-1">
                                    {paymentDetail.reference}
                                </div>
                                <div className="col-span-1">
                                    <FaTrash
                                        onClick={() =>
                                            removeFromPaymentDetails(index)
                                        }
                                        className="cursor-pointer text-lg text-red-400"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <h4 className="text-lg">Payment Method</h4>
                <div className="flex items-center gap-4 mt-2">
                    <button
                        onClick={() =>
                            setSelectedPaymentMethod(PaymentMethod.Cash)
                        }
                        className="px-2 py-1 rounded-md bg-green-300 hover:bg-transparent text-green-800 border-2 border-green-300 cursor-pointer shadow-md text-center text-xs md:text-base"
                    >
                        <FaMoneyBill1Wave className="inline-block me-1 md:me-2" />
                        Cash
                    </button>
                    <button
                        onClick={() =>
                            setSelectedPaymentMethod(PaymentMethod.Card)
                        }
                        className="px-2 py-1 rounded-md bg-teal-300 hover:bg-transparent text-teal-800 border-2 border-teal-300 cursor-pointer shadow-md text-center text-xs md:text-base"
                    >
                        <FaCreditCard className="inline-block me-1 md:me-2" />
                        Card
                    </button>
                    <button
                        onClick={() =>
                            setSelectedPaymentMethod(PaymentMethod.Mobile)
                        }
                        className="px-2 py-1 rounded-md bg-fuchsia-300 hover:bg-transparent text-fuchsia-800 border-2 border-fuchsia-300 cursor-pointer shadow-md text-center text-xs md:text-base"
                    >
                        <FaMobile className="inline-block me-1 md:me-2" />
                        Mobile
                    </button>
                    <button
                        onClick={onSplit}
                        className="px-2 py-1 rounded-md bg-amber-300 hover:bg-transparent text-amber-800 border-2 border-amber-300 cursor-pointer shadow-md text-center text-xs md:text-base"
                    >
                        <FaDivide className="inline-block me-1 md:me-2" />
                        Split
                    </button>
                </div>
                <h4 className="text-lg mt-6">
                    {PaymentMethod[selectedPaymentMethod]} Payment
                </h4>
                <div className="grid grid-cols-2 gap-4">
                    <div className="sm:col-span-1">
                        <label
                            htmlFor="total"
                            className="block text-sm/6 font-medium"
                        >
                            Total
                        </label>
                        <div className="mt-2 grid grid-cols-1">
                            <input
                                value={totalAmount}
                                readOnly
                                id="total"
                                name="total"
                                type="text"
                                autoComplete="off"
                                className="block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-1">
                        <label
                            htmlFor="received"
                            className="block text-sm/6 font-medium"
                        >
                            Received
                        </label>
                        <div className="mt-2 grid grid-cols-1">
                            <input
                                value={receivedAmount}
                                onChange={onReceivedAmountChanged}
                                id="received"
                                name="received"
                                type="text"
                                autoComplete="off"
                                className="block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                            />
                        </div>
                    </div>
                    {selectedPaymentMethod === PaymentMethod.Cash ? (
                        <>
                            <div className="sm:col-span-1">
                                <label
                                    htmlFor="due"
                                    className="block text-sm/6 font-medium"
                                >
                                    Due
                                </label>
                                <div className="mt-2 grid grid-cols-1">
                                    <input
                                        value={dueAmount}
                                        readOnly
                                        id="due"
                                        name="due"
                                        type="text"
                                        autoComplete="off"
                                        className="block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-1">
                                <label
                                    htmlFor="change"
                                    className="block text-sm/6 font-medium"
                                >
                                    Change
                                </label>
                                <div className="mt-2 grid grid-cols-1">
                                    <input
                                        readOnly
                                        value={changeAmount}
                                        id="change"
                                        name="change"
                                        type="text"
                                        autoComplete="off"
                                        className="block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                        </>
                    ) : selectedPaymentMethod === PaymentMethod.Card ? (
                        <>
                            <div className="sm:col-span-1">
                                <label
                                    htmlFor="card_type"
                                    className="block text-sm/6 font-medium"
                                >
                                    Card Type
                                </label>
                                <div className="mt-2 grid grid-cols-1">
                                    <input
                                        value={cardType ?? ""}
                                        onChange={onCardTypeChanged}
                                        id="card_type"
                                        name="card_type"
                                        type="text"
                                        autoComplete="off"
                                        className="block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-1">
                                <label
                                    htmlFor="reference"
                                    className="block text-sm/6 font-medium"
                                >
                                    Reference
                                </label>
                                <div className="mt-2 grid grid-cols-1">
                                    <input
                                        value={reference ?? ""}
                                        onChange={onReferenceChanged}
                                        id="reference"
                                        name="reference"
                                        type="text"
                                        autoComplete="off"
                                        className="block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                        </>
                    ) : selectedPaymentMethod === PaymentMethod.Mobile ? (
                        <>
                            <div className="sm:col-span-1">
                                <label
                                    htmlFor="provider"
                                    className="block text-sm/6 font-medium"
                                >
                                    Provider
                                </label>
                                <div className="mt-2 grid grid-cols-1">
                                    <input
                                        value={provider ?? ""}
                                        onChange={onProviderChanged}
                                        id="provider"
                                        name="provider"
                                        type="text"
                                        autoComplete="off"
                                        className="block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-1">
                                <label
                                    htmlFor="reference"
                                    className="block text-sm/6 font-medium"
                                >
                                    Txn ID
                                </label>
                                <div className="mt-2 grid grid-cols-1">
                                    <input
                                        value={reference ?? ""}
                                        onChange={onReferenceChanged}
                                        id="reference"
                                        name="reference"
                                        type="text"
                                        autoComplete="off"
                                        className="block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                        </>
                    ) : (
                        ""
                    )}
                </div>
            </div>

            <button
                onClick={handleCreateOrder}
                className="cursor-pointer block mt-4 ms-auto bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md"
            >
                Complete
            </button>
        </DashboardModal>
    );
};

export default PaymentModal;
