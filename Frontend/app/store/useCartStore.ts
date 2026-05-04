import { useState, useEffect } from 'react';
import { Product } from '../hooks/useCatalog';

// Simplified Zustand-like store implementation for restricted environments
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
  isCartOpen: boolean;
  
  // Actions
  addToCart: (product: Product, quantity?: number) => void;
  incrementQty: (id: number) => void;
  decrementQty: (id: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  
  // UI State Actions
  openCart: () => void;
  closeCart: () => void;
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

/**
 * UNIFIED CART STORE
 * Manages both the cart items (Data) and the drawer visibility (UI).
 * Merging these allows for "Atomic Updates" (e.g., adding an item and opening the cart in one render).
 */
export const useCartStore = createStore<CartStore>((set) => ({
  items: [],
  isCartOpen: false,

  addToCart: (product: Product, quantity: number = 1) => set((state: CartStore) => {
    const existingItem = state.items.find((item: CartItem) => item.id === product.id);
    
    // ATOMIC UPDATE: We update the items array AND open the cart in the same state change.
    // This ensures React only performs a single render cycle for both actions.
    if (existingItem) {
      return {
        isCartOpen: true,
        items: state.items.map((item: CartItem) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        ),
      };
    }
    
    return { 
      isCartOpen: true,
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

  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
}));
