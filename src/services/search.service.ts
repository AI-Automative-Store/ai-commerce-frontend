/**
 * Search Service
 * API calls for AI-powered semantic search
 */

import { apiClient } from './api';
import type { Product, SearchFilters } from '@/types/product.types';

export const searchService = {
    /**
     * Perform semantic search
     */
    async semanticSearch(query: string, filters?: SearchFilters) {
        return apiClient.post<Product[]>('/search/semantic', {
            query,
            filters,
        });
    },

    /**
     * Get search suggestions
     */
    async getSuggestions(query: string) {
        return apiClient.get<string[]>(`/search/suggestions?q=${encodeURIComponent(query)}`);
    },

    /**
     * Get trending searches
     */
    async getTrendingSearches() {
        return apiClient.get<string[]>('/search/trending');
    },
};
