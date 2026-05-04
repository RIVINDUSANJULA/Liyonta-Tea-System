import { create } from 'zustand';
import { Product } from '../hooks/useProducts';

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
  addToCart: (product: any) => void;
  incrementQty: (id: number) => void;
  decrementQty: (id: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  addToCart: (product: Product) => set((state: CartStore) => {
    const existingItem = state.items.find((item: CartItem) => item.id === product.id);
    if (existingItem) {
      return {
        items: state.items.map((item: CartItem) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    }
    return { 
      items: [...state.items, { 
        id: product.id,
        productname: product.productname,
        productprice: product.productprice,
        quantity: 1,
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
