/**
 * Search Store
 * Zustand store for search state and history
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SearchStore {
    query: string;
    searchHistory: string[];
    setQuery: (query: string) => void;
    addToHistory: (query: string) => void;
    clearHistory: () => void;
}

export const useSearchStore = create<SearchStore>()(
    persist(
        (set, get) => ({
            query: '',
            searchHistory: [],

            setQuery: (query) => {
                set({ query });
            },

            addToHistory: (query) => {
                if (!query.trim()) return;

                set((state) => {
                    const history = state.searchHistory.filter((item) => item !== query);
                    return {
                        searchHistory: [query, ...history].slice(0, 10), // Keep last 10 searches
                    };
                });
            },

            clearHistory: () => {
                set({ searchHistory: [] });
            },
        }),
        {
            name: 'search-storage',
        }
    )
);
