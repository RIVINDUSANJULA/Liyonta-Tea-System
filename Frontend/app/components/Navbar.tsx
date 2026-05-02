'use client';

import React from 'react';
import { ShoppingCart } from './Icons';
import { useStoreDispatch, useCartCount } from '../store/TeaStore';

const CartBadge = React.memo(() => {
  const count = useCartCount();
  const dispatch = useStoreDispatch();
  
  return (
    <div className="relative cursor-pointer p-2 hover:bg-neutral-100 rounded-full transition-colors"
         onClick={() => dispatch({ type: 'TOGGLE_CART' })}>
      <ShoppingCart className="w-6 h-6 text-neutral-800" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-in zoom-in duration-300">
          {count}
        </span>
      )}
    </div>
  );
});

CartBadge.displayName = 'CartBadge';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-neutral-200 z-50 px-6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-xl">L</span>
        </div>
        <span className="font-bold text-xl tracking-tight text-neutral-900">LIYONTA</span>
      </div>
      
      <CartBadge />
    </nav>
  );
}
