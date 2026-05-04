'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '../store/useCartStore';
import { Product } from '../hooks/useProducts';
import { Plus, Minus } from './Icons';

interface ProductDetailProps {
  product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, incrementQty } = useCartStore();
  const router = useRouter();

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    // Add logic to handle multiple quantities if your store supports it
    // For now, following the provided requirement to use addToCart or incrementQty
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/checkout');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start px-6 py-12 bg-[#f8f9fa] min-h-screen">
      {/* Left Column (Image) */}
      <div className="bg-white rounded-[2rem] p-12 shadow-sm flex justify-center">
        <img 
          src={product.url} 
          alt={product.productname} 
          className="max-h-[500px] w-auto object-contain"
        />
      </div>

      {/* Right Column (Details & Actions) */}
      <div className="flex flex-col">
        {/* Title */}
        <h1 className="font-serif text-4xl text-black mb-4 leading-tight">
          {product.productname}
        </h1>

        {/* Main Description */}
        <p className="text-gray-500 text-sm leading-relaxed mb-8">
          {product.description}
        </p>

        {/* Price Row */}
        <div className="flex items-center mb-8">
          <span className="text-gray-500 mr-4 text-sm font-medium uppercase tracking-wider">Price</span>
          <span className="text-black text-2xl font-medium">
            LKR {product.productprice.toFixed(2)}
          </span>
        </div>

        {/* Action Row 1 */}
        <div className="flex flex-row gap-4 items-center">
          {/* Quantity Selector */}
          <div className="border border-gray-300 rounded-lg flex items-center justify-between w-32 px-4 py-3 bg-white">
            <button onClick={handleDecrement} className="text-[#468241] font-bold text-xl cursor-pointer focus:outline-none">
              <Minus className="w-5 h-5" />
            </button>
            <span className="text-black font-bold text-lg">{quantity}</span>
            <button onClick={handleIncrement} className="text-[#468241] font-bold text-xl cursor-pointer focus:outline-none">
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button 
            onClick={handleAddToCart}
            className="bg-[#468241] hover:bg-[#3a6b36] text-white rounded-lg px-6 py-3 font-bold flex-1 transition-colors"
          >
            ADD TO CART
          </button>
        </div>

        {/* Action Row 2 (Buy Now) */}
        <button 
          onClick={handleBuyNow}
          className="bg-[#385b3b] hover:bg-[#2a452c] text-white rounded-lg px-6 py-3 font-bold w-full mt-4 transition-colors"
        >
          BUY NOW
        </button>

        {/* Meta Info (Optional but good for UI) */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex gap-4 text-xs text-gray-400 uppercase tracking-widest font-bold">
            <span>Weight: {product.Weight}g</span>
            <span>Category ID: {product.category_id}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
