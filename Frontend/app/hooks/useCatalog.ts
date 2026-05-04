'use client';

import { useMemo } from 'react';
import useSWR from '../lib/useSWRFallback';
import { fetcher } from '../lib/api';

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

export function useCategories() {
  const { data, error, isLoading } = useSWR<Category[]>('/api/categories', fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    dedupingInterval: 600000, // 10 minutes cache
  });

  return {
    categories: data || [],
    isLoading,
    isError: error,
  };
}

export function useCategoryProducts(categoryId: number | null) {
  const { data, error, isLoading } = useSWR<Product[]>(
    categoryId ? `/api/getproductsbycategory/${categoryId}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      dedupingInterval: 300000, // 5 minutes cache
    }
  );

  return {
    products: data || [],
    isLoading,
    isError: error,
  };
}

export function useProduct(id: number) {
  // We fetch all products to leverage the existing cache from the home page
  const { data, error, isLoading } = useSWR<Product[]>('/api/getproducts', fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    dedupingInterval: 600000, // 10 minutes cache
  });

  const product = useMemo(() => {
    return data?.find((p) => p.id === id);
  }, [data, id]);

  return {
    product,
    isLoading,
    isError: error || (!isLoading && !product),
  };
}
