'use client';

import React, { useState, useMemo } from 'react';
import { useCartHydration } from '../hooks/useCartHydration';
import { useCartStore } from '../store/useCartStore';
import { ContactSection, DeliverySection, PaymentSection } from './components/FormSections';
import { OrderSummarySticky } from './components/OrderSummarySticky';
import { fetcher } from '../lib/api';
import { useSimpleForm } from '../hooks/useSimpleForm';

/**
 * REFACTORED PIXEL-PERFECT CHECKOUT
 * Implements the O(1) performance requirement and exact visual specifications.
 * Background: #fafafa
 * Layout: grid-cols-[1.2fr_1fr]
 */
function CheckoutPageContent() {
  const { items, cartTotal, isHydrated } = useCartHydration();
  const clearCart = useCartStore((state) => state.clearCart);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Custom hook mimicking react-hook-form API for zero-config integration
  const { register, values, setValue, watch, isValid } = useSimpleForm({
    mobilePhone: '',
    wantsNews: false,
    fullName: '',
    email: '',
    address: '',
    saveInfo: false,
    paymentMethod: 'COD'
  });

  // Calculate grand total including service fee
  const grandTotal = useMemo(() => cartTotal + 50, [cartTotal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || isSubmitting) return;

    setIsSubmitting(true);
    
    try {
      /**
       * PAYLOAD CONSTRUCTION
       * Matches the strict backend requirement for items string:
       * "ProductName - Qty(Price), ProductName - Qty(Price)"
       */
      const itemsString = items
        .map(i => `${i.productname} - ${i.quantity}(${i.productprice})`)
        .join(', ');
      
      const now = new Date();
      const orderNo = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${Math.floor(1000 + Math.random() * 9000)}`;

      const payload = {
        fullname: values.fullName,
        date: now.toLocaleDateString('en-GB'),
        time: now.toLocaleTimeString('en-GB'),
        phone: values.mobilePhone,
        Amount: Math.round(grandTotal),
        address: values.address,
        email: values.email,
        items: itemsString,
        orderno: orderNo,
        shippingRate: 0,
        codRate: 0
      };

      // POST Request to existing API
      await fetcher('/api/Ordersadd', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      
      // Clear persistent store and navigate
      clearCart();
      window.location.href = '/success';
    } catch (error) {
      console.error('Submission failed:', error);
      alert('Order submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-gray-200 border-t-[#2c4c4e] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-[#fafafa] min-h-screen pt-10 pb-20">
      <main className="max-w-6xl mx-auto px-6">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16">
          
          {/* Left Column: Forms */}
          <div className="space-y-4">
            {/* Header / Logo */}
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-8 cursor-pointer" onClick={() => window.location.href = '/'}>
              LIYONTA
            </h1>

            <ContactSection register={register} />
            <DeliverySection register={register} />
            <PaymentSection watch={watch} setValue={setValue} />
            
            {/* Action Button */}
            <div className="pt-8">
              <button
                type="submit"
                disabled={isSubmitting || !isValid}
                className={`w-full py-4 rounded-lg font-medium text-white transition-all transform active:scale-[0.98] ${
                  isSubmitting || !isValid
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-[#2c4c4e] hover:bg-[#1a3335] shadow-lg shadow-[#2c4c4e]/10'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processing</span>
                  </div>
                ) : 'Pay Now'}
              </button>
            </div>
            
            {/* Policy Footer */}
            <div className="pt-12 border-t border-gray-200 flex gap-4 text-[10px] text-gray-500 uppercase tracking-widest">
              <span className="hover:text-gray-900 cursor-pointer">Refund policy</span>
              <span className="hover:text-gray-900 cursor-pointer">Shipping policy</span>
              <span className="hover:text-gray-900 cursor-pointer">Privacy policy</span>
              <span className="hover:text-gray-900 cursor-pointer">Terms of service</span>
            </div>
          </div>

          {/* Right Column: Sticky Summary */}
          <OrderSummarySticky />
        </form>
      </main>
    </div>
  );
}

export default function CheckoutPage() {
  return <CheckoutPageContent />;
}
