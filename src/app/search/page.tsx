'use client';

import { useSearch } from '@/hooks/useSearch';
import { SearchBar } from '@/components/search/SearchBar';
import { ProductGrid } from '@/components/product/ProductGrid';
import { mockProducts } from '@/lib/mockData';
import { useState } from 'react';

export default function SearchPage() {
    const { query, setQuery, results, isLoading, error } = useSearch();
    // For demo purposes, we'll use local state to filter mock products if the API isn't ready
    // In a real app, useSearch would handle this via the service
    const [demoResults, setDemoResults] = useState(mockProducts);

    const handleSearch = (searchQuery: string) => {
        setQuery(searchQuery);
        // Simple mock filtering for demo
        if (!searchQuery.trim()) {
            setDemoResults(mockProducts);
        } else {
            const lowerQuery = searchQuery.toLowerCase();
            const filtered = mockProducts.filter(p =>
                p.name.toLowerCase().includes(lowerQuery) ||
                p.description.toLowerCase().includes(lowerQuery) ||
                p.category.toLowerCase().includes(lowerQuery) ||
                p.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
            );
            setDemoResults(filtered);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto mb-12 text-center">
                <h1 className="text-3xl font-bold mb-4">AI Semantic Search</h1>
                <p className="text-gray-600 mb-8">
                    Describe what you're looking for in natural language, and let our AI find the best matches.
                </p>
                <SearchBar onSearch={handleSearch} initialQuery={query} />

                <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm text-gray-500">
                    <span>Try searching:</span>
                    <button onClick={() => handleSearch('gaming laptop')} className="text-blue-600 hover:underline">
                        "gaming laptop"
                    </button>
                    <button onClick={() => handleSearch('noise cancelling headphones')} className="text-blue-600 hover:underline">
                        "noise cancelling headphones"
                    </button>
                    <button onClick={() => handleSearch('iphone')} className="text-blue-600 hover:underline">
                        "iphone"
                    </button>
                </div>
            </div>

            <div className="mt-8">
                {isLoading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-600"></div>
                        <p className="mt-2 text-gray-500">Thinking...</p>
                    </div>
                ) : (
                    <ProductGrid
                        products={demoResults}
                        title={query ? `Results for "${query}"` : 'Recommended for you'}
                    />
                )}
            </div>
        </div>
    );
}
