'use client';

import React from 'react';

interface ProductImageProps {
  imageUrl: string;
  alt: string;
}

const ProductImage: React.FC<ProductImageProps> = React.memo(({ imageUrl, alt }) => {
  return (
    <div className="bg-white rounded-[2rem] p-12 flex items-center justify-center min-h-[400px] shadow-sm">
      <img
        src={imageUrl}
        alt={alt}
        className="max-w-full max-h-[500px] object-contain hover:scale-105 transition-transform duration-700"
      />
    </div>
  );
});

ProductImage.displayName = 'ProductImage';

export default ProductImage;
