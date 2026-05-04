'use client';

import { useState, useEffect } from 'react';
import { useCartStore } from '../store/useCartStore';

/**
 * HYDRATION-SAFE CART HOOK
 * 
 * Next.js pre-renders the page on the server where localStorage does not exist.
 * If we render the cart items directly, the Server HTML will show 0 items, 
 * but the Client JS will try to show N items from localStorage, causing a 
 * "Hydration Mismatch" error.
 * 
 * This hook ensures that the component only renders the persistent cart data 
 * AFTER it has successfully mounted on the client.
 */
export function useCartHydration() {
  const [isHydrated, setIsHydrated] = useState(false);
  const items = useCartStore((state) => state.items);
  const isCartOpen = useCartStore((state) => state.isCartOpen);
  const openCart = useCartStore((state) => state.openCart);
  const closeCart = useCartStore((state) => state.closeCart);
  const removeItem = useCartStore((state) => state.removeItem);
  const incrementQty = useCartStore((state) => state.incrementQty);
  const decrementQty = useCartStore((state) => state.decrementQty);

  useEffect(() => {
    // Once this effect runs, we know we are on the client and the store
    // has loaded data from localStorage.
    setIsHydrated(true);
  }, []);

  // Calculate totals safely
  const cartCount = isHydrated ? items.reduce((sum, item) => sum + item.quantity, 0) : 0;
  const cartTotal = isHydrated ? items.reduce((sum, item) => sum + (item.productprice * item.quantity), 0) : 0;

  return {
    isHydrated,
    items: isHydrated ? items : [],
    isCartOpen: isHydrated ? isCartOpen : false,
    openCart,
    closeCart,
    removeItem,
    incrementQty,
    decrementQty,
    cartCount,
    cartTotal
  };
}
