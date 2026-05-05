'use client';

import React from 'react';
import { Coins } from '../../components/Icons';

/**
 * INPUT STYLING CONSTANT
 * Ensures 100% accuracy across all form fields.
 */
const inputClasses = "w-full border border-gray-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#2c4c4e] focus:border-[#2c4c4e] transition-colors bg-white placeholder:text-gray-400";

export const ContactSection = ({ register }: { register: any }) => {
  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Contact</h2>
      <div className="space-y-3">
        <input
          {...register('mobilePhone', { required: true })}
          placeholder="Mobile phone number"
          className={inputClasses}
        />
        <label className="flex items-center gap-2 cursor-pointer mt-3">
          <input
            type="checkbox"
            {...register('wantsNews')}
            className="w-4 h-4 rounded border-gray-300 text-[#2c4c4e] focus:ring-[#2c4c4e]"
          />
          <span className="text-sm text-gray-700">
            Email me with news and offers
          </span>
        </label>
      </div>
    </section>
  );
};

export const DeliverySection = ({ register }: { register: any }) => {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Delivery</h2>
      <div className="space-y-4">
        {/* Read-only Country Field */}
        <input
          value="Sri Lanka"
          readOnly
          className={`${inputClasses} bg-gray-50 text-gray-500 cursor-not-allowed`}
        />
        
        {/* Name and Email Row */}
        <div className="grid grid-cols-2 gap-4">
          <input
            {...register('fullName', { required: true })}
            placeholder="Full name"
            className={inputClasses}
          />
          <input
            {...register('email', { required: true })}
            type="email"
            placeholder="Email"
            className={inputClasses}
          />
        </div>

        {/* Address Field */}
        <input
          {...register('address', { required: true })}
          placeholder="Address"
          className={inputClasses}
        />

        <label className="flex items-center gap-2 cursor-pointer mt-3">
          <input
            type="checkbox"
            {...register('saveInfo')}
            className="w-4 h-4 rounded border-gray-300 text-[#2c4c4e] focus:ring-[#2c4c4e]"
          />
          <span className="text-sm text-gray-700">
            Save this information for next time
          </span>
        </label>
      </div>
    </section>
  );
};

export const PaymentSection = ({ watch, setValue }: { watch: any, setValue: any }) => {
  // We don't use 'watch' here to prevent parent re-renders 
  // since this is a static selection for now.
  return (
    <section className="mt-8">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900">Payment</h2>
        <p className="text-sm text-gray-500">All transactions are secure and encrypted.</p>
      </div>
      
      {/* Cash Box Selection */}
      <div 
        className="border-2 border-[#2c4c4e] rounded-xl bg-[#f8fafa] p-6 w-full flex flex-col items-center justify-center cursor-default"
      >
        <div className="text-[#2c4c4e]">
          <Coins className="w-8 h-8" />
        </div>
        <span className="text-sm font-medium text-gray-900 mt-2">Cash</span>
      </div>
    </section>
  );
};
