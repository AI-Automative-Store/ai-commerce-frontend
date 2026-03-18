'use client';

import { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useCompareStore } from '@/store/compare.store';
import { cn } from '@/lib/utils';

const PRIORITY_OPTIONS = [
    { id: 'camera', label: 'Camera' },
    { id: 'battery', label: 'Battery' },
    { id: 'gaming', label: 'Gaming' },
    { id: 'budget', label: 'Budget' },
    { id: 'performance', label: 'Performance' },
    { id: 'value_for_money', label: 'Value' },
];

export function AIIntentInput() {
    const { intent, setIntent, priority, setPriority, analyzeComparison, isAnalyzing, selectedProducts, compareError } = useCompareStore();
    const [isFocused, setIsFocused] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedProducts.length >= 2) {
            analyzeComparison();
        }
    };

    const canAnalyze = selectedProducts.length >= 2 && selectedProducts.length <= 4;

    return (
        <div className="w-full max-w-3xl mx-auto mb-8">
            {/* Priority: What matters most? */}
            <div className="mb-6">
                <p className="text-sm font-medium text-gray-600 mb-2">What matters most to you?</p>
                <div className="flex flex-wrap justify-center gap-2">
                    {PRIORITY_OPTIONS.map((opt) => (
                        <button
                            key={opt.id}
                            type="button"
                            onClick={() => setPriority(priority === opt.id ? null : opt.id)}
                            className={cn(
                                'px-4 py-2 rounded-full text-sm font-medium transition-all',
                                priority === opt.id
                                    ? 'bg-indigo-600 text-white shadow-md'
                                    : 'bg-white border border-gray-200 text-gray-600 hover:border-indigo-300 hover:text-indigo-700'
                            )}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className={cn('relative group transition-all duration-300', isFocused ? 'scale-[1.02]' : 'scale-100')}>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-2xl opacity-75 group-hover:opacity-100 blur transition duration-300" />
                <form onSubmit={handleSubmit} className="relative flex items-center bg-white rounded-2xl p-2 shadow-xl">
                    <div className="pl-4 pr-3 text-purple-600">
                        <Sparkles className={cn('w-6 h-6', isAnalyzing ? 'animate-spin' : '')} />
                    </div>
                    <input
                        type="text"
                        value={intent}
                        onChange={(e) => setIntent(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="Describe your needs (e.g., Best gaming laptop under 1.5L with good cooling)..."
                        className="flex-1 bg-transparent border-none outline-none text-lg text-gray-800 placeholder:text-gray-400 py-3"
                    />
                    <button
                        type="submit"
                        disabled={isAnalyzing || !canAnalyze}
                        className="bg-black text-white p-3 rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </form>
            </div>

            {compareError && (
                <p className="mt-2 text-sm text-red-600 text-center">{compareError}</p>
            )}
            {selectedProducts.length > 0 && selectedProducts.length < 2 && (
                <p className="mt-2 text-sm text-amber-600 text-center">Add at least one more product to compare (2–4 total).</p>
            )}

            {!intent && (
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                    <SuggestionPill text="Gaming laptop under ₹1 Lakh" />
                    <SuggestionPill text="Best camera phone for vlogging" />
                    <SuggestionPill text="Noise cancelling earbuds for travel" />
                </div>
            )}
        </div>
    );
}

function SuggestionPill({ text }: { text: string }) {
    const { setIntent } = useCompareStore();
    return (
        <button
            type="button"
            onClick={() => setIntent(text)}
            className="px-4 py-1.5 bg-white/50 border border-gray-200 rounded-full text-sm text-gray-600 hover:bg-white hover:border-purple-300 hover:text-purple-600 transition-all shadow-sm"
        >
            {text}
        </button>
    );
}
