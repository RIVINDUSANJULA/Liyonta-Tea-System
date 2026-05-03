'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CartProvider, useCart, useCartTotals } from '../store/CartStore';
import CartItemRow from './components/CartItemRow';
import { SubtotalRow, ShippingFeeRow, CODFeeRow, StaticFeeRow } from './components/SummaryRows';

function CartPageContent() {
  const { state } = useCart();
  const { subtotal, weight } = useCartTotals();
  
  // Dynamic fee states to sync with Grand Total
  const [shipping, setShipping] = useState(0);
  const [cod, setCod] = useState(0);
  const postalFee = 50;

  const grandTotal = subtotal + shipping + cod + postalFee;

  if (state.items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-6 text-center">
        <h1 className="text-4xl font-black text-neutral-900 mb-4">Cart</h1>
        <p className="text-neutral-500 mb-8">Your cart is currently empty.</p>
        <Link href="/" className="inline-block px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-black text-neutral-900 mb-12 text-center">Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Table Area */}
        <div className="lg:col-span-2 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="pb-4 font-bold text-neutral-400 uppercase text-xs tracking-widest">Item</th>
                <th className="pb-4 font-bold text-neutral-400 uppercase text-xs tracking-widest">Quantity</th>
                <th className="pb-4 font-bold text-neutral-400 uppercase text-xs tracking-widest">Price</th>
                <th className="pb-4 font-bold text-neutral-400 uppercase text-xs tracking-widest">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {state.items.map(item => (
                <CartItemRow key={item.id} item={item} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Area */}
        <aside className="bg-neutral-50 p-8 rounded-3xl border border-neutral-200/50">
          <h2 className="text-xl font-black text-neutral-900 mb-6 uppercase tracking-tight">Order Summary</h2>
          
          <div className="space-y-1 mb-6">
            <SubtotalRow value={subtotal} />
            <ShippingFeeRow weight={weight} onValue={setShipping} />
            <CODFeeRow subtotal={subtotal} onValue={setCod} />
            <StaticFeeRow />
          </div>

          <div className="pt-6 border-t border-neutral-200">
            <div className="flex justify-between items-end mb-8">
              <span className="font-bold text-neutral-400 uppercase text-xs tracking-widest">Grand Total</span>
              <span className="text-3xl font-black text-neutral-900">
                Rs. {grandTotal.toLocaleString()}
              </span>
            </div>

            <Link href="/checkout">
              <button className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-xl hover:bg-slate-800 transition-all active:scale-[0.98] shadow-xl shadow-slate-900/10 uppercase tracking-widest">
                Next
              </button>
            </Link>
          </div>
          
          <p className="mt-6 text-center text-xs text-neutral-400 font-medium">
            Taxes and specific delivery adjustments calculated at checkout.
          </p>
        </aside>
      </div>
    </main>
  );
}

export default function CartPage() {
  return (
    <CartProvider>
      <CartPageContent />
    </CartProvider>
  );
}
