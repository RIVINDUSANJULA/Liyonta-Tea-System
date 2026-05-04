'use client';

import React from 'react';

interface ProductHeaderProps {
  name: string;
  description: string;
}

const ProductHeader: React.FC<ProductHeaderProps> = React.memo(({ name, description }) => {
  return (
    <div className="mb-8">
      <h1 className="font-serif text-4xl md:text-5xl text-black mb-4 leading-tight">
        {name}
      </h1>
      <p className="text-gray-500 text-sm leading-relaxed max-w-xl italic">
        {description}
      </p>
    </div>
  );
});

ProductHeader.displayName = 'ProductHeader';

export default ProductHeader;
