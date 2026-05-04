'use client';

import React from 'react';
import Link from 'next/link';
import { useCartStore } from '../store/useCartStore';
import { Product } from '../hooks/useProducts';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addToCart = useCartStore((state: any) => state.addToCart);

  const handleBuyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link href={`/product/${product.id}`} className="block group">
      <div className="flex flex-col">
        {/* Image Container */}
        <div className="bg-white rounded-[2rem] p-6 mb-4 shadow-sm flex justify-center items-center h-64 transition-shadow group-hover:shadow-md">
          <img 
            src={product.url} 
            alt={product.productname} 
            className="max-h-full max-w-full object-contain"
          />
        </div>

        {/* Title */}
        <h3 className="font-bold text-black uppercase text-lg mb-1 truncate">
          {product.productname}
        </h3>

        {/* Subtitle/Description */}
        <p className="text-xs text-gray-500 uppercase line-clamp-3 mb-6 leading-relaxed h-12">
          {product.description}
        </p>

        {/* Bottom Row */}
        <div className="flex justify-between items-center">
          <span className="text-[#d13239] font-bold text-lg">
            LKR {product.productprice.toFixed(2)}
          </span>
          <button
            onClick={handleBuyClick}
            className="bg-[#468241] hover:bg-[#3a6b36] text-white rounded-full px-8 py-2 text-sm font-bold transition-colors"
          >
            BUY
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
