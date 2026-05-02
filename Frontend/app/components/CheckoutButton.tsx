'use client';

import React from 'react';
import { useSubmitOrder } from '../hooks/useSubmitOrder';
import { useStoreState, useStoreDispatch } from '../store/TeaStore';
import { useCheckoutState } from '../store/CheckoutStore';

export default function CheckoutButton() {
  const { cart } = useStoreState();
  const { shippingAddress, shippingMethod } = useCheckoutState();
  const { submitOrder, isSubmitting, error } = useSubmitOrder();
  const dispatch = useStoreDispatch();

  const handlePlaceOrder = async () => {
    const orderData = {
      fullname: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      phone: '0771234567', // Static for now as per backend requirements or prompt context
      Amount: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      address: shippingAddress.address,
      email: shippingAddress.email,
      items: cart.map(i => `${i.name} - ${i.quantity}`).join(', '),
      orderno: `ORD-${Date.now()}`,
      shippingRate: shippingMethod?.price || 0,
      codRate: 0, // Logic for COD vs Card would go here
    };

    const result = await submitOrder(orderData);
    
    if (result.success) {
      // Clear cart and redirect
      dispatch({ type: 'SET_PRODUCTS', payload: [] }); // Or a dedicated CLEAR_CART action
      alert('Order Placed Successfully!');
      window.location.href = '/';
    }
  };

  return (
    <div className="space-y-2">
      <button
        onClick={handlePlaceOrder}
        disabled={isSubmitting || cart.length === 0}
        className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${
          isSubmitting 
            ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed' 
            : 'bg-emerald-600 text-white hover:bg-emerald-700 active:scale-[0.98]'
        }`}
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Processing...</span>
          </div>
        ) : (
          'Place Order'
        )}
      </button>
      {error && <p className="text-xs text-rose-500 text-center">{error}</p>}
    </div>
  );
}
