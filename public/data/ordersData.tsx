interface Order {
    id: number;
    customerName: string;
    totalAmount: number;
    status: 0 | 1 | 2;
}

const ordersData: Order[] = [
    {
        id: 1,
        customerName: "John Doe",
        totalAmount: 100,
        status: 1,
    },
    {
        id: 2,
        customerName: "Jane Smith",
        totalAmount: 200,
        status: 0,
    },
    {
        id: 3,
        customerName: "Alice Johnson",
        totalAmount: 150,
        status: 2,
    },
];

export default ordersData;
