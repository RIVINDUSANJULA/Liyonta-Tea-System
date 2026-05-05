'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useCartHydration } from '../hooks/useCartHydration';
import { X, ShoppingBag, Trash2, Plus, Minus } from './Icons';

const CartDrawer = () => {
  const router = useRouter();
  const { 
    isHydrated, 
    items, 
    isCartOpen, 
    closeCart, 
    removeItem, 
    incrementQty, 
    decrementQty, 
    cartTotal 
  } = useCartHydration();

  if (!isHydrated && isCartOpen) {
    return (
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[101] shadow-2xl p-6 animate-pulse">
        <div className="h-8 bg-gray-100 rounded w-1/3 mb-12" />
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4">
              <div className="w-20 h-20 bg-gray-100 rounded-2xl" />
              <div className="flex-1 space-y-3">
                <div className="h-4 bg-gray-100 rounded w-3/4" />
                <div className="h-4 bg-gray-50 rounded w-1/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      {/* 60fps Backdrop Overlay - Uses opacity transitions for smoothness */}
      <div 
        className={`fixed inset-0 bg-black/50 z-[100] transition-opacity duration-300 ease-in-out ${
          isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      />

      {/* 60fps Sliding Panel - Uses translate-x for hardware-accelerated animations */}
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[101] shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#468241]" />
              <h2 className="text-xl font-bold font-serif">Your Cart</h2>
            </div>
            <button 
              onClick={closeCart}
              className="p-2 text-gray-400 hover:text-black transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <ShoppingBag className="w-10 h-10 text-gray-300" />
                </div>
                <p className="text-gray-500 font-medium">Your cart is empty</p>
                <button 
                  onClick={closeCart}
                  className="mt-4 text-[#468241] font-bold text-sm hover:underline"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-4 group">
                  <div className="w-20 h-20 bg-gray-50 rounded-2xl flex-shrink-0 flex items-center justify-center p-2">
                    <img src={item.url} alt={item.productname} className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-sm font-bold text-black uppercase truncate">{item.productname}</h3>
                      <button onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-[#d13239] font-bold text-sm mb-3">LKR {item.productprice.toFixed(2)}</p>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center bg-gray-50 rounded-full px-3 py-1 border border-gray-100">
                        <button onClick={() => decrementQty(item.id)} className="p-1 hover:text-[#468241]">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                        <button onClick={() => incrementQty(item.id)} className="p-1 hover:text-[#468241]">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-6 bg-gray-50 space-y-4">
              <div className="flex justify-between items-center text-lg">
                <span className="font-medium text-gray-500">Subtotal</span>
                <span className="font-bold text-black font-serif">LKR {cartTotal.toFixed(2)}</span>
              </div>
              <button 
                onClick={() => {
                  closeCart();
                  router.push('/checkout');
                }}
                className="w-full bg-[#468241] hover:bg-[#3a6b36] text-white font-bold py-4 rounded-full transition-all duration-300 transform active:scale-95 shadow-lg"
              >
                CHECKOUT NOW
              </button>
              <p className="text-[10px] text-center text-gray-400 uppercase tracking-widest">
                Shipping and taxes calculated at checkout
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
