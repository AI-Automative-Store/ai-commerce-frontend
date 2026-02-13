'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight, X, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFilterStore } from '@/store/filter.store';

interface FilterSection {
    id: string;
    name: string;
    type: 'category' | 'price' | 'status';
    options: { label: string; value: string | [number, number] }[];
    isOpen?: boolean;
}

const initialFilters: FilterSection[] = [
    {
        id: 'category',
        name: 'Category',
        type: 'category',
        options: [
            { label: 'Mobiles', value: 'mobiles' },
            { label: 'Laptops', value: 'laptops' },
            { label: 'Earphones', value: 'earphones' },
        ],
        isOpen: true
    },
    {
        id: 'price',
        name: 'Price Range',
        type: 'price',
        options: [
            { label: 'Under ₹10,000', value: [0, 10000] },
            { label: '₹10,000 - ₹50,000', value: [10000, 50000] },
            { label: '₹50,000 - ₹1,00,000', value: [50000, 100000] },
            { label: 'Over ₹1,00,000', value: [100000, 1000000] }, // High cap
        ],
        isOpen: true
    },
];

export function FilterSidebar() {
    const { selectedCategories, priceRange, toggleCategory, setPriceRange, clearAll } = useFilterStore();
    const [sections, setSections] = useState(initialFilters);

    const toggleSection = (id: string) => {
        setSections(sections.map(s => s.id === id ? { ...s, isOpen: !s.isOpen } : s));
    };

    const isPriceSelected = (range: [number, number]) => {
        return priceRange?.[0] === range[0] && priceRange?.[1] === range[1];
    };

    return (
        <div className="w-full md:w-64 shrink-0 space-y-8 animate-in slide-in-from-left-4 duration-500">

            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Filters</h2>
                {(selectedCategories.length > 0 || priceRange) && (
                    <button
                        onClick={clearAll}
                        className="text-sm text-red-500 hover:text-red-600 font-medium transition-colors"
                    >
                        Clear All
                    </button>
                )}
            </div>

            {/* Category Filter */}
            <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Category</h3>
                <div className="space-y-2">
                    {sections[0].options.map((option) => {
                        const isSelected = selectedCategories.includes(option.value as string);
                        return (
                            <button
                                key={option.label}
                                onClick={() => toggleCategory(option.value as string)}
                                className={cn(
                                    "flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-sm transition-all duration-200 group",
                                    isSelected
                                        ? "bg-black text-white shadow-md shadow-black/10 translate-x-1"
                                        : "bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-black"
                                )}
                            >
                                <span className="font-medium">{option.label}</span>
                                {isSelected && <Check className="w-4 h-4" />}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Price Range</h3>
                <div className="space-y-2">
                    {sections[1].options.map((option) => {
                        const value = option.value as [number, number];
                        const isSelected = isPriceSelected(value);
                        return (
                            <button
                                key={option.label}
                                onClick={() => setPriceRange(isSelected ? null : value)}
                                className={cn(
                                    "flex items-center gap-3 w-full text-sm transition-colors text-left group",
                                )}
                            >
                                <div className={cn(
                                    "w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-200",
                                    isSelected
                                        ? "border-black bg-black"
                                        : "border-gray-300 group-hover:border-gray-400"
                                )}>
                                    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                                </div>
                                <span className={cn(
                                    "transition-colors",
                                    isSelected ? "text-black font-medium" : "text-gray-500 group-hover:text-black"
                                )}>
                                    {option.label}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
