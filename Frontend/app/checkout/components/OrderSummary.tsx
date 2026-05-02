'use client';

import React, { useMemo } from 'react';
import { useStoreState } from '../../store/TeaStore';
import { useCheckoutState } from '../../store/CheckoutStore';
import CODSummaryRow from '../../components/CODSummaryRow';

const SummaryItem = React.memo(({ name, price, quantity, image }: { name: string, price: number, quantity: number, image: string }) => (
  <div className="flex items-center gap-4 py-3 border-b border-neutral-100 last:border-0">
    <div className="w-16 h-16 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0">
      <img src={image} alt={name} className="w-full h-full object-cover" />
    </div>
    <div className="flex-1 min-w-0">
      <h4 className="font-semibold text-neutral-900 truncate text-sm">{name}</h4>
      <p className="text-neutral-500 text-xs">Qty: {quantity}</p>
    </div>
    <p className="font-bold text-neutral-900 text-sm">Rs. {(price * quantity).toFixed(2)}</p>
  </div>
));

SummaryItem.displayName = 'SummaryItem';

export default function OrderSummary() {
  const { cart } = useStoreState();
  const { shippingMethod } = useCheckoutState();

  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);
  const shipping = shippingMethod?.price || 0;
  const total = subtotal + shipping;

  return (
    <aside className="sticky top-24 h-fit bg-white p-8 rounded-2xl shadow-xl shadow-emerald-900/5 border border-neutral-100 animate-in fade-in zoom-in duration-500">
      <h2 className="text-xl font-bold text-neutral-900 mb-6">Order Summary</h2>
      
      <div className="max-h-64 overflow-y-auto mb-6 pr-2">
        {cart.map((item) => (
          <SummaryItem 
            key={item.id} 
            name={item.name} 
            price={item.price} 
            quantity={item.quantity} 
            image={item.image} 
          />
        ))}
      </div>

      <div className="space-y-3 pt-6 border-t border-neutral-100">
        <div className="flex justify-between text-neutral-500 text-sm">
          <span>Subtotal</span>
          <span>Rs. {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-neutral-500 text-sm">
          <span>Shipping</span>
          <span className={shipping === 0 ? 'italic' : ''}>
            {shipping === 0 ? 'Select a method' : `Rs. ${shipping.toFixed(2)}`}
          </span>
        </div>
        <CODSummaryRow subtotal={subtotal} />
        <div className="flex justify-between items-center pt-4 border-t border-neutral-100">
          <span className="font-bold text-neutral-900 text-lg">Total</span>
          <span className="font-bold text-emerald-700 text-2xl">Rs. {total.toFixed(2)}</span>
        </div>
      </div>
    </aside>
  );
}
