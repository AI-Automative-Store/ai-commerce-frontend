'use client';

import { mockProducts } from '@/lib/mockData';
import { ShopHero } from '@/components/shop/ShopHero';
import { FilterSidebar } from '@/components/shop/FilterSidebar';
import { ShopProductCard } from '@/components/shop/ShopProductCard';
import { Newsletter } from '@/components/shop/Newsletter';
import { Button } from '@/components/ui/Button';
import { useFilterStore } from '@/store/filter.store';
import { useMemo } from 'react';
import { XCircle } from 'lucide-react';

export default function Home() {
  const { selectedCategories, priceRange, searchQuery, resetFilters } = useFilterStore();

  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      // Search Filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query);

        if (!matchesSearch) return false;
      }

      // Category Filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
        return false;
      }

      // Price Filter
      if (priceRange) {
        if (product.price < priceRange[0] || product.price > priceRange[1]) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategories, priceRange]);

  return (
    <div className="w-full min-h-screen bg-white pb-12">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">

        {/* 1. Large Hero Header */}
        <ShopHero />

        <div className="flex flex-col md:flex-row gap-12">

          {/* 2. Sidebar Filters */}
          <aside className="hidden md:block sticky top-24 self-start">
            <FilterSidebar />
          </aside>

          {/* 3. Product Grid */}
          <main className="flex-1">

            {/* Toolbar */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold">
                Recommended for you
                <span className="text-gray-400 text-sm font-normal ml-2">({filteredProducts.length} items)</span>
              </h2>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="text-gray-500">
                  Sort by: Newest
                </Button>
              </div>
            </div>

            {/* Grid */}
            {filteredProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
                  {filteredProducts.map((product) => (
                    <ShopProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination Mock */}
                <div className="flex justify-center mt-16 gap-2">
                  <button className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold">1</button>
                  <button className="w-10 h-10 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center font-bold">2</button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-300">
                <div className="bg-gray-50 p-6 rounded-full mb-4">
                  <XCircle className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 mb-6 max-w-md">
                  We couldn't find any products matching your current filters. Try adjusting your search or clearing filters.
                </p>
                <Button onClick={resetFilters} size="lg" className="rounded-full px-8">
                  Reset Filters
                </Button>
              </div>
            )}
          </main>
        </div>

        {/* 4. Footer Section */}
        <Newsletter />

      </div>
    </div>
  );
}
