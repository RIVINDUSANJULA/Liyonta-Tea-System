import { useProducts } from '../hooks/useProducts';
import ProductCard from './ProductCard';

const SkeletonCard = () => (
  <div className="flex flex-col animate-pulse">
    <div className="bg-white rounded-[2rem] h-64 mb-4 shadow-sm" />
    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
    <div className="h-4 bg-gray-200 rounded w-full mb-6" />
    <div className="flex justify-between items-center">
      <div className="h-6 bg-gray-200 rounded w-1/4" />
      <div className="h-10 bg-gray-200 rounded-full w-1/3" />
    </div>
  </div>
);

export default function ProductGrid() {
  const { products, isLoading, isError } = useProducts();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {[...Array(6)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-20 text-gray-500 font-medium">
        Unable to load the tea collection. Please try again later.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
