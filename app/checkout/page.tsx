'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronDown } from '../components/Icons';
import { CheckoutProvider } from './store/CheckoutStore'; // Wait, I put it in app/store/CheckoutStore.tsx
import { CheckoutProvider as Provider } from '../store/CheckoutStore';
import ShippingForm from './components/ShippingForm';
import ShippingMethodSelector from './components/ShippingMethod';
import PaymentGateway from './components/PaymentGateway';
import OrderSummary from './components/OrderSummary';
import PlaceOrderButton from './components/PlaceOrderButton';

export default function CheckoutPage() {
  return (
    <Provider>
      <main className="min-h-screen bg-neutral-50 text-neutral-900 selection:bg-emerald-100">
        {/* Simple Header */}
        <nav className="h-16 bg-white border-b border-neutral-100 px-6 flex items-center justify-between sticky top-0 z-50">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-neutral-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <span className="font-bold text-xl tracking-tight">LIYONTA</span>
          </Link>
          <Link href="/" className="text-sm font-medium text-emerald-600 hover:underline flex items-center gap-1">
            Back to Shop
          </Link>
        </nav>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 p-6 md:p-12">
          {/* Left Column: Forms */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-8">
            <header className="mb-12">
              <h1 className="text-4xl font-black tracking-tight mb-2">Secure Checkout</h1>
              <p className="text-neutral-500">Fast, encrypted, and secure tea procurement.</p>
            </header>

            <ShippingForm />
            <ShippingMethodSelector />
            <PaymentGateway />
          </div>

          {/* Right Column: Sticky Summary */}
          <div className="lg:col-span-5 xl:col-span-4">
            <OrderSummary />
            <PlaceOrderButton />
            
            <div className="mt-8 p-6 bg-neutral-100 rounded-2xl border border-neutral-200/50">
              <p className="text-xs text-neutral-500 leading-relaxed text-center">
                Your payment information is processed securely. We do not store credit card details nor have access to your credit card information.
              </p>
            </div>
          </div>
        </div>
      </main>
    </Provider>
  );
}
