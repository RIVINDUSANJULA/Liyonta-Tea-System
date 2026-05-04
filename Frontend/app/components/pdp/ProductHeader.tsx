'use client';

import React from 'react';

interface ProductHeaderProps {
  productname: string;
  maindescription: string;
}

const ProductHeader: React.FC<ProductHeaderProps> = React.memo(({ productname, maindescription }) => {
  return (
    <div className="mb-8">
      <h1 className="font-serif text-4xl text-black mb-4 leading-tight">
        {productname}
      </h1>
      <p className="text-gray-500 text-sm leading-relaxed mb-8">
        {maindescription}
      </p>
    </div>
  );
});

ProductHeader.displayName = 'ProductHeader';

export default ProductHeader;
