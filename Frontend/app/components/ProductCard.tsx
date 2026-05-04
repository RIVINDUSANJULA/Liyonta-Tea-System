'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '../hooks/useCatalog';
import { useCartStore } from '../store/useCartStore';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = React.memo(({ product }) => {
  const addToCart = useCartStore((state: any) => state.addToCart);

  const handleBuy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link href={`/product/${product.id}`} className="block h-full group">
      <div className="bg-white rounded-[2rem] p-6 shadow-sm flex flex-col justify-between h-full hover:shadow-md transition-shadow duration-300">
        <div className="flex-1 flex items-center justify-center mb-6">
          <img
            src={product.url}
            alt={product.productname}
            className="max-h-48 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        <div>
          <h3 className="font-bold text-black uppercase text-sm mb-4 line-clamp-2">
            {product.productname}
          </h3>
          
          <div className="flex justify-between items-center">
            <span className="text-[#d13239] font-bold text-lg">
              LKR {product.productprice.toFixed(2)}
            </span>
            <button
              onClick={handleBuy}
              className="bg-[#468241] hover:bg-[#3a6b36] text-white rounded-full px-6 py-2 text-xs font-bold transition-colors"
            >
              BUY
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
