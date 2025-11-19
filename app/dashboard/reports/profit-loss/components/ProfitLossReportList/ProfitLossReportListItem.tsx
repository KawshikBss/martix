import { IProduct } from "@/public/data/productsData";
import Link from "next/link";
import * as React from "react";
import { BiPackage } from "react-icons/bi";
import {
  FaCashRegister,
  FaChevronDown,
  FaChevronUp,
  FaCoins,
  FaCreditCard,
  FaGlobe,
  FaShoppingBag,
} from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

export interface IProfitLossReportListItemProps {
  product: IProduct;
}

export function ProfitLossReportListItem(
  props: IProfitLossReportListItemProps
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
        <BiPackage className="flex-shrink-0 w-6 h-6 text-gray-400" />
        <div className="flex-1 ml-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">
                {product.name}
              </h3>
            </div>

            <div className="text-right mr-4">
              <div className="text-xs">
                Revenue:{" "}
                <span className="font-bold">
                  ${product.stockQty * product.price}
                </span>
              </div>
              <div className="text-xs">
                Margin: <span className="font-bold">51%</span>
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
                  <FaCashRegister className="w-4 h-4 text-orange-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">
                    Units Sold
                  </span>
                </div>
              </div>
              <div className={`text-lg font-bold`}>
                {product.stockQty} units
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <FaCreditCard className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">
                    Cost Of Goods Sold
                  </span>
                </div>
              </div>
              <div className={`text-lg font-bold`}>$5000</div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <FaCoins className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">
                    Profit
                  </span>
                </div>
              </div>
              <div className={`text-lg font-bold`}>$5000</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
