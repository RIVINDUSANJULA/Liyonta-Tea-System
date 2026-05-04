'use client';

import React, { useState } from 'react';
import { ShoppingBag } from '../components/Icons';
import { CartProvider, useCart, useCartTotals } from '../store/CartStore';
import { ContactSection, DeliverySection, PaymentSection } from './components/FormSections';
import { OrderSummarySticky } from './components/OrderSummarySticky';
import { fetcher } from '../lib/api';
import { useSimpleForm } from '../hooks/useSimpleForm';

function CheckoutPageContent() {
  const { state, dispatch: cartDispatch } = useCart();
  const { subtotal } = useCartTotals();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, values, setValue, watch, isValid } = useSimpleForm({
    mobilePhone: '',
    wantsNews: false,
    fullName: '',
    email: '',
    address: '',
    saveInfo: false,
    paymentMethod: 'COD'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setIsSubmitting(true);
    
    const postalFee = 50;
    const grandTotal = subtotal + state.shippingFee + state.codFee + postalFee;

    // Format items string exactly as required by backend: "Product Name - Qty(Price)"
    const itemsString = state.items.reduce((acc, item, index) => {
      const itemStr = `${item.productname} - ${item.quantity}(${item.price})`;
      return index === 0 ? itemStr : `${acc}, ${itemStr}`;
    }, "");

    const orderNo = `${new Date().toISOString().slice(0, 10).replace(/-/g, '')}${Math.floor(1000 + Math.random() * 9000)}`;

    const payload = {
      fullname: values.fullName,
      date: new Date().toLocaleDateString('en-GB'), // Use standardized date
      time: new Date().toLocaleTimeString('en-GB'),
      phone: values.mobilePhone,
      Amount: Math.round(grandTotal),
      address: values.address,
      email: values.email,
      items: itemsString,
      orderno: orderNo,
      shippingRate: state.shippingFee,
      codRate: state.codFee
    };

    try {
      await fetcher('/api/Ordersadd', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      
      // Success: Clear cart and redirect
      cartDispatch({ type: 'SET_ITEMS', payload: [] });
      window.location.href = '/success';
    } catch (error) {
      console.error('Order submission failed:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <header className="border-b border-neutral-100 py-6 px-10 flex items-center justify-between sticky top-0 bg-white z-50">
        <h1 className="text-2xl font-black tracking-tighter">LIYONTA</h1>
        <nav className="hidden md:flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
          <a href="/" className="hover:text-neutral-900 transition-colors">Home</a>
          <a href="/about" className="hover:text-neutral-900 transition-colors">About Us</a>
          <a href="/contact" className="hover:text-neutral-900 transition-colors">Contact Us</a>
          <a href="/shop" className="text-neutral-900">Shop</a>
        </nav>
        <div className="flex items-center gap-4">
          <ShoppingBag className="w-5 h-5 text-neutral-900" />
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-16 px-6 lg:px-10">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Left Column: Forms */}
          <div className="space-y-4">
            <ContactSection register={register} />
            <DeliverySection register={register} />
            <PaymentSection watch={watch} setValue={setValue} />
            
            <div className="pt-10">
              <button
                type="submit"
                disabled={isSubmitting || !isValid}
                className={`w-full py-6 rounded-2xl font-black text-xl uppercase tracking-widest transition-all ${
                  isSubmitting || !isValid
                    ? 'bg-neutral-100 text-neutral-300 cursor-not-allowed'
                    : 'bg-emerald-900 text-white hover:bg-emerald-800 active:scale-[0.98] shadow-2xl shadow-emerald-900/20'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processing</span>
                  </div>
                ) : 'Pay Now'}
              </button>
            </div>
          </div>

          {/* Right Column: Sticky Summary */}
          <div className="hidden lg:block">
            <OrderSummarySticky />
          </div>
        </form>
      </main>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <CartProvider>
      <CheckoutPageContent />
    </CartProvider>
  );
}
