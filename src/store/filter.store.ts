import { create } from 'zustand';

interface FilterState {
    selectedCategories: string[];
    priceRange: [number, number] | null; // e.g., [0, 5000]
    searchQuery: string;

    // Actions
    toggleCategory: (category: string) => void;
    setPriceRange: (range: [number, number] | null) => void;
    setSearchQuery: (query: string) => void;
    setGlobalSearch: (query: string) => void;
    resetFilters: () => void;
    clearAll: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
    selectedCategories: [],
    priceRange: null,
    searchQuery: '',

    toggleCategory: (category) =>
        set((state) => {
            if (category === 'All Products') {
                return { selectedCategories: [] };
            }

            const isSelected = state.selectedCategories.includes(category);
            if (isSelected) {
                return { selectedCategories: state.selectedCategories.filter((c) => c !== category) };
            }
            return { selectedCategories: [...state.selectedCategories, category] };
        }),

    setPriceRange: (range) => set({ priceRange: range }),

    setSearchQuery: (query) => set({ searchQuery: query }),

    // New action: Sets search query AND clears other filters for global search
    setGlobalSearch: (query) => set({
        searchQuery: query,
        selectedCategories: [],
        priceRange: null
    }),

    resetFilters: () => set({ selectedCategories: [], priceRange: null, searchQuery: '' }),

    clearAll: () => set({ selectedCategories: [], priceRange: null, searchQuery: '' }),
}));
