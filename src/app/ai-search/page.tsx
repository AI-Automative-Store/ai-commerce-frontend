'use client';

import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { productService } from '@/services/product.service';
import { AISearchLoader } from '@/components/search/AISearchLoader';
import { AISearchResults } from '@/components/search/AISearchResults';
import type { AISearchResponse } from '@/types/product.types';
import { Search } from 'lucide-react';

const LOADING_STEPS = [
    'Understanding your needs…',
    'Searching best products…',
    'AI ranking products…',
];

export default function AISearchPage() {
    const searchParams = useSearchParams();
    const qParam = searchParams.get('q') ?? '';

    const [query, setQuery] = useState('');
    const [stepIndex, setStepIndex] = useState(0);
    const [isSearching, setIsSearching] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<AISearchResponse | null>(null);

    const runAiSearch = useCallback(async (searchQuery: string) => {
        if (!searchQuery.trim()) return;
        setData(null);
        setError(null);
        setIsSearching(true);
        setStepIndex(0);

        const stepInterval = setInterval(() => {
            setStepIndex((i) => Math.min(i + 1, LOADING_STEPS.length - 1));
        }, 1000);

        try {
            const res = await productService.aiSearch(searchQuery);
            const responseData = (res as { data?: AISearchResponse }).data;
            if (responseData) {
                setData(responseData);
            } else {
                setError('Invalid response from server.');
            }
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Search failed. Try again.');
        } finally {
            clearInterval(stepInterval);
            setIsSearching(false);
        }
    }, []);

    useEffect(() => {
        if (qParam.trim()) {
            setQuery(qParam);
            runAiSearch(qParam);
        }
    }, [qParam, runAiSearch]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;
        runAiSearch(query);
    };

    return (
        <div className="min-h-screen bg-gray-50/50">
            {/* Section 1 — Hero */}
            <section className="bg-white border-b border-gray-100 pt-12 pb-16 px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                        AI Product Advisor
                    </h1>
                    <p className="text-lg text-gray-600 mb-8">
                        Describe what you need. Our AI will find the perfect product.
                    </p>

                    <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Ask AI... e.g. Best phone under 20000 for battery"
                            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                        <button
                            type="submit"
                            disabled={isSearching}
                            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl bg-indigo-600 text-white font-medium text-sm hover:bg-indigo-700 disabled:opacity-50"
                        >
                            Search
                        </button>
                    </form>

                    <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm text-gray-500">
                        <span>Try:</span>
                        <button
                            type="button"
                            onClick={() => { setQuery('best phone under 20000 for battery'); runAiSearch('best phone under 20000 for battery'); }}
                            className="text-indigo-600 hover:underline"
                        >
                            best phone under 20000 for battery
                        </button>
                        <button
                            type="button"
                            onClick={() => { setQuery('gaming laptop under 1 lakh'); runAiSearch('gaming laptop under 1 lakh'); }}
                            className="text-indigo-600 hover:underline"
                        >
                            gaming laptop under 1 lakh
                        </button>
                        <button
                            type="button"
                            onClick={() => { setQuery('noise cancelling earbuds for travel'); runAiSearch('noise cancelling earbuds for travel'); }}
                            className="text-indigo-600 hover:underline"
                        >
                            noise cancelling earbuds
                        </button>
                    </div>
                </div>
            </section>

            <div className="max-w-3xl mx-auto px-4 py-8">
                {error && (
                    <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-red-700 text-sm mb-8">
                        {error}
                    </div>
                )}

                {isSearching && <AISearchLoader stepIndex={stepIndex} />}

                {!isSearching && data && <AISearchResults data={data} />}

                {!isSearching && !data && !error && query.trim() && (
                    <p className="text-center text-gray-500 py-8">No results. Try a different query.</p>
                )}
            </div>
        </div>
    );
}
