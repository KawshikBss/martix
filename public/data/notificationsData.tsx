interface Notification {
    id: number;
    message: string;
    read: boolean;
}

const notificationsData: Notification[] = [
    {
        id: 1,
        message: "New order received",
        read: false,
    },
    {
        id: 2,
        message: "Order #123 has been shipped",
        read: true,
    },
    {
        id: 3,
        message: "New message from support",
        read: false,
    },
    {
        id: 4,
        message: "New comment on your post",
        read: false,
    },
    {
        id: 5,
        message: "New like on your post",
        read: false,
    },
];

export default notificationsData;
