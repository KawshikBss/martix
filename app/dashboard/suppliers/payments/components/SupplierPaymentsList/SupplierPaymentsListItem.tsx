"use client";

import { Order } from "@/public/data/ordersData";
import Link from "next/link";
import * as React from "react";
import { BiPackage } from "react-icons/bi";
import { FaCalendarAlt, FaCoins, FaPhone, FaTruck } from "react-icons/fa";
import {
  FaCartShopping,
  FaCashRegister,
  FaChevronDown,
  FaChevronUp,
  FaCreditCard,
  FaGlobe,
  FaMoneyBill1Wave,
} from "react-icons/fa6";

export interface ISupplierPaymentsListItemProps {
  product: Order;
}

export function SupplierPaymentsListItem(
  props: ISupplierPaymentsListItemProps
) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const { product } = props;
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-3">
      {/* Collapsed View */}
      <div
        className="flex items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={toggleExpanded}
      >
        <FaCreditCard className="flex-shrink-0 w-6 h-6 text-gray-400" />
        <div className="flex-1 ml-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">
                PAY-{product.id}
              </h3>
              <p className="text-xs text-gray-500">Robert California</p>
            </div>

            <div className="text-right mr-4">
              <div
                className={`text-xs ${
                  product.id % 2 == 0 ? "text-yellow-600" : "text-green-600"
                }`}
              >
                {product.id % 2 == 0 ? "Partial" : "Cleared"}
              </div>
              <div className="text-xs text-gray-400">12 Aug, 2025</div>
            </div>
          </div>
        </div>

        {/* Expand Icon */}
        <button className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-full transition-colors">
          {isExpanded ? (
            <FaChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <FaChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </button>
      </div>

      {/* Expanded View */}
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-gray-100">
          <div className="pt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <FaCartShopping className="w-4 h-4 text-blue-500 mr-2" />
                  <span className="text-lg font-bold text-gray-700">
                    Related Purchase Order
                  </span>
                </div>
              </div>
              <div className={`text-sm font-medium`}>PO-{product.id}</div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <FaCartShopping className="w-4 h-4 text-blue-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">
                    Amount
                  </span>
                </div>
              </div>
              <div className={`text-lg font-bold`}>${product.totalAmount}</div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  {product.id % 2 == 0 ? (
                    <FaCreditCard className="w-4 h-4 text-green-500 mr-2" />
                  ) : (
                    <FaMoneyBill1Wave className="w-4 h-4 text-green-500 mr-2" />
                  )}
                  <span className="text-sm font-medium text-gray-700">
                    Payment Method
                  </span>
                </div>
              </div>
              <div className={`text-lg font-bold`}>
                {product.id % 2 == 0 ? "Card" : "Cash"}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href={"/"}
                className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white"
              >
                View
              </Link>
              <Link
                href={"/"}
                className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white"
              >
                Edit
              </Link>
              <Link
                href={"/"}
                className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white"
              >
                Delete
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
