'use client';

import { useMemo } from 'react';
import useSWR from '../lib/useSWRFallback';
import { fetcher } from '../lib/api';

/**
 * REFACTORED CATALOG DATA LAYER
 * Centrally manages all product and category data fetching with 
 * aggressive caching and hydration-safe patterns.
 */

export interface Category {
  id: number;
  category: string;
}

export interface Product {
  id: number;
  productname: string;
  productprice: number;
  productstock: number;
  url: string;
  description: string;
  maindescription: string;
  category_id: number;
  Weight: number;
}

// 1. Fetch Categories (Static context, high cache)
export function useCategories() {
  const { data, error, isLoading } = useSWR<Category[]>('/api/categories', fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    dedupingInterval: 600000, // 10 minutes
  });

  return {
    categories: data || [],
    isLoading,
    isError: error,
  };
}

// 2. Fetch Products by Category (Parallelized per section)
export function useCategoryProducts(categoryId: number | null) {
  const { data, error, isLoading } = useSWR<Product[]>(
    categoryId ? `/api/getproductsbycategory/${categoryId}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: true,
      dedupingInterval: 300000, // 5 minutes
    }
  );

  return {
    products: data || [],
    isLoading,
    isError: error,
  };
}

// 3. Optimized Product Detail Fetcher (Cache-First)
export function useProduct(id: number) {
  // We fetch the entire catalog to prime the SWR cache. 
  // If the user came from the Home page, this resolves instantly from memory.
  const { data, error, isLoading } = useSWR<Product[]>('/api/getproducts', fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    dedupingInterval: 600000,
  });

  // Strict useMemo prevents the PDP from re-calculating the find() operation 
  // unless the catalog data or ID actually changes.
  const product = useMemo(() => {
    if (!data) return null;
    return data.find((p) => p.id === id) || null;
  }, [data, id]);

  return {
    product,
    isLoading,
    isError: error || (!isLoading && data && !product),
  };
}
