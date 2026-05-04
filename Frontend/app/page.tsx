import { useCategories } from './hooks/useCatalog';
import CategorySection from './components/CategorySection';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';

const CategorySkeleton = () => (
  <div className="mb-16 animate-pulse">
    <div className="h-10 bg-gray-200 rounded w-1/4 mb-6" />
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-white rounded-[2rem] h-80 shadow-sm" />
      ))}
    </div>
  </div>
);

export default function Home() {
  const { categories, isLoading, isError } = useCategories();

  return (
    <main className="min-h-screen bg-[#f8f9fa] text-neutral-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />
      
      <div className="max-w-7xl mx-auto pt-16 px-6">
        <header className="pt-12 pb-12">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">
            The Tea <span className="text-[#468241]">Connoisseur</span>
          </h1>
          <p className="text-neutral-500 text-lg max-w-2xl font-serif italic">
            "Grouped by Heritage. Sorted by Excellence."
          </p>
        </header>

        {isLoading ? (
          <div className="space-y-12">
            <CategorySkeleton />
            <CategorySkeleton />
            <CategorySkeleton />
          </div>
        ) : isError ? (
          <div className="text-center py-20 text-rose-500 font-bold">
            Unable to load categories. Please ensure the backend server is running on port 8801.
          </div>
        ) : (
          <div className="pb-20">
            {categories.map((cat) => (
              <CategorySection 
                key={cat.id} 
                categoryId={cat.id} 
                categoryName={cat.category} 
              />
            ))}
          </div>
        )}
      </div>

      <CartDrawer />
      
      {/* Subtle visual elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-50 rounded-full blur-[120px]" />
      </div>
    </main>
  );
}
