'use client';

import React from 'react';
import { useCODFee } from '../hooks/useCODFee';

export default function CODSummaryRow({ subtotal }: { subtotal: number }) {
  const { fee, isLoading } = useCODFee(subtotal);

  return (
    <div className="flex justify-between items-center py-2 text-sm">
      <span className="text-neutral-500">COD Surcharge</span>
      <div className={isLoading ? 'opacity-50 transition-opacity' : ''}>
        {isLoading ? (
          <div className="w-8 h-4 bg-neutral-100 animate-pulse rounded" />
        ) : (
          <span className="font-medium text-neutral-700">+Rs. {fee.toFixed(2)}</span>
        )}
      </div>
    </div>
  );
}
