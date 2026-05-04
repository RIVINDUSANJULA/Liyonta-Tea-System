'use client';

import React, { createContext, useContext, useReducer, useEffect, useMemo } from 'react';

export interface CartItem {
  id: number;
  productname: string;
  price: number;
  quantity: number;
  weight: number;
  url: string;
}

interface CartState {
  items: CartItem[];
  shippingFee: number;
  codFee: number;
}

type CartAction =
  | { type: 'SET_ITEMS'; payload: CartItem[] }
  | { type: 'SET_FEES'; payload: { shipping: number; cod: number } }
  | { type: 'INCREMENT'; payload: number }
  | { type: 'DECREMENT'; payload: number }
  | { type: 'REMOVE'; payload: number };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | undefined>(undefined);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'SET_ITEMS':
      return { ...state, items: action.payload };
    case 'SET_FEES':
      return { 
        ...state, 
        shippingFee: action.payload.shipping === -1 ? state.shippingFee : action.payload.shipping, 
        codFee: action.payload.cod === -1 ? state.codFee : action.payload.cod 
      };
    case 'INCREMENT':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    case 'DECREMENT':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    case 'REMOVE':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], shippingFee: 0, codFee: 0 });

  // Persistence
  useEffect(() => {
    const saved = localStorage.getItem('liyonta_cart_state');
    if (saved) {
      const parsed = JSON.parse(saved);
      dispatch({ type: 'SET_ITEMS', payload: parsed.items || [] });
      dispatch({ type: 'SET_FEES', payload: { shipping: parsed.shippingFee || 0, cod: parsed.codFee || 0 } });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('liyonta_cart_state', JSON.stringify(state));
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}

// Selectors
export function useCartTotals() {
  const { state } = useCart();
  return useMemo(() => {
    const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const weight = state.items.reduce((sum, item) => sum + item.weight * item.quantity, 0);
    return { subtotal, weight };
  }, [state.items]);
}
