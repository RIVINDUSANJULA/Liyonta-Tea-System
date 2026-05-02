'use client';

import useSWR from 'swr';
import { fetcher } from '../lib/api';

export interface Product {
  id: number;
  productname: string;
  productprice: number;
  productstock: number;
  url: string;
  description: string;
  category_id: number;
  Weight: number;
}

export function useProducts() {
  const { data, error, isLoading } = useSWR<Product[]>('/api/getproducts', fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    dedupingInterval: 300000, // 5 minutes cache
  });

  return {
    products: data || [],
    isLoading,
    isError: error,
  };
}
