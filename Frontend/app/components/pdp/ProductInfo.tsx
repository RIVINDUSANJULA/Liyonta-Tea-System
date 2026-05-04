'use client';

import React from 'react';
import { Product } from '../../hooks/useCatalog';
import ProductHeader from './ProductHeader';
import ProductPrice from './ProductPrice';
import ProductActions from './ProductActions';

interface ProductInfoProps {
  product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  return (
    <div className="pt-4 md:pt-12">
      <ProductHeader 
        productname={product.productname} 
        maindescription={product.maindescription} 
      />
      <ProductPrice price={product.productprice} />
      <ProductActions product={product} />
      
      {/* Detail list remains stable */}
      <div className="mt-12 pt-8 border-t border-gray-100">
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Product Specifications</h3>
        <ul className="text-sm text-gray-500 space-y-2">
          <li>• Weight: {product.Weight}g</li>
          <li>• Origin: Pure Ceylon Heritage</li>
          <li>• Availability: {product.productstock > 0 ? 'In Stock' : 'Out of Stock'}</li>
        </ul>
      </div>
    </div>
  );
};

export default ProductInfo;
