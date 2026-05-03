'use client';

import React from 'react';
import { Minus, Plus, Trash2 } from '../../components/Icons';
import { CartItem, useCart } from '../../store/CartStore';

const CartItemRow = React.memo(({ item }: { item: CartItem }) => {
  const { dispatch } = useCart();

  return (
    <tr className="border-b border-neutral-100 hover:bg-neutral-50/50 transition-colors group">
      <td className="py-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-neutral-100 overflow-hidden flex-shrink-0">
            <img src={item.url} alt={item.productname} className="w-full h-full object-cover" />
          </div>
          <span className="font-semibold text-neutral-900">{item.productname}</span>
        </div>
      </td>
      <td className="py-6">
        <div className="flex items-center gap-3 bg-white border border-neutral-200 rounded-lg w-fit px-2 py-1">
          <button 
            onClick={() => dispatch({ type: 'DECREMENT', payload: item.id })}
            className="p-1 hover:text-emerald-600 transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-8 text-center font-bold tabular-nums">{item.quantity}</span>
          <button 
            onClick={() => dispatch({ type: 'INCREMENT', payload: item.id })}
            className="p-1 hover:text-emerald-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </td>
      <td className="py-6 font-medium text-neutral-600">Rs. {item.price.toLocaleString()}</td>
      <td className="py-6">
        <div className="flex items-center justify-between">
          <span className="font-bold text-neutral-900">Rs. {(item.price * item.quantity).toLocaleString()}</span>
          <button 
            onClick={() => dispatch({ type: 'REMOVE', payload: item.id })}
            className="opacity-0 group-hover:opacity-100 p-2 text-neutral-300 hover:text-rose-500 transition-all"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </td>
    </tr>
  );
});

CartItemRow.displayName = 'CartItemRow';

export default CartItemRow;
