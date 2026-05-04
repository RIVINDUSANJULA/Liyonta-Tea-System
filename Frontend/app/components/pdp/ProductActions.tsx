'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '../../hooks/useCatalog';
import { useCartStore } from '../../store/useCartStore';
import { useStoreDispatch } from '../../store/TeaStore';
import { Minus, Plus } from '../Icons';

interface ProductActionsProps {
  product: Product;
}

/**
 * CRITICAL ISOLATION: 
 * This component manages its own local state for 'quantity'.
 * By keeping the state here, clicking '+' or '-' only triggers a re-render of THIS component.
 * It protects the heavier siblings (ProductImage, ProductHeader) from wasteful re-renders.
 */
const ProductActions: React.FC<ProductActionsProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  
  // Zustand store for global cart management
  const addToCart = useCartStore((state: any) => state.addToCart);
  
  // TeaStore for UI state (toggling the cart drawer)
  const dispatch = useStoreDispatch();

  const handleIncrement = () => setQuantity((q) => q + 1);
  const handleDecrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleAddToCart = () => {
    addToCart(product, quantity);
    // Open the cart drawer to provide immediate feedback
    dispatch({ type: 'TOGGLE_CART' });
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    // Directly navigate to checkout for an ultra-fast purchase flow
    router.push('/checkout');
  };

  return (
    <div className="space-y-6">
      {/* Quantity Selector - Local State Only */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-bold uppercase tracking-wider text-gray-400">Quantity</span>
        <div className="flex items-center bg-gray-50 rounded-full px-4 py-2 border border-gray-100">
          <button 
            onClick={handleDecrement}
            className="p-1 hover:text-[#468241] transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-12 text-center font-bold text-lg">{quantity}</span>
          <button 
            onClick={handleIncrement}
            className="p-1 hover:text-[#468241] transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3">
        <button
          onClick={handleAddToCart}
          className="bg-[#468241] hover:bg-[#3a6b36] text-white font-bold py-4 rounded-full transition-all duration-300 transform active:scale-95 shadow-md"
        >
          ADD TO CART
        </button>
        <button
          onClick={handleBuyNow}
          className="bg-[#385b3b] hover:bg-[#2a452c] text-white font-bold py-4 rounded-full transition-all duration-300 transform active:scale-95 shadow-lg w-full"
        >
          BUY IT NOW
        </button>
      </div>
    </div>
  );
};

export default ProductActions;
