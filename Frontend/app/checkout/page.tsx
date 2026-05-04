'use client';

import React, { useState, useMemo } from 'react';
import { ShoppingBag } from '../components/Icons';
import { useCartHydration } from '../hooks/useCartHydration';
import { useCartStore } from '../store/useCartStore';
import { ContactSection, DeliverySection, PaymentSection } from './components/FormSections';
import { OrderSummarySticky } from './components/OrderSummarySticky';
import { fetcher } from '../lib/api';
import { useSimpleForm } from '../hooks/useSimpleForm';

/**
 * REFACTORED CHECKOUT PAGE
 * Implements a clean separation between UI and order submission logic.
 * Optimized with useMemo for price calculations and proper hydration safety.
 */
function CheckoutPageContent() {
  const { items, cartTotal, isHydrated } = useCartHydration();
  const clearCart = useCartStore((state) => state.clearCart);
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

  // Centralized pricing logic
  const fees = useMemo(() => ({
    postal: 50,
    shipping: 0, // Should be fetched from API in real-world
    cod: 0
  }), []);

  const grandTotal = useMemo(() => 
    cartTotal + fees.postal + fees.shipping + fees.cod,
    [cartTotal, fees]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || isSubmitting) return;

    setIsSubmitting(true);
    
    try {
      // 1. Format Payload
      const itemsString = items.map(i => `${i.productname} - ${i.quantity}(${i.productprice})`).join(', ');
      const orderNo = `${new Date().toISOString().slice(0, 10).replace(/-/g, '')}${Math.floor(1000 + Math.random() * 9000)}`;

      const payload = {
        fullname: values.fullName,
        date: new Date().toLocaleDateString('en-GB'),
        time: new Date().toLocaleTimeString('en-GB'),
        phone: values.mobilePhone,
        Amount: Math.round(grandTotal),
        address: values.address,
        email: values.email,
        items: itemsString,
        orderno: orderNo,
        shippingRate: fees.shipping,
        codRate: fees.cod
      };

      // 2. API Submission
      await fetcher('/api/Ordersadd', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      
      // 3. Post-Success Lifecycle
      clearCart();
      window.location.href = '/success';
    } catch (error) {
      console.error('Order failed:', error);
      alert('Order submission failed. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-emerald-900/10 border-t-emerald-900 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen selection:bg-emerald-100">
      <header className="border-b border-neutral-100 py-6 px-10 flex items-center justify-between sticky top-0 bg-white z-50">
        <h1 className="text-2xl font-black tracking-tighter hover:opacity-70 transition-opacity cursor-pointer" onClick={() => window.location.href = '/'}>
          LIYONTA
        </h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-neutral-900" />
            <span className="absolute -top-1 -right-1 bg-emerald-900 text-white text-[8px] rounded-full px-1">
              {items.length}
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-16 px-6 lg:px-10">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-20">
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
                    : 'bg-emerald-900 text-white hover:shadow-2xl hover:shadow-emerald-900/30 active:scale-95'
                }`}
              >
                {isSubmitting ? 'Processing...' : 'Place Order Now'}
              </button>
            </div>
          </div>

          <div className="hidden lg:block">
            <OrderSummarySticky />
          </div>
        </form>
      </main>
    </div>
  );
}

export default function CheckoutPage() {
  return <CheckoutPageContent />;
}
