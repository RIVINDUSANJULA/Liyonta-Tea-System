'use client';

import React from 'react';
import Link from 'next/link';
import { Check } from '../components/Icons';

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-8 animate-in zoom-in duration-500">
        <Check className="w-10 h-10" />
      </div>
      <h1 className="text-4xl font-black text-neutral-900 mb-4">Order Confirmed</h1>
      <p className="text-neutral-500 max-w-md mb-12">
        Thank you for your purchase! Your premium tea is being prepared for delivery. 
        We've sent a confirmation email to your inbox.
      </p>
      <Link href="/">
        <button className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-[0.98]">
          Return to Shop
        </button>
      </Link>
    </div>
  );
}
