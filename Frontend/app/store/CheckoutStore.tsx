'use client';

import React, { createContext, useContext, useReducer, useMemo } from 'react';

export interface ShippingAddress {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

export interface ShippingMethod {
  id: string;
  name: string;
  price: number;
  deliveryTime: string;
}

interface CheckoutState {
  shippingAddress: ShippingAddress;
  shippingMethod: ShippingMethod | null;
  paymentValid: boolean;
  isSubmitting: boolean;
}

type CheckoutAction =
  | { type: 'SET_ADDRESS'; payload: Partial<ShippingAddress> }
  | { type: 'SET_METHOD'; payload: ShippingMethod }
  | { type: 'SET_PAYMENT_VALID'; payload: boolean }
  | { type: 'SET_SUBMITTING'; payload: boolean };

const initialState: CheckoutState = {
  shippingAddress: {
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  },
  shippingMethod: null,
  paymentValid: false,
  isSubmitting: false,
};

function checkoutReducer(state: CheckoutState, action: CheckoutAction): CheckoutState {
  switch (action.type) {
    case 'SET_ADDRESS':
      return { ...state, shippingAddress: { ...state.shippingAddress, ...action.payload } };
    case 'SET_METHOD':
      return { ...state, shippingMethod: action.payload };
    case 'SET_PAYMENT_VALID':
      return { ...state, paymentValid: action.payload };
    case 'SET_SUBMITTING':
      return { ...state, isSubmitting: action.payload };
    default:
      return state;
  }
}

const StateContext = createContext<CheckoutState | undefined>(undefined);
const DispatchContext = createContext<React.Dispatch<CheckoutAction> | undefined>(undefined);

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(checkoutReducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export function useCheckoutState() {
  const context = useContext(StateContext);
  if (!context) throw new Error('useCheckoutState must be used within CheckoutProvider');
  return context;
}

export function useCheckoutDispatch() {
  const context = useContext(DispatchContext);
  if (!context) throw new Error('useCheckoutDispatch must be used within CheckoutProvider');
  return context;
}

// Selectors
export function useIsCheckoutValid() {
  const { shippingAddress, shippingMethod, paymentValid } = useCheckoutState();
  return useMemo(() => {
    const isAddressValid = Object.values(shippingAddress).every(val => val.trim().length > 0);
    return isAddressValid && shippingMethod !== null && paymentValid;
  }, [shippingAddress, shippingMethod, paymentValid]);
}
