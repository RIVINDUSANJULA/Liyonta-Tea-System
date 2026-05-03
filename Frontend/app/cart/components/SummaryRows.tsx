'use client';

import React from 'react';
import useSWR from '../../lib/useSWRFallback';
import { fetcher } from '../../lib/api';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';

const SkeletonRow = () => (
  <div className="h-4 w-16 bg-neutral-200 animate-pulse rounded" />
);

export const SubtotalRow = ({ value }: { value: number }) => (
  <div className="flex justify-between py-2 text-neutral-600">
    <span>Subtotal</span>
    <span className="font-semibold text-neutral-900">Rs. {value.toLocaleString()}</span>
  </div>
);

export const ShippingFeeRow = ({ weight, onValue }: { weight: number, onValue: (v: number) => void }) => {
  const debouncedWeight = useDebouncedValue(weight, 500);
  const { data, isLoading } = useSWR<number>(
    debouncedWeight > 0 ? `/api/getshippingfees?term=${debouncedWeight}` : null,
    fetcher
  );

  React.useEffect(() => {
    if (data !== undefined) onValue(data);
  }, [data, onValue]);

  return (
    <div className="flex justify-between py-2 text-neutral-600">
      <span>Shipping</span>
      {isLoading ? <SkeletonRow /> : <span className="font-semibold text-neutral-900">Rs. {(data || 0).toLocaleString()}</span>}
    </div>
  );
};

export const CODFeeRow = ({ subtotal, onValue }: { subtotal: number, onValue: (v: number) => void }) => {
  const debouncedSubtotal = useDebouncedValue(subtotal, 500);
  const { data, isLoading } = useSWR<number>(
    debouncedSubtotal > 0 ? `/api/getcodfees?term=${debouncedSubtotal}` : null,
    fetcher
  );

  React.useEffect(() => {
    if (data !== undefined) onValue(data);
  }, [data, onValue]);

  return (
    <div className="flex justify-between py-2 text-neutral-600">
      <span>Cash on Delivery</span>
      {isLoading ? <SkeletonRow /> : <span className="font-semibold text-neutral-900">Rs. {(data || 0).toLocaleString()}</span>}
    </div>
  );
};

export const StaticFeeRow = () => (
  <div className="flex justify-between py-2 text-neutral-600">
    <span>Service Fee(Postal)</span>
    <span className="font-semibold text-neutral-900">Rs. 50</span>
  </div>
);
