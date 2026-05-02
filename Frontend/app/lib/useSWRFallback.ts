'use client';

import { useState, useEffect } from 'react';

const cache = new Map<string, { data: any; timestamp: number }>();

export default function useSWRFallback<T>(
  key: string | null,
  fetcher: (url: string) => Promise<T>,
  options: { 
    dedupingInterval?: number;
    revalidateOnFocus?: boolean;
    revalidateIfStale?: boolean;
  } = {}
) {
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

  useEffect(() => {
    if (!key) return;

    const cached = cache.get(key);
    if (cached && Date.now() - cached.timestamp < (options.dedupingInterval || 2000)) {
      setData(cached.data);
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    setIsLoading(true);

    fetcher(key)
      .then((res) => {
        if (isMounted) {
          cache.set(key, { data: res, timestamp: Date.now() });
          setData(res);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [key, fetcher, options.dedupingInterval]);

  return { data, error, isLoading };
}
