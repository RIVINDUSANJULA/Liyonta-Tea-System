'use client';

import React from 'react';
import Link from 'next/link';
import { useProduct } from '../hooks/useCatalog';
import ProductImage from './pdp/ProductImage';
import ProductInfo from './pdp/ProductInfo';
import Navbar from './Navbar';
import CartDrawer from './CartDrawer';

interface ProductDetailClientProps {
  id: number;
}

/**
 * LOADING SKELETON:
 * Giant square on the left, multiple bars on the right.
 * Prevents Cumulative Layout Shift (CLS) by reserving space before data arrives.
 */
const PDPSkeleton = () => (
  <div className="max-w-7xl mx-auto px-6 pt-32 animate-pulse">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Giant square on the left */}
      <div className="bg-gray-100 rounded-[2rem] aspect-square shadow-sm" />
      
      {/* Shimmering text bars on the right */}
      <div className="space-y-8 pt-8">
        <div className="h-12 bg-gray-100 rounded w-3/4" />
        <div className="h-4 bg-gray-50 rounded w-full" />
        <div className="h-4 bg-gray-50 rounded w-full" />
        <div className="h-4 bg-gray-50 rounded w-2/3" />
        <div className="h-10 bg-gray-100 rounded w-1/3 mt-12" />
        <div className="h-14 bg-gray-100 rounded-full w-full mt-12" />
      </div>
    </div>
  </div>
);

const ProductDetailClient: React.FC<ProductDetailClientProps> = ({ id }) => {
  const { product, isLoading, isError } = useProduct(id);

  if (isLoading) return (
    <main className="min-h-screen bg-[#f8f9fa]">
      <Navbar />
      <PDPSkeleton />
    </main>
  );

  if (isError || !product) {
    return (
      <main className="min-h-screen bg-[#f8f9fa]">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 pt-48 flex items-center justify-center">
          <div className="text-center bg-white p-12 rounded-[2rem] shadow-sm max-w-md">
            <h2 className="text-3xl font-serif mb-4 text-black">Product not found</h2>
            <p className="text-gray-500 mb-8">The tea you are looking for may have been retired from our collection.</p>
            <Link 
              href="/"
              className="bg-[#468241] text-white font-bold px-8 py-4 rounded-full hover:bg-[#3a6b36] transition-colors"
            >
              Back to Shop
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f9fa] pb-20">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 pt-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left Column - Isolated Image */}
          <div className="md:sticky md:top-32">
            <ProductImage imageUrl={product.url} alt={product.productname} />
          </div>

          {/* Right Column - Isolated Info Components */}
          <ProductInfo product={product} />
        </div>
      </div>

      <CartDrawer />
      
      {/* Dynamic background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-50 rounded-full blur-[120px]" />
      </div>
    </main>
  );
};

export default ProductDetailClient;
