'use client';

import { useQuery } from '@tanstack/react-query';
import { productService } from '@/services/product.service';
import { ProductGrid } from '@/components/product/ProductGrid';
import { Loader2, XCircle } from 'lucide-react';

export default function MobilesPage() {
    const { data: response, isLoading, isError } = useQuery({
        queryKey: ['products', 'mobiles'],
        queryFn: () => productService.getProducts({ category: 'mobiles' }),
    });

    const products = response?.data?.products || [];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Mobile Phones</h1>
                <p className="text-gray-600">
                    Discover the latest smartphones with AI-powered recommendations
                </p>
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <Loader2 className="w-12 h-12 text-black animate-spin mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Loading mobiles...</h3>
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
