"use client";

import { IProduct } from "@/public/data/productsData";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { BiPackage } from "react-icons/bi";
import { FaCalendarAlt, FaPhone } from "react-icons/fa";
import {
  FaCartShopping,
  FaCashRegister,
  FaChevronDown,
  FaChevronUp,
  FaCreditCard,
  FaGlobe,
} from "react-icons/fa6";

export interface ISuppliersListItemProps {
  product: IProduct;
}

export function SuppliersListItem(props: ISuppliersListItemProps) {
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
        <Image
          src={"/images/user-placeholder.jpg"}
          alt={product.name}
          width={60}
          height={60}
          className="aspect-square max-w-8 h-8 object-cover rounded-full"
        />
        <div className="flex-1 ml-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">
                Robert California
              </h3>
              <p className="text-xs text-gray-500">+880-1122-334455</p>
              <p className="text-xs text-gray-500">supplier@gmail.com</p>
            </div>

            <div className="text-right mr-4">
              <div
                className={`text-xs ${
                  product.id % 2 == 0 ? "text-red-600" : "text-green-600"
                }`}
              >
                {product.id % 2 == 0 ? "INACTIVE" : "ACTIVE"}
              </div>
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
                  <FaPhone className="w-4 h-4 text-blue-500 mr-2" />
                  <span className="text-lg font-bold text-gray-700">
                    Contact Person
                  </span>
                </div>
              </div>
              <div className={`text-sm font-medium`}>Robert California</div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <FaCartShopping className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">
                    Total Purchases
                  </span>
                </div>
              </div>
              <div className={`text-lg font-bold`}>100</div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <FaCreditCard className="w-4 h-4 text-yellow-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">
                    Pending Payment
                  </span>
                </div>
              </div>
              <div className={`text-lg font-bold`}>
                ${product.id % 2 == 0 ? "100" : "200"}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <FaCalendarAlt className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">
                    Last Purchase
                  </span>
                </div>
              </div>
              <div className={`text-lg font-bold`}>12 Aug, 2025</div>
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
                Disable
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
