import { create } from 'zustand';

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
  addToCart: (product) => set((state) => {
    const existingItem = state.items.find((item) => item.id === product.id);
    if (existingItem) {
      return {
        items: state.items.map((item) =>
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
  incrementQty: (id) => set((state) => ({
    items: state.items.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ),
  })),
  decrementQty: (id) => set((state) => ({
    items: state.items.map((item) =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ),
  })),
  removeItem: (id) => set((state) => ({
    items: state.items.filter((item) => item.id !== id),
  })),
  clearCart: () => set({ items: [] }),
}));
