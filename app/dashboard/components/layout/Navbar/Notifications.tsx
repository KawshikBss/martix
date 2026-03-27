"use clinet";

import Loader from "@/components/ui/loaders/Loader";
import { useNotificationMarkAsRead } from "@/lib/hooks/notifications/useNotificationMarkAsRead";
import { useNotifications } from "@/lib/hooks/notifications/useNotifications";
import { useUnreadNotificationsCount } from "@/lib/hooks/notifications/useUnreadNotificationsCount";
import { useRouter } from "next/navigation";
import React, { MouseEvent } from "react";
import { FaEye, FaRegBell, FaTimes } from "react-icons/fa";

type Props = {};

const Notifications = (props: Props) => {
    const {
        data: notificationsList,
        isLoading,
        isSuccess,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useNotifications();
    const [isNotificationsOpen, setIsNotificationsOpen] = React.useState(false);

    const { data: unreadCount } = useUnreadNotificationsCount();

    const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
        const target = event.currentTarget;

        const isAtBottom =
            target.scrollTop + target.clientHeight >= target.scrollHeight - 10;

        if (isAtBottom && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    };

    const toggleNotifications = () => {
        setIsNotificationsOpen(!isNotificationsOpen);
    };

    const { replace } = useRouter();
    const onClickNotification = (route?: string) => {
        if (route) replace(route);
    };

    const { mutateAsync: notificationMarkAsReadMutation } =
        useNotificationMarkAsRead();

    const markAsRead = async (event: MouseEvent, id?: string) => {
        event.stopPropagation();
        await notificationMarkAsReadMutation(id);
    };

    const getNotificationPriority = (priority: string): string => {
        switch (priority) {
            case "medium":
                return "bg-yellow-600";
            case "high":
                return "bg-red-600";
            default:
                return "bg-green-600";
        }
    };
    return (
        <div className="md:relative">
            <button
                onClick={toggleNotifications}
                className="relative w-5 h-5 cursor-pointer mt-1 text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
                <FaRegBell className="w-5 h-5" />
                {unreadCount?.count && unreadCount?.count > 0 ? (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {unreadCount?.count}
                    </span>
                ) : (
                    ""
                )}
            </button>

            {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="flex justify-between items-center p-4 border-b border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Notifications
                        </h3>
                        <button
                            onClick={() => setIsNotificationsOpen(false)}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <FaTimes className="w-4 h-4" />
                        </button>
                    </div>

                    <div
                        className="max-h-96 overflow-y-auto"
                        onScroll={handleScroll}
                    >
                        {isSuccess &&
                        !notificationsList?.pages?.[0]?.data?.length ? (
                            <div className="p-8 text-center text-gray-500">
                                <FaRegBell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                                <p>No notifications</p>
                            </div>
                        ) : (
                            notificationsList?.pages?.map((page) =>
                                page?.data?.map((notification) => (
                                    <div
                                        key={notification.id}
                                        onClick={() =>
                                            onClickNotification(
                                                notification.data.action_url,
                                            )
                                        }
                                        className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors ${
                                            !notification.read
                                                ? "bg-blue-50"
                                                : ""
                                        }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <div
                                                className={`w-2 h-2 rounded-full ${getNotificationPriority(
                                                    notification?.data
                                                        ?.priority,
                                                )}`}
                                            />
                                            <h4
                                                className={`text-sm font-medium ${
                                                    !notification.read
                                                        ? "text-gray-900"
                                                        : "text-gray-700"
                                                }`}
                                            >
                                                {notification?.data?.title}
                                            </h4>
                                            {!notification.read && (
                                                <FaEye
                                                    onClick={(e) =>
                                                        markAsRead(
                                                            e,
                                                            notification?.id,
                                                        )
                                                    }
                                                    className="text-xl text-blue-500 hover:bg-transparent hover:scale-110 cursor-pointer transition-all duration-300 ease-in-out ms-auto"
                                                />
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">
                                            {notification?.data?.message}
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            {notification.created_at}
                                        </p>
                                    </div>
                                )),
                            )
                        )}
                    </div>

                    {(isFetchingNextPage || (!isSuccess && isLoading)) && (
                        <Loader />
                    )}

                    {hasNextPage && !isFetchingNextPage && (
                        <div className="p-3 border-t border-gray-100 text-center">
                            <button
                                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                                onClick={() => fetchNextPage()}
                            >
                                View all notifications
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Notifications;
