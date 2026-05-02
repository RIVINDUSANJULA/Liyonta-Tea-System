'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Plus, Check } from './Icons';
import { useStoreDispatch, useStoreState, Product as StoreProduct } from '../store/TeaStore';
import { useProducts, Product as APIProduct } from '../hooks/useProducts';

const SkeletonCard = () => (
  <div className="bg-white border border-neutral-100 rounded-2xl overflow-hidden shadow-sm animate-pulse">
    <div className="aspect-square bg-neutral-200" />
    <div className="p-5 space-y-3">
      <div className="h-4 bg-neutral-200 rounded w-3/4" />
      <div className="h-6 bg-neutral-200 rounded w-1/4" />
      <div className="h-10 bg-neutral-900/10 rounded-xl w-full" />
    </div>
  </div>
);

const ProductCard = React.memo(({ product }: { product: StoreProduct }) => {
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
  const { products: apiProducts, isLoading, isError } = useProducts();
  const { searchQuery, sortBy } = useStoreState();
  const dispatch = useStoreDispatch();

  // Sync API products with Store
  useEffect(() => {
    if (apiProducts.length > 0) {
      const mappedProducts: StoreProduct[] = apiProducts.map(p => ({
        id: p.id,
        name: p.productname,
        price: p.productprice,
        category: p.category_id.toString(), // Simplified for now
        image: p.url, // Assuming url is just the filename or full path
        popularity: p.productstock, // Using stock as a proxy for popularity
      }));
      dispatch({ type: 'SET_PRODUCTS', payload: mappedProducts });
    }
  }, [apiProducts, dispatch]);

  // Use store products for filtering
  const { products: storeProducts } = useStoreState();
  
  const filteredProducts = React.useMemo(() => {
    let filtered = storeProducts.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'popularity') {
      filtered.sort((a, b) => b.popularity - a.popularity);
    }

    return filtered;
  }, [storeProducts, searchQuery, sortBy]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
        <p className="text-rose-500 font-bold">Unable to load products.</p>
        <p className="text-neutral-400 text-sm">Please check if the backend server is running.</p>
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6">
        <p className="text-neutral-400 text-lg">No products found matching your search.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
