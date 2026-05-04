'use client';

import React from 'react';
import Link from 'next/link';
import { X, Plus, Minus, Trash2, ShoppingBag } from './Icons';
import { useStoreState, useStoreDispatch } from '../store/TeaStore';
import { useCartStore } from '../store/useCartStore';
import ShippingCalculator from './ShippingCalculator';

const CartItem = React.memo(({ item }: { item: any }) => {
  const { incrementQty, decrementQty, removeItem } = useCartStore();

  return (
    <div className="flex items-center gap-4 p-4 border-b border-neutral-100 group animate-in slide-in-from-right-4 duration-300">
      <div className="w-20 h-20 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0">
        <img src={item.url} alt={item.productname} className="w-full h-full object-cover" />
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-neutral-900 truncate">{item.productname}</h4>
        <p className="text-emerald-700 font-bold">Rs. {item.productprice.toFixed(2)}</p>
        
        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center border border-neutral-200 rounded-lg bg-neutral-50 overflow-hidden">
            <button 
              onClick={() => decrementQty(item.id)}
              className="p-1 hover:bg-neutral-200 transition-colors"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
            <button 
              onClick={() => incrementQty(item.id)}
              className="p-1 hover:bg-neutral-200 transition-colors"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
          <button 
            onClick={() => removeItem(item.id)}
            className="text-neutral-400 hover:text-rose-500 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
});

CartItem.displayName = 'CartItem';

const CartTotal = React.memo(() => {
  const items = useCartStore((state: any) => state.items);
  const subtotal = items.reduce((acc: number, item: any) => acc + item.productprice * item.quantity, 0);
  const totalWeight = items.reduce((acc: number, item: any) => acc + (item.Weight || 0) * item.quantity, 0);
  
  return (
    <div className="p-6 bg-white border-t border-neutral-200">
      <div className="space-y-1 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-neutral-500 font-medium">Subtotal</span>
          <span className="text-xl font-bold text-neutral-900">Rs. {subtotal.toFixed(2)}</span>
        </div>
        <ShippingCalculator weight={totalWeight} />
      </div>
      <Link href="/checkout" className="block">
        <button className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 active:scale-[0.98]">
          Checkout Now
        </button>
      </Link>
    </div>
  );
});

CartTotal.displayName = 'CartTotal';

export default function CartDrawer() {
  const { isCartOpen } = useStoreState();
  const dispatch = useStoreDispatch();
  const items = useCartStore((state: any) => state.items);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => dispatch({ type: 'TOGGLE_CART' })}
      />

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl transition-transform duration-500 ease-out flex flex-col ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 flex items-center justify-between border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-emerald-600" />
            <h2 className="text-xl font-bold text-neutral-900">Your Cart</h2>
          </div>
          <button 
            onClick={() => dispatch({ type: 'TOGGLE_CART' })}
            className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-neutral-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center p-10 text-center">
              <div className="w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="w-10 h-10 text-neutral-200" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-1">Your cart is empty</h3>
              <p className="text-neutral-400 text-sm">Looks like you haven't added any premium teas yet.</p>
              <button 
                onClick={() => dispatch({ type: 'TOGGLE_CART' })}
                className="mt-6 text-emerald-600 font-bold hover:underline"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div>
              {items.map((item: any) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && <CartTotal />}
      </div>
    </>
  );
}
