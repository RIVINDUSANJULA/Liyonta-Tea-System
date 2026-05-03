'use client';

import { useState, useCallback } from 'react';

export function useSimpleForm<T extends Record<string, any>>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const register = useCallback((name: keyof T, options: { required?: boolean } = {}) => {
    return {
      name: name as string,
      defaultValue: initialValues[name],
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setValues(prev => ({ ...prev, [name]: val }));
      },
      onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
        if (options.required && !e.target.value) {
          setErrors(prev => ({ ...prev, [name as string]: true }));
        } else {
          setErrors(prev => ({ ...prev, [name as string]: false }));
        }
      }
    };
  }, [initialValues]);

  const setValue = useCallback((name: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
  }, []);

  const watch = useCallback((name: keyof T, fallback: any) => {
    return values[name] ?? fallback;
  }, [values]);

  const isValid = Object.keys(initialValues)
    .filter(k => (initialValues as any)[k] === '') // Check only strings that were initially empty as required proxy
    .every(k => !!values[k]);

  return { register, values, setValue, watch, isValid };
}
