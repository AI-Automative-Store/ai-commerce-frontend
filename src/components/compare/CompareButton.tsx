'use client';

import { useCompareStore } from '@/store/compare.store';
import { Sparkles } from 'lucide-react';

export function CompareButton() {
    const { selectedProducts, analyzeComparison, isAnalyzing } = useCompareStore();
    const count = selectedProducts.length;
    const canCompare = count >= 2 && count <= 4;

    return (
        <section className="py-4 px-4">
            <div className="max-w-4xl mx-auto">
                <button
                    type="button"
                    onClick={() => analyzeComparison()}
                    disabled={!canCompare || isAnalyzing}
                    className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-indigo-600 text-white font-bold text-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <Sparkles className="w-5 h-5" />
                    {isAnalyzing ? 'Comparing…' : 'Compare with AI'}
                </button>
                {count > 0 && count < 2 && (
                    <p className="text-center text-sm text-amber-600 mt-2">Add at least 2 products to compare.</p>
                )}
                {count > 4 && (
                    <p className="text-center text-sm text-amber-600 mt-2">Remove a product (max 4).</p>
                )}
            </div>
        </section>
    );
}
