'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useProducts } from '../../hooks/useProducts';
import ProductDetail from '../../components/ProductDetail';
import Navbar from '../../components/Navbar';

export default function ProductPage() {
  const params = useParams();
  const id = params.id as string;
  const { products, isLoading, isError } = useProducts();

  const product = products.find((p) => p.id === parseInt(id));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8f9fa]">
        <Navbar />
        <div className="max-w-7xl mx-auto py-20 px-6">
          <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white rounded-[2rem] h-[500px]" />
            <div className="space-y-6">
              <div className="h-10 bg-gray-200 rounded w-3/4" />
              <div className="h-32 bg-gray-200 rounded w-full" />
              <div className="h-12 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen bg-[#f8f9fa]">
        <Navbar />
        <div className="max-w-7xl mx-auto py-20 px-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Product not found</h1>
          <p className="text-gray-500 mt-2">The product you are looking for does not exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <ProductDetail product={product} />
      </div>
    </div>
  );
}
