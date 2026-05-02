'use client';

import React, { useRef } from 'react';
import { useCheckoutDispatch } from '../../store/CheckoutStore';

export default function ShippingForm() {
  const dispatch = useCheckoutDispatch();
  const formRef = useRef<HTMLFormElement>(null);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({ type: 'SET_ADDRESS', payload: { [name]: value } });
  };

  return (
    <section className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100 animate-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <span className="w-8 h-8 bg-neutral-900 text-white rounded-full flex items-center justify-center text-sm">1</span>
        Shipping Information
      </h2>
      
      <form ref={formRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-neutral-600 mb-2">Email Address</label>
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            onBlur={handleBlur}
            className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-neutral-600 mb-2">First Name</label>
          <input
            name="firstName"
            type="text"
            placeholder="John"
            onBlur={handleBlur}
            className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-neutral-600 mb-2">Last Name</label>
          <input
            name="lastName"
            type="text"
            placeholder="Doe"
            onBlur={handleBlur}
            className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
            required
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-neutral-600 mb-2">Street Address</label>
          <input
            name="address"
            type="text"
            placeholder="123 Tea Garden Lane"
            onBlur={handleBlur}
            className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-neutral-600 mb-2">City</label>
          <input
            name="city"
            type="text"
            placeholder="Nuwara Eliya"
            onBlur={handleBlur}
            className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-neutral-600 mb-2">State</label>
            <input
              name="state"
              type="text"
              placeholder="Central"
              onBlur={handleBlur}
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-neutral-600 mb-2">ZIP Code</label>
            <input
              name="zip"
              type="text"
              placeholder="22200"
              onBlur={handleBlur}
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
              required
            />
          </div>
        </div>
      </form>
    </section>
  );
}
