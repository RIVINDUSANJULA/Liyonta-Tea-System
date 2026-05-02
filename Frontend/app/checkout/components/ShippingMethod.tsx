'use client';

import React from 'react';
import { useCheckoutState, useCheckoutDispatch, ShippingMethod } from '../../store/CheckoutStore';

const METHODS: ShippingMethod[] = [
  { id: 'standard', name: 'Standard Shipping', price: 5.00, deliveryTime: '3-5 business days' },
  { id: 'express', name: 'Express Shipping', price: 15.00, deliveryTime: '1-2 business days' },
];

export default function ShippingMethodSelector() {
  const { shippingMethod } = useCheckoutState();
  const dispatch = useCheckoutDispatch();

  return (
    <section className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100 mt-8 animate-in slide-in-from-bottom-4 duration-500 delay-100">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <span className="w-8 h-8 bg-neutral-900 text-white rounded-full flex items-center justify-center text-sm">2</span>
        Shipping Method
      </h2>
      
      <div className="grid grid-cols-1 gap-4">
        {METHODS.map((method) => (
          <label
            key={method.id}
            className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
              shippingMethod?.id === method.id 
                ? 'border-emerald-600 bg-emerald-50/30' 
                : 'border-neutral-100 hover:border-neutral-200 bg-neutral-50/50'
            }`}
          >
            <div className="flex items-center gap-4">
              <input
                type="radio"
                name="shippingMethod"
                checked={shippingMethod?.id === method.id}
                onChange={() => dispatch({ type: 'SET_METHOD', payload: method })}
                className="w-5 h-5 accent-emerald-600"
              />
              <div>
                <p className="font-bold text-neutral-900">{method.name}</p>
                <p className="text-sm text-neutral-500">{method.deliveryTime}</p>
              </div>
            </div>
            <p className="font-bold text-emerald-700">${method.price.toFixed(2)}</p>
          </label>
        ))}
      </div>
    </section>
  );
}
