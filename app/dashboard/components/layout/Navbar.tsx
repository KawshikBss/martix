import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { FaRegBell, FaRegUser } from "react-icons/fa6";
import { IoMdMenu } from "react-icons/io";
import { FaTimes } from "react-icons/fa";

export interface INavbarProps {
  openSidebar?: () => void;
}

export default function Navbar(props: INavbarProps) {
  const [isNotificationsOpen, setIsNotificationsOpen] = React.useState(false);

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      title: "Low Stock Alert",
      message: "Doxiva is running low (5 units remaining)",
      time: "2 minutes ago",
      unread: true,
      type: "warning"
    },
    {
      id: 2,
      title: "New Order",
      message: "Order #12345 has been placed",
      time: "1 hour ago",
      unread: true,
      type: "info"
    },
    {
      id: 3,
      title: "Payment Received",
      message: "Payment of ৳2,500 received from customer",
      time: "3 hours ago",
      unread: false,
      type: "success"
    },
    {
      id: 4,
      title: "Product Expiry",
      message: "5 products will expire in next 7 days",
      time: "1 day ago",
      unread: false,
      type: "danger"
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  const markAsRead = (id: number) => {
    // Handle marking notification as read
    console.log(`Mark notification ${id} as read`);
  };

  return (
    <div className="w-full px-8 pt-6 flex flex-row justify-between items-center">
      <IoMdMenu
        className="w-6 h-6 pointer text-gray-600 hover:text-gray-800 transition-colors duration-200 md:hidden"
        onClick={props.openSidebar}
      />
      <div className="hidden md:block">
        <input
          type="text"
          placeholder="Search..."
          className="bg-white border border-gray-300 rounded-md px-4 py-1"
        />
        <button className="bg-blue-500 text-white rounded-md px-4 py-1 ms-2">
          Search
        </button>
      </div>
      <div className="flex flex-row items-center gap-8">
        {/* Notifications Bell with Dropdown */}
        <div className="md:relative">
          <button
            onClick={toggleNotifications}
            className="relative w-5 h-5 cursor-pointer mt-1 text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            <FaRegBell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              {/* Header */}
              <div className="flex justify-between items-center p-4 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                <button
                  onClick={() => setIsNotificationsOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              </div>

              {/* Notifications List */}
              <div className="max-h-96 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      onClick={() => markAsRead(notification.id)}
                      className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors ${
                        notification.unread ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${
                              notification.type === 'warning' ? 'bg-yellow-500' :
                              notification.type === 'danger' ? 'bg-red-500' :
                              notification.type === 'success' ? 'bg-green-500' :
                              'bg-blue-500'
                            }`} />
                            <h4 className={`text-sm font-medium ${
                              notification.unread ? 'text-gray-900' : 'text-gray-700'
                            }`}>
                              {notification.title}
                            </h4>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {notification.time}
                          </p>
                        </div>
                        {notification.unread && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1" />
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    <FaRegBell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                    <p>No notifications</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              {notifications.length > 0 && (
                <div className="p-3 border-t border-gray-100 text-center">
                  <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                    View all notifications
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <Link href="/dashboard/profile">
          <Image
            src="/images/user-placeholder.jpg"
            alt="Profile"
            className="rounded-full w-[40px] h-[40px] object-cover"
            width={40}
            height={40}
          />
        </Link>
      </div>
    </div>
  );
}
