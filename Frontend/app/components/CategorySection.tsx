'use client';

import React from 'react';
import { useCategoryProducts } from '../hooks/useCatalog';
import ProductCard from './ProductCard';

interface CategorySectionProps {
  categoryId: number;
  categoryName: string;
}

const ProductSkeleton = () => (
  <div className="bg-white rounded-[2rem] p-6 shadow-sm flex flex-col h-full animate-pulse">
    <div className="flex-1 bg-gray-100 rounded-xl mb-6 min-h-[12rem]" />
    <div className="h-4 bg-gray-100 rounded w-3/4 mb-4" />
    <div className="flex justify-between items-center">
      <div className="h-6 bg-gray-100 rounded w-1/3" />
      <div className="h-8 bg-gray-100 rounded-full w-1/4" />
    </div>
  </div>
);

const CategorySection: React.FC<CategorySectionProps> = ({ categoryId, categoryName }) => {
  const { products, isLoading, isError } = useCategoryProducts(categoryId);

  if (isError) return null; // Or show a small error message

  return (
    <section className="mb-16">
      <h2 className="font-serif text-3xl text-black mb-6 border-b pb-2">
        {categoryName}
      </h2>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="text-gray-400 italic">No products found in this category.</p>
          )}
        </div>
      )}
    </section>
  );
};

export default CategorySection;
