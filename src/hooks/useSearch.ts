/**
 * useSearch Hook
 * Custom hook for search functionality with debouncing
 */

'use client';

import { useState, useEffect } from 'react';
import { useDebounce } from './useDebounce';
import { useSearchStore } from '@/store/search.store';
import { searchService } from '@/services/search.service';
import type { Product } from '@/types/product.types';

export function useSearch() {
    const { query, setQuery, addToHistory, searchHistory, clearHistory } = useSearchStore();
    const [results, setResults] = useState<Product[]>([]);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const debouncedQuery = useDebounce(query, 300);

    // Fetch search results
    useEffect(() => {
        if (!debouncedQuery.trim()) {
            setResults([]);
            return;
        }

        const performSearch = async () => {
            setIsLoading(true);
            setError(null);

            try {
                // Future Phase 3: use searchService.semanticSearch
                // For Phase 1, we pull all products and filter locally
                const { productService } = await import('@/services/product.service');
                const response = await productService.getProducts();
                const allProducts = response.data.products;

                const lowerQuery = debouncedQuery.toLowerCase();
                const filtered = allProducts.filter(p =>
                    p.name.toLowerCase().includes(lowerQuery) ||
                    p.description.toLowerCase().includes(lowerQuery) ||
                    p.category.toLowerCase().includes(lowerQuery) ||
                    p.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
                );

                setResults(filtered);
                addToHistory(debouncedQuery);
            } catch (err) {
                console.error('Failed to search products', err);
                setError('Failed to load search results');
            } finally {
                setIsLoading(false);
            }
        };

        performSearch();
    }, [debouncedQuery, addToHistory]);

    // Fetch suggestions
    useEffect(() => {
        if (!query.trim() || query.length < 2) {
            setSuggestions([]);
            return;
        }

        const fetchSuggestions = async () => {
            try {
                // Future Phase 3: use searchService.getSuggestions
                const { productService } = await import('@/services/product.service');
                const response = await productService.getProducts();
                const allProducts = response.data.products;

                const lowerQuery = query.toLowerCase();
                const suggestionList = allProducts
                    .filter(p => p.name.toLowerCase().includes(lowerQuery))
                    .map(p => p.name)
                    .slice(0, 5);
                setSuggestions(suggestionList);
            } catch (err) {
                console.error('Failed to load suggestions', err);
                setSuggestions([]);
            }
        };

        fetchSuggestions();
    }, [query]);

    return {
        query,
        setQuery,
        results,
        suggestions,
        isLoading,
        error,
        searchHistory,
        clearHistory,
    };
}
