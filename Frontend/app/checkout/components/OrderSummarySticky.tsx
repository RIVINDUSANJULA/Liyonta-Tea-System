'use client';

import React from 'react';
import { useCartHydration } from '../../hooks/useCartHydration';

/**
 * PIXEL-PERFECT STICKY ORDER SUMMARY
 * Wrapped in React.memo to ensure zero re-renders when the user types 
 * in the left-hand form column.
 */
export const OrderSummarySticky = React.memo(() => {
  const { items, cartTotal, isHydrated } = useCartHydration();
  
  // Design constants matching directives
  const shipping = 0;
  const cod = 0;
  const serviceFee = 50;
  const grandTotal = cartTotal + shipping + cod + serviceFee;

  if (!isHydrated) return null;

  return (
    <aside className="sticky top-8 h-fit space-y-8">
      {/* Cart Items List */}
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4">
            {/* Thumbnail Box */}
            <div className="border border-gray-200 rounded-md w-16 h-16 p-1 flex items-center justify-center relative bg-white">
              <img 
                src={item.url} 
                alt={item.productname} 
                className="max-w-full max-h-full object-contain" 
              />
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-gray-500 text-white text-[10px] font-medium rounded-full flex items-center justify-center">
                {item.quantity}
              </span>
            </div>
            
            {/* Product Details */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-900 truncate">
                {item.productname}
              </h4>
              <p className="text-xs text-gray-500 mt-0.5">
                Quantity - {item.quantity}
              </p>
            </div>
            
            {/* Price */}
            <span className="text-sm font-medium text-gray-900 whitespace-nowrap">
              LKR {item.productprice.toFixed(0)}
            </span>
          </div>
        ))}
      </div>

      {/* Totals Breakdown */}
      <div className="mt-8 border-t border-gray-200 pt-4 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Subtotal</span>
          <span className="text-sm text-gray-500">LKR {cartTotal.toFixed(0)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Shipping</span>
          <span className="text-sm text-gray-500">LKR {shipping}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Cash on Delivery</span>
          <span className="text-sm text-gray-500">LKR {cod}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Service Fee(Postal)</span>
          <span className="text-sm text-gray-500">LKR {serviceFee}</span>
        </div>
      </div>

      {/* Grand Total */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-base font-bold text-gray-900">Total</span>
          <span className="text-lg font-bold text-gray-900">LKR {grandTotal.toFixed(0)}</span>
        </div>
      </div>
    </aside>
  );
});

OrderSummarySticky.displayName = 'OrderSummarySticky';
