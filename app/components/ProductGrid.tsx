'use client';

import React, { useState, useCallback } from 'react';
import { Plus, Check } from './Icons';
import { useStoreDispatch, useFilteredProducts, Product } from '../store/TeaStore';

const ProductCard = React.memo(({ product }: { product: Product }) => {
  const [added, setAdded] = useState(false);
  const dispatch = useStoreDispatch();

  const handleAdd = useCallback(() => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }, [dispatch, product]);

  return (
    <div className="group bg-white border border-neutral-200 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-emerald-900/5 hover:-translate-y-1 transition-all duration-300">
      <div className="relative aspect-square overflow-hidden bg-neutral-100">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider text-neutral-600 px-2 py-1 rounded-md border border-neutral-200">
            {product.category}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-semibold text-neutral-900 line-clamp-1">{product.name}</h3>
        </div>
        <p className="text-emerald-700 font-bold text-lg mb-4">${product.price.toFixed(2)}</p>
        
        <button
          onClick={handleAdd}
          className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
            added 
              ? 'bg-emerald-100 text-emerald-700' 
              : 'bg-neutral-900 text-white hover:bg-neutral-800'
          }`}
        >
          {added ? (
            <>
              <Check className="w-4 h-4 animate-in zoom-in duration-300" />
              <span>Added</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default function ProductGrid() {
  const products = useFilteredProducts();

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6">
        <p className="text-neutral-400 text-lg">No products found matching your search.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
