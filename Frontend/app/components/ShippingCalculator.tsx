'use client';

import React from 'react';
import { useShippingFee } from '../hooks/useShippingFee';
import { Truck } from './Icons';

export default function ShippingCalculator({ weight }: { weight: number }) {
  const { fee, isLoading, isError } = useShippingFee(weight);

  return (
    <div className="flex items-center justify-between py-2 border-b border-neutral-50 group">
      <div className="flex items-center gap-2 text-neutral-500">
        <Truck className="w-4 h-4" />
        <span className="text-sm font-medium">Estimated Shipping</span>
      </div>
      <div className="text-right">
        {isLoading ? (
          <div className="h-4 w-12 bg-neutral-100 animate-pulse rounded" />
        ) : isError ? (
          <span className="text-xs text-rose-500">Error calculating</span>
        ) : (
          <span className="font-bold text-neutral-900">${fee.toFixed(2)}</span>
        )}
      </div>
    </div>
  );
}
