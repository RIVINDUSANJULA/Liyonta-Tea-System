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
    <span className="font-semibold text-neutral-900">LKR {Math.round(value)}</span>
  </div>
);

export const ShippingFeeRow = ({ weight, onLoading }: { weight: number, onLoading: (l: boolean) => void }) => {
  const { dispatch } = useCart();
  const debouncedWeight = useDebouncedValue(weight, 500);
  const { data, isLoading, isValidating } = useSWR<number>(
    debouncedWeight > 0 ? `/api/getshippingfees?term=${debouncedWeight}` : null,
    fetcher
  );

  React.useEffect(() => {
    onLoading(isLoading || isValidating);
  }, [isLoading, isValidating, onLoading]);

  React.useEffect(() => {
    if (data !== undefined) {
      dispatch({ type: 'SET_FEES', payload: { shipping: data, cod: -1 } }); // -1 means preserve current
    }
  }, [data, dispatch]);

  return (
    <div className="flex justify-between py-2 text-neutral-600">
      <span>Shipping</span>
      {isLoading ? <SkeletonRow /> : <span className="font-semibold text-neutral-900">LKR {Math.round(data || 0)}</span>}
    </div>
  );
};

export const CODFeeRow = ({ subtotal, onLoading }: { subtotal: number, onLoading: (l: boolean) => void }) => {
  const { state, dispatch } = useCart();
  const debouncedSubtotal = useDebouncedValue(subtotal, 500);
  const { data, isLoading, isValidating } = useSWR<number>(
    debouncedSubtotal > 0 ? `/api/getcodfees?term=${debouncedSubtotal}` : null,
    fetcher
  );

  React.useEffect(() => {
    onLoading(isLoading || isValidating);
  }, [isLoading, isValidating, onLoading]);

  React.useEffect(() => {
    if (data !== undefined) {
      dispatch({ type: 'SET_FEES', payload: { shipping: state.shippingFee, cod: data } });
    }
  }, [data, dispatch, state.shippingFee]);

  return (
    <div className="flex justify-between py-2 text-neutral-600">
      <span>Cash on Delivery</span>
      {isLoading ? <SkeletonRow /> : <span className="font-semibold text-neutral-900">LKR {Math.round(data || 0)}</span>}
    </div>
  );
};

export const StaticFeeRow = () => (
  <div className="flex justify-between py-2 text-neutral-600">
    <span>Service Fee(Postal)</span>
    <span className="font-semibold text-neutral-900">LKR 50</span>
  </div>
);

