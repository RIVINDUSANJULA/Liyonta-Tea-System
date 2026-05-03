'use client';

import React from 'react';
import { useCart, useCartTotals } from '../../store/CartStore';

export const OrderSummarySticky = React.memo(() => {
  const { state } = useCart();
  const { subtotal } = useCartTotals();
  
  // These would typically come from the previous Cart step via a state sync or persistence
  // For this demo, we assume they are recalculated or passed down
  const shipping = 250; // Example placeholder
  const cod = 150;      // Example placeholder
  const serviceFee = 50;
  const total = subtotal + shipping + cod + serviceFee;

  return (
    <aside className="sticky top-10 space-y-8 bg-neutral-50/50 p-10 rounded-3xl border border-neutral-100">
      <div className="space-y-6">
        {state.items.map((item) => (
          <div key={item.id} className="flex gap-4 items-center">
            <div className="relative w-16 h-16 rounded-xl bg-white border border-neutral-100 overflow-hidden flex-shrink-0">
              <img src={item.url} alt={item.productname} className="w-full h-full object-cover" />
              <span className="absolute -top-2 -right-2 w-6 h-6 bg-neutral-900 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {item.quantity}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-neutral-900 truncate text-sm">{item.productname}</h4>
              <p className="text-xs text-neutral-400">Quantity - {item.quantity}</p>
            </div>
            <span className="font-bold text-neutral-900 text-sm whitespace-nowrap">
              Rs. {(item.price * item.quantity).toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      <div className="space-y-4 pt-8 border-t border-neutral-100">
        <div className="flex justify-between text-sm">
          <span className="text-neutral-500">Subtotal</span>
          <span className="font-bold text-neutral-900">Rs. {subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-neutral-500">Shipping</span>
          <span className="font-bold text-neutral-900">Rs. {shipping.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-neutral-500">Cash on Delivery</span>
          <span className="font-bold text-neutral-900">Rs. {cod.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-neutral-500">Service Fee(Postal)</span>
          <span className="font-bold text-neutral-900">Rs. {serviceFee.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-end pt-4 border-t border-neutral-100">
          <span className="text-sm font-bold text-neutral-400 uppercase tracking-widest">Total</span>
          <span className="text-2xl font-black text-neutral-900">Rs. {total.toLocaleString()}</span>
        </div>
      </div>
    </aside>
  );
});

OrderSummarySticky.displayName = 'OrderSummarySticky';
