'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '../hooks/useCatalog';
import AddToCartButton from './AddToCartButton';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = React.memo(({ product }) => {
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
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </Link>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
