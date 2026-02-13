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
                const response = await searchService.semanticSearch(debouncedQuery);
                setResults(response.data);
                addToHistory(debouncedQuery);
            } catch (err) {
                console.warn('Backend not connected, using mock search results');
                // Fallback to local mock filtering
                const { mockProducts } = await import('@/lib/mockData');
                const lowerQuery = debouncedQuery.toLowerCase();
                const filtered = mockProducts.filter(p =>
                    p.name.toLowerCase().includes(lowerQuery) ||
                    p.description.toLowerCase().includes(lowerQuery) ||
                    p.category.toLowerCase().includes(lowerQuery) ||
                    p.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
                );
                setResults(filtered);
                addToHistory(debouncedQuery);
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
                const response = await searchService.getSuggestions(query);
                setSuggestions(response.data);
            } catch (err) {
                // Silently fail and fallback to mock data
                // console.warn('Search suggestions API failed, using mock data');
                const { mockProducts } = await import('@/lib/mockData');
                const lowerQuery = query.toLowerCase();
                const suggestions = mockProducts
                    .filter(p => p.name.toLowerCase().includes(lowerQuery))
                    .map(p => p.name)
                    .slice(0, 5);
                setSuggestions(suggestions);
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
