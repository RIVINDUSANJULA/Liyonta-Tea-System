'use client';

import { useState, useEffect } from 'react';

const cache = new Map<string, { data: any; timestamp: number }>();

export interface SWRResponse<T> {
  data: T | undefined;
  error: any;
  isLoading: boolean;
  isValidating: boolean;
}

export default function useSWRFallback<T>(
  key: string | null,
  fetcher: (url: string) => Promise<T>,
  options: { 
    dedupingInterval?: number;
    revalidateOnFocus?: boolean;
    revalidateIfStale?: boolean;
  } = {}
): SWRResponse<T> {
  const [data, setData] = useState<T | undefined>(() => {
    if (!key) return undefined;
    const cached = cache.get(key);
    if (cached && Date.now() - cached.timestamp < (options.dedupingInterval || 2000)) {
      return cached.data;
    }
    return undefined;
  });
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(!data && !!key);
  const [isValidating, setIsValidating] = useState(!!key);

  useEffect(() => {
    if (!key) {
      setIsValidating(false);
      return;
    }

    const cached = cache.get(key);
    if (cached && Date.now() - cached.timestamp < (options.dedupingInterval || 2000)) {
      setData(cached.data);
      setIsLoading(false);
      setIsValidating(false);
      return;
    }

    let isMounted = true;
    setIsLoading(!data);
    setIsValidating(true);

    fetcher(key)
      .then((res) => {
        if (isMounted) {
          cache.set(key, { data: res, timestamp: Date.now() });
          setData(res);
          setIsLoading(false);
          setIsValidating(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err);
          setIsLoading(false);
          setIsValidating(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [key, fetcher, options.dedupingInterval, data]);

  return { data, error, isLoading, isValidating };
}
