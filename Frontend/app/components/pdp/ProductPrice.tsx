'use client';

import React from 'react';

interface ProductPriceProps {
  price: number;
}

const ProductPrice: React.FC<ProductPriceProps> = React.memo(({ price }) => {
  return (
    <div className="mb-8">
      <span className="text-[#d13239] font-bold text-3xl">
        LKR {price.toFixed(2)}
      </span>
    </div>
  );
});

ProductPrice.displayName = 'ProductPrice';

export default ProductPrice;
