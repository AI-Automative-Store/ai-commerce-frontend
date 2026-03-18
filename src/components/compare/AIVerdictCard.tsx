'use client';

import { useCompareStore } from '@/store/compare.store';
import { Sparkles } from 'lucide-react';

export function AIVerdictCard() {
    const { comparison, selectedProducts } = useCompareStore();

    if (!comparison || selectedProducts.length < 2) return null;

    const summary = comparison.summary || 'No summary available.';

    return (
        <section className="py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-indigo-600" />
                    <h2 className="text-lg font-bold text-gray-900">AI Insight</h2>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm">
                    <p className="text-gray-700 leading-relaxed text-lg">
                        Comparing {selectedProducts.length} products.
                    </p>
                    <p className="mt-3 text-gray-800 leading-relaxed">{summary}</p>
                </div>
            </div>
        </section>
    );
}
