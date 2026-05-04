import { useState, useEffect, useCallback } from 'react';
import { Product } from '../hooks/useProducts';

// Simplified Zustand-like store implementation to handle environments without internet access
type StateSelector<T, U> = (state: T) => U;

export interface CartItem {
  id: number;
  productname: string;
  productprice: number;
  quantity: number;
  url: string;
  Weight: number;
  description: string;
}

interface CartStore {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  incrementQty: (id: number) => void;
  decrementQty: (id: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
}

const createStore = <T>(config: (set: (partial: Partial<T> | ((state: T) => Partial<T>)) => void, get: () => T) => T) => {
  let state: T;
  const listeners = new Set<(state: T, prevState: T) => void>();

  const setState = (partial: Partial<T> | ((state: T) => Partial<T>)) => {
    const nextState = typeof partial === 'function' ? (partial as Function)(state) : partial;
    if (nextState !== state) {
      const previousState = state;
      state = { ...state, ...nextState };
      listeners.forEach((listener) => listener(state, previousState));
    }
  };

  const getState = () => state;
  state = config(setState, getState);

  const useStore = <U>(selector: StateSelector<T, U> = (s: T) => s as any): U => {
    const [, forceUpdate] = useState(0);

    useEffect(() => {
      const listener = () => forceUpdate((c) => c + 1);
      listeners.add(listener);
      return () => { listeners.delete(listener); };
    }, []);

    return selector(state);
  };

  return useStore;
};

export const useCartStore = createStore<CartStore>((set: (partial: Partial<CartStore> | ((state: CartStore) => Partial<CartStore>)) => void) => ({
  items: [],
  addToCart: (product: Product, quantity: number = 1) => set((state: CartStore) => {
    const existingItem = state.items.find((item: CartItem) => item.id === product.id);
    if (existingItem) {
      return {
        items: state.items.map((item: CartItem) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        ),
      };
    }
    return { 
      items: [...state.items, { 
        id: product.id,
        productname: product.productname,
        productprice: product.productprice,
        quantity: quantity,
        url: product.url,
        Weight: product.Weight,
        description: product.description
      }] 
    };
  }),
  incrementQty: (id: number) => set((state: CartStore) => ({
    items: state.items.map((item: CartItem) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ),
  })),
  decrementQty: (id: number) => set((state: CartStore) => ({
    items: state.items.map((item: CartItem) =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ),
  })),
  removeItem: (id: number) => set((state: CartStore) => ({
    items: state.items.filter((item: CartItem) => item.id !== id),
  })),
  clearCart: () => set({ items: [] }),
}));
