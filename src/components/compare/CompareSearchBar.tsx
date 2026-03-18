'use client';

import { useState, useEffect, useRef } from 'react';
import { useCompareStore } from '@/store/compare.store';
import { productService } from '@/services/product.service';
import { apiProductToProduct } from '@/lib/productMapper';
import type { Product } from '@/types/product.types';
import { Search, Plus, Loader2, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const DEBOUNCE_MS = 300;

function productImageSrc(p: { images?: string[] }): string | null {
    const first = p.images?.[0];
    if (first && typeof first === 'string' && first.trim() !== '') return first;
    return null;
}

export function CompareSearchBar() {
    const addProduct = useCompareStore((s) => s.addProduct);
    const selectedProducts = useCompareStore((s) => s.selectedProducts);

    const [query, setQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [results, setResults] = useState<Product[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Debounce search input
    useEffect(() => {
        const t = setTimeout(() => setDebouncedQuery(query.trim()), DEBOUNCE_MS);
        return () => clearTimeout(t);
    }, [query]);

    // Fetch recommendations when debounced query changes
    useEffect(() => {
        if (!debouncedQuery) {
            setResults([]);
            setIsSearching(false);
            return;
        }
        let cancelled = false;
        setIsSearching(true);
        productService
            .searchProducts(debouncedQuery, 8)
            .then((res) => {
                if (cancelled) return;
                const data = (res as { data?: { products?: Record<string, unknown>[] } }).data;
                const list = data?.products ?? [];
                setResults(list.map((p) => apiProductToProduct(p)));
            })
            .catch(() => {
                if (!cancelled) setResults([]);
            })
            .finally(() => {
                if (!cancelled) setIsSearching(false);
            });
        return () => {
            cancelled = true;
        };
    }, [debouncedQuery]);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) setIsOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleAdd = (product: Product) => {
        addProduct(product);
        setQuery('');
        setDebouncedQuery('');
        setResults([]);
        setIsOpen(false);
    };

    const alreadyAdded = (id: string) => selectedProducts.some((p) => p.id === id);
    const atMax = selectedProducts.length >= 4;

    return (
        <div ref={wrapperRef} className="relative w-full max-w-2xl mx-auto mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
                <span className="inline-flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-indigo-500" />
                    Search for products to compare
                </span>
            </label>
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none z-10" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    placeholder="e.g. gaming laptop, best camera phone, noise cancelling headphones..."
                    className={cn(
                        'w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white',
                        'text-gray-900 placeholder:text-gray-400',
                        'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                    )}
                />
                {isSearching && (
                    <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-500 animate-spin pointer-events-none" />
                )}
            </div>

            {isOpen && (query.trim() || results.length > 0) && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-full max-w-2xl max-h-[320px] overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-xl z-50">
                    {!query.trim() ? null : isSearching && results.length === 0 ? (
                        <div className="p-4 text-center text-gray-500 text-sm">Searching...</div>
                    ) : results.length === 0 ? (
                        <div className="p-4 text-center text-gray-500 text-sm">
                            No products found. Try &quot;laptop&quot;, &quot;phone&quot;, or &quot;earphones&quot;.
                        </div>
                    ) : (
                        <>
                            <div className="sticky top-0 bg-gray-50 border-b border-gray-100 px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Best matches for you
                            </div>
                            <ul className="py-2">
                                {results.map((product) => {
                                    const added = alreadyAdded(product.id);
                                    const src = productImageSrc(product);
                                    return (
                                        <li key={product.id} className="border-b border-gray-50 last:border-0">
                                            <div className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50">
                                                <div className="relative w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                                                    {src ? (
                                                        <Image src={src} alt={product.name} fill className="object-contain p-1" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-300 text-lg">?</div>
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-semibold text-gray-900 truncate">{product.name}</p>
                                                    <p className="text-sm text-gray-500">
                                                        {product.brand} · ₹{Number(product.price).toLocaleString('en-IN')}
                                                    </p>
                                                </div>
                                                <button
                                                    type="button"
                                                    disabled={added || atMax}
                                                    onClick={() => handleAdd(product)}
                                                    className={cn(
                                                        'shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                                                        added || atMax
                                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                            : 'bg-indigo-600 text-white hover:bg-indigo-700'
                                                    )}
                                                >
                                                    {added ? (
                                                        'Added'
                                                    ) : atMax ? (
                                                        'Max 4'
                                                    ) : (
                                                        <>
                                                            <Plus className="w-4 h-4" />
                                                            Add to compare
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
