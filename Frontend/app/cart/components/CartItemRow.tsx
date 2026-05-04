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
        <div className="flex flex-col gap-1">
          <span className="font-bold text-neutral-900">{item.productname}</span>
          <button 
            onClick={() => dispatch({ type: 'REMOVE', payload: item.id })}
            className="text-xs text-neutral-400 hover:text-neutral-900 transition-colors w-fit underline decoration-neutral-200"
          >
            Remove
          </button>
        </div>
      </td>
      <td className="py-6">
        <div className="flex items-center bg-white border border-neutral-200 rounded-lg overflow-hidden w-fit">
          <button 
            onClick={() => dispatch({ type: 'DECREMENT', payload: item.id })}
            className="px-3 py-2 hover:bg-neutral-50 transition-colors border-r border-neutral-200 font-medium"
          >
            -
          </button>
          <span className="w-10 text-center font-bold tabular-nums text-sm">{item.quantity}</span>
          <button 
            onClick={() => dispatch({ type: 'INCREMENT', payload: item.id })}
            className="px-3 py-2 hover:bg-neutral-50 transition-colors border-l border-neutral-200 font-medium"
          >
            +
          </button>
        </div>
      </td>
      <td className="py-6 font-medium text-neutral-600">Rs. {item.price.toFixed(2)}</td>
      <td className="py-6 text-right">
        <span className="font-bold text-neutral-900">Rs. {(item.price * item.quantity).toFixed(2)}</span>
      </td>
    </tr>
  );
});

CartItemRow.displayName = 'CartItemRow';

export default CartItemRow;
