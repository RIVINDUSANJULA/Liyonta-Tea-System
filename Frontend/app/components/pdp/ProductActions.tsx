'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '../../hooks/useCatalog';
import { useCartStore } from '../../store/useCartStore';
import { Minus, Plus } from '../Icons';

interface ProductActionsProps {
  product: Product;
}

const ProductActions: React.FC<ProductActionsProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const addToCart = useCartStore((state: any) => state.addToCart);

  const handleIncrement = () => setQuantity((q) => q + 1);
  const handleDecrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/cart');
  };

  return (
    <div className="space-y-6">
      {/* Quantity Selector */}
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
          className="bg-[#385b3b] hover:bg-[#2d4a30] text-white font-bold py-4 rounded-full transition-all duration-300 transform active:scale-95 shadow-lg"
        >
          BUY IT NOW
        </button>
      </div>
    </div>
  );
};

export default ProductActions;
