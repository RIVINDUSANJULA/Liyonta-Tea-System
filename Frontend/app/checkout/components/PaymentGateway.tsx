'use client';

import React, { useState, useEffect } from 'react';
import { useCheckoutDispatch } from '../../store/CheckoutStore';
import { Check } from '../../components/Icons';

export default function PaymentGateway() {
  const dispatch = useCheckoutDispatch();
  const [isReady, setIsReady] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Simulate loading external script
    const timer = setTimeout(() => setIsReady(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const simulateValidation = () => {
    setIsValidating(true);
    setTimeout(() => {
      setIsValidating(false);
      setIsSuccess(true);
      dispatch({ type: 'SET_PAYMENT_VALID', payload: true });
    }, 1500);
  };

  return (
    <section className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100 mt-8 animate-in slide-in-from-bottom-4 duration-500 delay-200">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <span className="w-8 h-8 bg-neutral-900 text-white rounded-full flex items-center justify-center text-sm">3</span>
        Payment Details
      </h2>
      
      {!isReady ? (
        <div className="h-40 bg-neutral-50 rounded-xl animate-pulse flex items-center justify-center text-neutral-400">
          Loading secure payment gateway...
        </div>
      ) : (
        <div className="border border-neutral-200 rounded-xl p-6 bg-neutral-50/30">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-bold text-neutral-500 uppercase tracking-widest">Mock Payment Element</span>
            <div className="flex gap-2">
              <div className="w-8 h-5 bg-neutral-200 rounded" />
              <div className="w-8 h-5 bg-neutral-200 rounded" />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="h-12 bg-white border border-neutral-200 rounded-lg px-4 flex items-center text-neutral-300">
              •••• •••• •••• ••••
            </div>
            
            {!isSuccess ? (
              <button
                type="button"
                onClick={simulateValidation}
                disabled={isValidating}
                className="w-full py-3 bg-neutral-900 text-white rounded-xl font-bold hover:bg-neutral-800 transition-all flex items-center justify-center gap-2"
              >
                {isValidating ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : 'Validate Payment Method'}
              </button>
            ) : (
              <div className="flex items-center justify-center gap-2 text-emerald-600 font-bold py-3 bg-emerald-50 rounded-xl animate-in zoom-in duration-300">
                <Check className="w-5 h-5" />
                Payment Method Verified
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
