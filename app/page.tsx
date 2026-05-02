'use client';

import { useEffect } from 'react';
import Navbar from './components/Navbar';
import FilterBar from './components/FilterBar';
import ProductGrid from './components/ProductGrid';
import CartDrawer from './components/CartDrawer';
import { StoreProvider, useStoreDispatch } from './store/TeaStore';
import { MOCK_PRODUCTS } from './store/mockData';

function StoreInitializer() {
  const dispatch = useStoreDispatch();

  useEffect(() => {
    dispatch({ type: 'SET_PRODUCTS', payload: MOCK_PRODUCTS });
  }, [dispatch]);

  return null;
}

export default function Home() {
  return (
    <StoreProvider>
      <StoreInitializer />
      <main className="min-h-screen bg-neutral-50 text-neutral-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
        <Navbar />
        
        <div className="max-w-7xl mx-auto pt-16">
          <header className="px-6 pt-12 pb-4">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">
              The Tea <span className="text-emerald-600">Connoisseur</span>
            </h1>
            <p className="text-neutral-500 text-lg max-w-2xl">
              Sourced from the most remote gardens. Delivered with uncompromising speed and freshness.
            </p>
          </header>

          <FilterBar />
          
          <section className="pb-20">
            <ProductGrid />
          </section>
        </div>

        <CartDrawer />
        
        {/* Visual background elements */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-50 rounded-full blur-[120px] opacity-50" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-50 rounded-full blur-[120px] opacity-50" />
        </div>
      </main>
    </StoreProvider>
  );
}
