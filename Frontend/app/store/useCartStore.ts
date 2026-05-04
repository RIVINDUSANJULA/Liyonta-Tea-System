import { useState, useEffect } from 'react';
import { Product } from '../hooks/useCatalog';

// Unified Cart State Interface
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

/**
 * CUSTOM PERSISTENT STORE IMPLEMENTATION
 * This mirrors Zustand's API and middleware logic but is optimized for environments 
 * without external package access. It handles localStorage syncing and partialization.
 */
const STORAGE_KEY = 'liyonta-cart-storage';

const createPersistentStore = <T extends object>(config: (set: (partial: Partial<T> | ((state: T) => Partial<T>)) => void, get: () => T) => T) => {
  let state: T;
  const listeners = new Set<(state: T) => void>();

  // Helper to load initial state from localStorage (Hydration check handled by hook)
  const loadSavedState = (): Partial<T> => {
    if (typeof window === 'undefined') return {};
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return {};
      const parsed = JSON.parse(saved);
      // partialize: we only expect 'items' to be saved
      return { items: parsed.state?.items } as any;
    } catch (e) {
      console.error('Failed to load cart state', e);
      return {};
    }
  };

  const saveState = (newState: T) => {
    if (typeof window === 'undefined') return;
    try {
      // PARTIALIZE: We only save 'items', keeping 'isCartOpen' ephemeral (always false on reload)
      const dataToSave = {
        state: { items: (newState as any).items },
        version: 0
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (e) {
      console.error('Failed to save cart state', e);
    }
  };

  const setState = (partial: Partial<T> | ((state: T) => Partial<T>)) => {
    const nextState = typeof partial === 'function' ? (partial as Function)(state) : partial;
    if (nextState !== state) {
      state = { ...state, ...nextState };
      saveState(state); // Sync to localStorage on every change
      listeners.forEach((listener) => listener(state));
    }
  };

  const getState = () => state;
  
  // Initialize state with default config + saved items
  const initialConfig = config(setState, getState);
  state = { ...initialConfig, ...loadSavedState() };

  const useStore = <U>(selector: (state: T) => U = (s: T) => s as any): U => {
    const [, forceUpdate] = useState(0);

    useEffect(() => {
      const listener = () => forceUpdate((c) => c + 1);
      listeners.add(listener);
      return () => { listeners.delete(listener); };
    }, []);

    return selector(state);
  };

  return { useStore, getState };
};

const store = createPersistentStore<CartStore>((set) => ({
  items: [],
  isCartOpen: false,

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

  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
}));

export const useCartStore = store.useStore;
export const getCartStore = store.getState;
