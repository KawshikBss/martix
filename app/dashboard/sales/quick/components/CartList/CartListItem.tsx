"use client";

import { IProduct } from "@/public/data/productsData";
import Image from "next/image";
import * as React from "react";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";

export interface ICartListItemProps {
  product: IProduct;
  quantity?: number;
  onQuantityChange?: (productId: number, newQuantity: number) => void;
  onRemove?: (productId: number) => void;
}

export function CartListItem(props: ICartListItemProps) {
  const [quantity, setQuantity] = React.useState(props.quantity || props.product.stockQty || 1);
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) return;
    setQuantity(newQuantity);
    props.onQuantityChange?.(props.product.id, newQuantity);
  };

  const handleRemove = () => {
    props.onRemove?.(props.product.id);
  };

  const totalPrice = props.product.price * quantity;

  return (
    <div className="md:hidden bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-3">
      <div className="flex items-start space-x-3">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <Image
            width={60}
            height={60}
            src={props.product.image}
            alt={props.product.name}
            className="w-15 h-15 rounded-lg object-cover border border-gray-100"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {props.product.name}
              </h3>
              <p className="text-xs text-gray-500 mt-1">SKU: {props.product.sku}</p>
            </div>
            
            {/* Remove Button */}
            <button
              onClick={handleRemove}
              className="ml-2 p-1 text-gray-400 hover:text-red-500 transition-colors"
            >
              <FaTrash className="w-3 h-3" />
            </button>
          </div>

          {/* Price per unit */}
          <div className="text-sm text-gray-600 mb-3">
            ৳{props.product.price.toFixed(2)} per unit
          </div>
        </div>
      </div>
          {/* Quantity Controls and Total */}
          <div className="flex items-center justify-between">
            {/* Quantity Controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 disabled:text-gray-300 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                <FaMinus className="w-3 h-3" />
              </button>
              
              <span className="w-12 text-center text-sm font-medium text-gray-900">
                {quantity}
              </span>
              
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <FaPlus className="w-3 h-3" />
              </button>
            </div>

            {/* Total Price */}
            <div className="text-right">
              <div className="text-sm font-bold text-gray-900">
                ৳{totalPrice.toFixed(2)}
              </div>
              <div className="text-xs text-gray-500">
                {quantity} × ৳{props.product.price.toFixed(2)}
              </div>
            </div>
          </div>
    </div>
  );
}
