import Loader from "@/components/ui/loaders/Loader";
import DashboardModal from "@/components/ui/modals/DashboardModal";
import { useCreateCustomer } from "@/lib/hooks/sales/useCreateCustomer";
import { useCustomers } from "@/lib/hooks/sales/useCustomers";
import { CustomerInterface } from "@/lib/interfaces/CustomerInterface";
import { StoreInterface } from "@/lib/interfaces/StoreIntefrace";
import React, { useRef, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { MdClear, MdQrCode } from "react-icons/md";
import { toast } from "react-toastify";

type Props = {
    show?: boolean;
    onClose?: () => void;
    currentSelected?: CustomerInterface;
    onSelect: (customer: CustomerInterface | undefined) => void;
    selectedStore?: StoreInterface;
};

const CustomerSelectModal = ({
    show,
    onClose,
    currentSelected,
    onSelect,
    selectedStore,
}: Props) => {
    const [query, setQuery] = useState<string>("");
    const onQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };
    const clearQuery = () => setQuery("");
    const { data: customers } = useCustomers({
        query,
        store: selectedStore?.id,
    });

    const [selectedCustomer, setSelectedCustomer] = useState<
        CustomerInterface | undefined
    >(currentSelected);

    const onConfirm = () => {
        onSelect(selectedCustomer);
        onClose!();
    };

    const onReset = () => {
        setSelectedCustomer(undefined);
        onSelect(undefined);
        onClose!();
    };

    const [creatingCustomer, setCreatingCustomer] = useState<boolean>(false);

    const customerFormRef = useRef<HTMLFormElement | null>(null);

    const { mutateAsync: createCustomerMutation } = useCreateCustomer();

    const handleCustomerCreate = async () => {
        if (!customerFormRef) return;
        setCreatingCustomer(true);

        const formElements = customerFormRef.current?.elements;
        const store = (formElements?.namedItem("store_id") as HTMLInputElement)
            .value;
        const name = (formElements?.namedItem("name") as HTMLInputElement)
            .value;
        const phone = (formElements?.namedItem("phone") as HTMLInputElement)
            .value;
        const email = (formElements?.namedItem("email") as HTMLInputElement)
            .value;
        const address = (formElements?.namedItem("address") as HTMLInputElement)
            .value;

        try {
            const formData = new FormData();
            formData.append("store_id", store);
            formData.append("name", name);
            formData.append("phone", phone);
            formData.append("email", email);
            formData.append("address", address);

            const response = await createCustomerMutation(formData);

            if (response) {
                toast.success("Customer created successfully!");
                setSelectedCustomer(response);
                onSelect(response);
                customerFormRef.current?.reset();
                onClose!();
            }
        } catch (error) {
            console.error(error);
        } finally {
            setCreatingCustomer(false);
        }
    };

    return (
        <DashboardModal
            title="Add / Select Customer"
            show={show}
            onClose={onClose}
        >
            {selectedCustomer ? (
                <p className="text-base text-gray-400 font-medium mt-6">
                    {selectedCustomer?.name} ( Email:{" "}
                    {selectedCustomer?.email ?? "N/A"} ; Phone:
                    {selectedCustomer?.phone ?? "N/A"} )
                    <IoCloseCircle
                        onClick={() => setSelectedCustomer(undefined)}
                        className="cursor-pointer text-2xl text-red-400 inline-block ms-4"
                    />
                </p>
            ) : (
                ""
            )}
            <div className="relative mt-6">
                <div className="flex flex-row justify-between gap-2 md:gap-4">
                    <input
                        value={query}
                        onChange={onQueryChange}
                        type="text"
                        placeholder="Search customers..."
                        className="border border-gray-300 rounded-md px-2 py-1 w-full"
                    />
                    {query?.length ? (
                        <button
                            onClick={clearQuery}
                            className="bg-red-400 hover:bg-transparent text-white hover:text-red-400 border border-red-400 px-2 py-1 rounded-md"
                        >
                            <MdClear />
                        </button>
                    ) : (
                        ""
                    )}
                    <button className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md">
                        <MdQrCode />
                    </button>
                </div>
                {!selectedCustomer && query?.length > 0 ? (
                    <div className="absolute top-full mt-2 bg-white rounded-md p-2 border border-gray-400 shadow-md w-full">
                        {customers?.pages?.[0].data?.length ? (
                            customers?.pages?.map((page) =>
                                page?.data?.map((customer) => (
                                    <div
                                        key={customer.id}
                                        onClick={() =>
                                            setSelectedCustomer(customer)
                                        }
                                        className="p-2 hover:bg-gray-200 cursor-pointer rounded-md"
                                    >
                                        {customer?.name} ( Email:{" "}
                                        {customer?.email ?? "N/A"} ; Phone:
                                        {customer?.phone ?? "N/A"} )
                                    </div>
                                ))
                            )
                        ) : (
                            <p>No matching customers found</p>
                        )}
                    </div>
                ) : (
                    ""
                )}
            </div>
            <p className="text-center my-4">Or</p>
            <form
                ref={customerFormRef}
                className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6 mb-6"
            >
                <div className="sm:col-span-3">
                    <label
                        htmlFor="store"
                        className="block text-sm/6 font-medium"
                    >
                        Store
                    </label>
                    <div className="mt-2">
                        <input
                            value={selectedStore?.name ?? ""}
                            readOnly
                            id="store"
                            name="store"
                            type="text"
                            autoComplete="first name"
                            className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                        />
                        <input
                            value={selectedStore?.id ?? ""}
                            readOnly
                            type="text"
                            hidden
                            name="store_id"
                        />
                    </div>
                </div>
                <div className="sm:col-span-3">
                    <label
                        htmlFor="name"
                        className="block text-sm/6 font-medium"
                    >
                        Full Name
                    </label>
                    <div className="mt-2">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="full name"
                            className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                        />
                    </div>
                </div>
                <div className="sm:col-span-3">
                    <label
                        htmlFor="phone"
                        className="block text-sm/6 font-medium"
                    >
                        Phone
                    </label>
                    <div className="mt-2">
                        <input
                            id="phone"
                            name="phone"
                            type="text"
                            autoComplete="phone"
                            className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                        />
                    </div>
                </div>
                <div className="sm:col-span-3">
                    <label
                        htmlFor="email"
                        className="block text-sm/6 font-medium"
                    >
                        Email
                    </label>
                    <div className="mt-2">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                        />
                    </div>
                </div>
                <div className="col-span-full">
                    <label
                        htmlFor="address"
                        className="block text-sm/6 font-medium"
                    >
                        Address
                    </label>
                    <div className="mt-2">
                        <input
                            id="address"
                            name="address"
                            type="text"
                            autoComplete="address"
                            className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                        />
                    </div>
                </div>
            </form>
            <div className="flex justify-end items-center gap-4 mt-4">
                {!creatingCustomer ? (
                    <button
                        onClick={
                            selectedCustomer ? onConfirm : handleCustomerCreate
                        }
                        className="cursor-pointer bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md"
                    >
                        Confirm
                    </button>
                ) : (
                    <Loader inline />
                )}
                <button
                    onClick={onReset}
                    className="cursor-pointer bg-red-400 hover:bg-transparent text-white hover:text-red-400 border border-red-400 px-2 py-1 rounded-md"
                >
                    Reset
                </button>
            </div>
        </DashboardModal>
    );
};

export default CustomerSelectModal;
