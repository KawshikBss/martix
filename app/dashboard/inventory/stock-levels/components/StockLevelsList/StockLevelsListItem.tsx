import { IProduct } from "@/public/data/productsData";
import * as React from "react";
import Image from "next/image";
import {
  FaChevronDown,
  FaChevronUp,
  FaEdit,
  FaPlus,
  FaMinus,
} from "react-icons/fa";
import { BiPackage } from "react-icons/bi";
import { MdWarning } from "react-icons/md";
import Link from "next/link";

export interface IStockLevelsListItemProps {
  product: IProduct;
}

export function StockLevelsListItem(props: IStockLevelsListItemProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const { product } = props;

  // Calculate expiry status (assuming you have expiry date in product data)
  const expiryDate = new Date("2025-12-15"); // Mock expiry date
  const today = new Date();
  const daysUntilExpiry = Math.ceil(
    (expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
  const isExpiringSoon = daysUntilExpiry <= 30;
  const isExpired = daysUntilExpiry <= 0;

  // Mock reorder point (you can add this to your product interface)
  const reorderPoint = 20;
  const isLowStock = product.stockQty <= reorderPoint;

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
                  isExpired
                    ? "text-red-600"
                    : isExpiringSoon
                    ? "text-yellow-600"
                    : "text-gray-600"
                }`}
              >
                {isExpired
                  ? "Expired"
                  : isExpiringSoon
                  ? `Expires in ${daysUntilExpiry} days`
                  : "Good"}
              </div>
              <div className="text-xs text-gray-400">
                {expiryDate.toLocaleDateString()}
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
                {isLowStock && (
                  <MdWarning className="w-4 h-4 text-yellow-500" />
                )}
              </div>
              <div
                className={`text-lg font-bold ${
                  product.stockQty === 0
                    ? "text-red-600"
                    : isLowStock
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}
              >
                {product.stockQty} units
              </div>
            </div>

            {/* Reorder Point */}
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center mb-2">
                <MdWarning className="w-4 h-4 text-orange-500 mr-2" />
                <span className="text-sm font-medium text-gray-700">
                  Reorder Point
                </span>
              </div>
              <div className="text-lg font-bold text-gray-900">
                {reorderPoint} units
              </div>
            </div>

            {/* Status */}
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center mb-2">
                <div
                  className={`w-3 h-3 rounded-full mr-2 ${
                    product.stockQty === 0
                      ? "bg-red-500"
                      : isLowStock
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                />
                <span className="text-sm font-medium text-gray-700">
                  Status
                </span>
              </div>
              <div
                className={`text-sm font-medium ${
                  product.stockQty === 0
                    ? "text-red-600"
                    : isLowStock
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}
              >
                {product.stockQty === 0
                  ? "Out of Stock"
                  : isLowStock
                  ? "Low Stock"
                  : "In Stock"}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href={"/"}
              className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white"
            >
              {product.stockQty % 2 == 0 ? "Reorder" : "Stock In"}
            </Link>
            <Link
              href={"/"}
              className="bg-gray-200 px-2 py-1 rounded-md hover:bg-white"
            >
              Edit Details
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
