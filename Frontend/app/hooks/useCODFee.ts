'use client';

import useSWR from 'swr';
import { fetcher } from '../lib/api';

export function useCODFee(price: number) {
  const { data, error, isLoading } = useSWR<number>(
    price > 0 ? `/api/getcodfees?term=${price}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  return {
    fee: data || 0,
    isLoading,
    isError: error,
  };
}
