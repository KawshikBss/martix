import { IProduct } from "@/public/data/productsData";
import Link from "next/link";
import * as React from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaEquals,
  FaPercent,
  FaTrash,
} from "react-icons/fa";
import { HiReceiptTax } from "react-icons/hi";

export interface IProductsListItemProps {
  product: IProduct;
}

export function ProductsListItem(props: IProductsListItemProps) {
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

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">
                {product.name}
              </h3>
              <p className="text-xs text-gray-500">SKU: {product.sku}</p>
            </div>

            <div className="text-right mr-4">
              <div className="text-xs text-gray-400">
                {product.stockQty} units
              </div>
              <div className="text-xs text-gray-400">${product.price}</div>
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
        <button className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-full transition-colors">
          <FaTrash className="w-4 h-4 text-red-500" />
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
                  <FaPercent className="w-4 h-4 text-yellow-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">
                    Discount
                  </span>
                </div>
              </div>
              <div className={`text-lg font-bold`}>$0.00</div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <HiReceiptTax className="w-4 h-4 text-blue-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Tax</span>
                </div>
              </div>
              <div className={`text-lg font-bold`}>$0.00</div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <FaEquals className="w-4 h-4 text-blue-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">
                    Total
                  </span>
                </div>
              </div>
              <div className={`text-lg font-bold`}>
                ${product.price * product.stockQty}
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
              <button className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white">
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
