'use client';

import React from 'react';
import { Coins } from '../../components/Icons';

export const ContactSection = ({ register }: { register: any }) => {
  return (
    <section className="space-y-6">
      <h2 className="text-xl font-bold text-neutral-900">Contact</h2>
      <div className="space-y-4">
        <input
          {...register('mobilePhone', { required: true })}
          placeholder="Mobile phone number"
          className="w-full p-4 bg-neutral-100 rounded-xl border-none focus:ring-2 focus:ring-neutral-900 transition-all outline-none"
        />
        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            {...register('wantsNews')}
            className="w-5 h-5 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
          />
          <span className="text-sm text-neutral-600 group-hover:text-neutral-900 transition-colors">
            Email me with news and offers
          </span>
        </label>
      </div>
    </section>
  );
};

export const DeliverySection = ({ register }: { register: any }) => {
  return (
    <section className="space-y-6 pt-10">
      <h2 className="text-xl font-bold text-neutral-900">Delivery</h2>
      <div className="space-y-4">
        <input
          value="Sri Lanka"
          readOnly
          className="w-full p-4 bg-neutral-100/50 text-neutral-400 rounded-xl border-none cursor-not-allowed"
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            {...register('fullName', { required: true })}
            placeholder="Full name"
            className="w-full p-4 bg-neutral-100 rounded-xl border-none focus:ring-2 focus:ring-neutral-900 transition-all outline-none"
          />
          <input
            {...register('email', { required: true })}
            type="email"
            placeholder="Email"
            className="w-full p-4 bg-neutral-100 rounded-xl border-none focus:ring-2 focus:ring-neutral-900 transition-all outline-none"
          />
        </div>
        <input
          {...register('address', { required: true })}
          placeholder="Address"
          className="w-full p-4 bg-neutral-100 rounded-xl border-none focus:ring-2 focus:ring-neutral-900 transition-all outline-none"
        />
        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            {...register('saveInfo')}
            className="w-5 h-5 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
          />
          <span className="text-sm text-neutral-600 group-hover:text-neutral-900 transition-colors">
            Save this information for next time
          </span>
        </label>
      </div>
    </section>
  );
};

export const PaymentSection = ({ watch, setValue }: { watch: any, setValue: any }) => {
  const paymentMethod = watch('paymentMethod', 'COD');

  return (
    <section className="space-y-6 pt-10">
      <div>
        <h2 className="text-xl font-bold text-neutral-900">Payment</h2>
        <p className="text-xs text-neutral-400 mt-1">All transactions are secure and encrypted.</p>
      </div>
      
      <div 
        onClick={() => setValue('paymentMethod', 'COD')}
        className={`p-6 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
          paymentMethod === 'COD' 
            ? 'border-neutral-900 bg-neutral-50' 
            : 'border-neutral-100 bg-white hover:border-neutral-200'
        }`}
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-900">
            <Coins className="w-6 h-6" />
          </div>
          <span className="font-bold text-neutral-900">Cash on Delivery (COD)</span>
        </div>
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
          paymentMethod === 'COD' ? 'border-neutral-900' : 'border-neutral-200'
        }`}>
          {paymentMethod === 'COD' && <div className="w-2.5 h-2.5 bg-neutral-900 rounded-full" />}
        </div>
      </div>
    </section>
  );
};
