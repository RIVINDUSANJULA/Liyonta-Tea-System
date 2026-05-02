'use client';

import React, { useState, useEffect } from 'react';
import { Search, ChevronDown } from './Icons';
import { useStoreState, useStoreDispatch } from '../store/TeaStore';

export default function FilterBar() {
  const { sortBy } = useStoreState();
  const dispatch = useStoreDispatch();
  
  const [localSearch, setLocalSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: 'SET_SEARCH_QUERY', payload: localSearch });
    }, 300);
    return () => clearTimeout(timer);
  }, [localSearch, dispatch]);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-8 px-6 mt-16 border-b border-neutral-100 bg-white">
      <div className="relative w-full md:w-96 group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within:text-emerald-600 transition-colors" />
        <input
          type="text"
          placeholder="Search for premium teas..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
        />
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto">
        <span className="text-sm font-medium text-neutral-500 whitespace-nowrap">Sort by:</span>
        <div className="relative w-full md:w-48">
          <select
            value={sortBy}
            onChange={(e) => dispatch({ type: 'SET_SORT_BY', payload: e.target.value })}
            className="w-full appearance-none bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer transition-all pr-10"
          >
            <option value="popularity">Popularity</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
