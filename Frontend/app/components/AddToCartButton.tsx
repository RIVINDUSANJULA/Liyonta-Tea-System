'use client';

import React from 'react';
import { useCartStore } from '../store/useCartStore';
import { Product } from '../hooks/useCatalog';

interface AddToCartButtonProps {
  product: Product;
  className?: string;
  label?: string;
}

/**
 * HIGHLY ISOLATED ACTION TRIGGER:
 * This component is designed to never re-render when the cart opens or when items change.
 * By subscribing ONLY to the 'addToCart' action (and not 'items' or 'isCartOpen'),
 * we ensure that adding an item triggers the drawer animation instantly without 
 * re-rendering the button itself.
 */
const AddToCartButton: React.FC<AddToCartButtonProps> = ({ 
  product, 
  className = "bg-[#468241] hover:bg-[#3a6b36] text-white rounded-full px-6 py-2 text-xs font-bold transition-colors shadow-sm active:scale-95 transform duration-200",
  label = "BUY"
}) => {
  // We grab ONLY the action from the store. 
  // Since the action reference is stable, this component will never re-render
  // unless its 'product' prop changes.
  const addToCart = useCartStore((state) => state.addToCart);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // This single call adds the item and sets isCartOpen: true atomically.
    addToCart(product);
  };

  return (
    <button
      onClick={handleClick}
      className={className}
    >
      {label}
    </button>
  );
};

export default AddToCartButton;
