'use client';

import { useState } from 'react';
import { fetcher } from '../lib/api';

export function useSubmitOrder() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitOrder = async (orderData: any) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetcher('/api/Ordersadd', {
        method: 'POST',
        body: JSON.stringify(orderData),
      });
      return { success: true, data: response };
    } catch (err: any) {
      setError(err.message || 'Failed to submit order');
      return { success: false, error: err.message };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitOrder,
    isSubmitting,
    error,
  };
}
