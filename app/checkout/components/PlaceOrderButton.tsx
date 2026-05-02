'use client';

import React from 'react';
import { useCheckoutState, useCheckoutDispatch, useIsCheckoutValid } from '../../store/CheckoutStore';

export default function PlaceOrderButton() {
  const { isSubmitting } = useCheckoutState();
  const dispatch = useCheckoutDispatch();
  const isValid = useIsCheckoutValid();

  const handlePlaceOrder = () => {
    if (!isValid || isSubmitting) return;

    dispatch({ type: 'SET_SUBMITTING', payload: true });
    
    // Simulate API call
    setTimeout(() => {
      alert('Order placed successfully! Redirecting to confirmation...');
      window.location.href = '/';
    }, 2000);
  };

  return (
    <div className="mt-12">
      <button
        onClick={handlePlaceOrder}
        disabled={!isValid || isSubmitting}
        className={`w-full py-5 rounded-2xl font-black text-xl transition-all duration-300 shadow-xl ${
          isValid && !isSubmitting
            ? 'bg-emerald-600 text-white hover:bg-emerald-700 hover:-translate-y-1 shadow-emerald-600/20 active:scale-[0.98]'
            : 'bg-neutral-200 text-neutral-400 cursor-not-allowed grayscale'
        }`}
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center gap-3">
            <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Processing Order...</span>
          </div>
        ) : (
          'Complete Purchase'
        )}
      </button>
      
      {!isValid && !isSubmitting && (
        <p className="text-center text-xs text-neutral-400 mt-4 animate-pulse">
          Please complete all sections to place your order
        </p>
      )}
    </div>
  );
}
