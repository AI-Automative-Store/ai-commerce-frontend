'use client';

import { useQuery } from '@tanstack/react-query';
import { productService } from '@/services/product.service';
import { ProductGrid } from '@/components/product/ProductGrid';
import { Loader2, XCircle } from 'lucide-react';

export default function ElectronicsPage() {
    const { data: response, isLoading, isError } = useQuery({
        queryKey: ['products'],
        queryFn: () => productService.getProducts(),
    });

    const products = response?.data?.products || [];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Electronics</h1>
                <p className="text-gray-600">
                    Explore our wide range of electronics and gadgets
                </p>
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <Loader2 className="w-12 h-12 text-black animate-spin mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Loading electronics...</h3>
                </div>
            ) : isError ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <XCircle className="w-12 h-12 text-red-500 mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Failed to load</h3>
                </div>
            ) : (
                <ProductGrid products={products} />
            )}
        </div>
    );
}
