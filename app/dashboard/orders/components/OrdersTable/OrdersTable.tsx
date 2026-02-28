import { PaginatedResponse } from "@/lib/core/PaginatedResponse";
import { SaleInterface } from "@/lib/interfaces/SaleInterface";
import { InfiniteData } from "@tanstack/react-query";
import OrdersTableItem from "./OrdersTableItem";

type Props = {
    data?: InfiniteData<PaginatedResponse<SaleInterface>>;
};

const OrdersTable = ({ data }: Props) => {
    return data?.pages?.[0].total ? (
        <table className="hidden md:table w-full text-left mt-4">
            <thead>
                <tr className="border-b border-gray-300 text-gray-500">
                    <th className="px-2 py-2 font-normal">Order No</th>
                    <th className="px-2 py-2 font-normal">Date</th>
                    <th className="px-2 py-2 font-normal">Store</th>
                    <th className="px-2 py-2 font-normal">Customer</th>
                    <th className="px-2 py-2 font-normal">Items</th>
                    <th className="px-2 py-2 font-normal">Total</th>
                    <th className="px-2 py-2 font-normal">Payment</th>
                    <th className="px-2 py-2 font-normal">Status</th>
                    <th className="px-2 py-2 font-normal">Actions</th>
                </tr>
            </thead>
            <tbody>
                {data?.pages?.map((page) =>
                    page.data.map((item) => (
                        <OrdersTableItem key={item?.id} sale={item} />
                    )),
                )}
            </tbody>
        </table>
    ) : (
        ""
    );
};

export default OrdersTable;
