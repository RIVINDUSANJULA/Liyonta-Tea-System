'use client';

import React from 'react';

interface ProductImageProps {
  url: string;
  name: string;
}

const ProductImage: React.FC<ProductImageProps> = React.memo(({ url, name }) => {
  return (
    <div className="bg-white rounded-[2rem] p-12 flex items-center justify-center min-h-[400px] shadow-sm">
      <img
        src={url}
        alt={name}
        className="max-w-full max-h-[500px] object-contain hover:scale-105 transition-transform duration-700"
      />
    </div>
  );
});

ProductImage.displayName = 'ProductImage';

export default ProductImage;
