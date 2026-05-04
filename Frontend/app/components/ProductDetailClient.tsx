'use client';

import React from 'react';
import { useProduct } from '../hooks/useCatalog';
import ProductImage from './pdp/ProductImage';
import ProductHeader from './pdp/ProductHeader';
import ProductPrice from './pdp/ProductPrice';
import ProductActions from './pdp/ProductActions';
import Navbar from './Navbar';
import CartDrawer from './CartDrawer';

interface ProductDetailClientProps {
  id: number;
}

const PDPSkeleton = () => (
  <div className="max-w-7xl mx-auto px-6 pt-32 animate-pulse">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="bg-white rounded-[2rem] h-[500px] shadow-sm" />
      <div className="space-y-8 pt-8">
        <div className="h-12 bg-gray-100 rounded w-3/4" />
        <div className="h-20 bg-gray-50 rounded w-full" />
        <div className="h-10 bg-gray-100 rounded w-1/3" />
        <div className="h-40 bg-gray-50 rounded-3xl w-full" />
      </div>
    </div>
  </div>
);

const ProductDetailClient: React.FC<ProductDetailClientProps> = ({ id }) => {
  const { product, isLoading, isError } = useProduct(id);

  if (isLoading) return <PDPSkeleton />;

  if (isError || !product) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif mb-4">Product Not Found</h2>
          <p className="text-gray-500">The product you are looking for does not exist or has been removed.</p>
          <button 
            onClick={() => window.history.back()}
            className="mt-6 text-[#468241] font-bold underline"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f9fa] pb-20">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 pt-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left Column */}
          <div className="sticky top-32">
            <ProductImage url={product.url} name={product.productname} />
          </div>

          {/* Right Column */}
          <div className="pt-4 md:pt-12">
            <ProductHeader 
              name={product.productname} 
              description={product.description || "Premium Liyonta Tea, sourced from the finest gardens."} 
            />
            <ProductPrice price={product.productprice} />
            <ProductActions product={product} />
            
            {/* Additional Info Section */}
            <div className="mt-12 pt-8 border-t border-gray-100">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Details</h3>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• Authentic Ceylon Origin</li>
                <li>• Hand-picked for excellence</li>
                <li>• Weight: {product.Weight || 'N/A'}g</li>
                <li>• Stock: {product.productstock > 0 ? 'In Stock' : 'Out of Stock'}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <CartDrawer />
    </main>
  );
};

export default ProductDetailClient;
