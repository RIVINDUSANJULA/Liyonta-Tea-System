'use client';

import React, { createContext, useContext, useReducer, useMemo, useCallback } from 'react';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  popularity: number;
}

export interface CartItem extends Product {
  quantity: number;
}

interface State {
  products: Product[];
  cart: CartItem[];
  isCartOpen: boolean;
  searchQuery: string;
  sortBy: string;
}

type Action =
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; delta: number } }
  | { type: 'TOGGLE_CART' }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_SORT_BY'; payload: string };

const initialState: State = {
  products: [],
  cart: [],
  isCartOpen: false,
  searchQuery: '',
  sortBy: 'popularity',
};

function storeReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'ADD_TO_CART': {
      const existing = state.cart.find((item) => item.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      }
      return { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }] };
    }
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter((item) => item.id !== action.payload) };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(0, item.quantity + action.payload.delta) }
            : item
        ).filter(item => item.quantity > 0),
      };
    case 'TOGGLE_CART':
      return { ...state, isCartOpen: !state.isCartOpen };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'SET_SORT_BY':
      return { ...state, sortBy: action.payload };
    default:
      return state;
  }
}

const StateContext = createContext<State | undefined>(undefined);
const DispatchContext = createContext<React.Dispatch<Action> | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

// Custom hooks for granular access
export function useStoreState() {
  const context = useContext(StateContext);
  if (!context) throw new Error('useStoreState must be used within a StoreProvider');
  return context;
}

export function useStoreDispatch() {
  const context = useContext(DispatchContext);
  if (!context) throw new Error('useStoreDispatch must be used within a StoreProvider');
  return context;
}

// Selectors for performance
export function useCartCount() {
  const { cart } = useStoreState();
  return useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
}

export function useCartTotal() {
  const { cart } = useStoreState();
  return useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);
}

export function useFilteredProducts() {
  const { products, searchQuery, sortBy } = useStoreState();
  
  return useMemo(() => {
    let filtered = products.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'popularity') {
      filtered.sort((a, b) => b.popularity - a.popularity);
    }

    return filtered;
  }, [products, searchQuery, sortBy]);
}
