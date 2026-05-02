'use client';

import { useState, useEffect } from 'react';
import useSWR from '../lib/useSWRFallback';
import { fetcher } from '../lib/api';

export function useShippingFee(weight: number) {
  const [debouncedWeight, setDebouncedWeight] = useState(weight);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedWeight(weight);
    }, 500);

    return () => clearTimeout(handler);
  }, [weight]);

  const { data, error, isLoading } = useSWR<number>(
    debouncedWeight > 0 ? `/api/getshippingfees?term=${debouncedWeight}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // 1 minute cache for fees
    }
  );

  return {
    fee: data || 0,
    isLoading: isLoading || weight !== debouncedWeight,
    isError: error,
  };
}
