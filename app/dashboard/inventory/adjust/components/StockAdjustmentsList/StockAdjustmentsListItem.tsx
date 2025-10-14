import { IProduct } from "@/public/data/productsData";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { BiPackage } from "react-icons/bi";
import { FaChevronDown, FaChevronUp, FaStore } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";

export interface IStockAdjustmentsListItemProps {
  product: IProduct;
}

export function StockAdjustmentsListItem(
  props: IStockAdjustmentsListItemProps
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
        {/* Product Thumbnail */}
        <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            width={48}
            height={48}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 ml-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">
                {product.name}
              </h3>
              <p className="text-xs text-gray-500">SKU: {product.sku}</p>
            </div>

            {/* Expiry Info */}
            <div className="text-right mr-4">
              <div
                className={`text-xs font-medium ${
                  product.stockQty % 2 == 0 ? "text-red-600" : "text-green-600"
                }`}
              >
                {product.stockQty % 2 == 0 ? "Stock Out" : "Stock In"}
              </div>
              <div className="text-xs text-gray-400">
                ${product.stockQty * product.price}
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
            {/* Stock Quantity */}
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <BiPackage className="w-4 h-4 text-blue-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">
                    Stock Qty
                  </span>
                </div>
              </div>
              <div
                className={`text-lg font-bold ${
                  product.stockQty % 2 == 0 ? "text-red-600" : "text-green-600"
                }`}
              >
                {product.stockQty} units
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <FaStore className="w-4 h-4 text-blue-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">
                    Source / Destination
                  </span>
                </div>
              </div>
              <div className={`text-lg font-bold`}>
                Supplier {product.stockQty}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <FaPerson className="w-4 h-4 text-blue-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">
                    Entered By
                  </span>
                </div>
              </div>
              <div className={`text-lg font-bold`}>
                Staff {product.stockQty}
              </div>
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
      )}
    </div>
  );
}
