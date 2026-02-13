'use client';

import { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useCompareStore } from '@/store/compare.store';
import { cn } from '@/lib/utils';

export function AIIntentInput() {
    const { intent, setIntent, analyzeComparison, isAnalyzing } = useCompareStore();
    const [isFocused, setIsFocused] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (intent.trim()) {
            analyzeComparison();
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto mb-12">
            <div className={cn(
                "relative group transition-all duration-300",
                isFocused ? "scale-105" : "scale-100"
            )}>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 rounded-2xl opacity-75 group-hover:opacity-100 blur transition duration-1000 group-hover:duration-200 animate-tilt"></div>

                <form onSubmit={handleSubmit} className="relative flex items-center bg-white rounded-2xl p-2 shadow-2xl">
                    <div className="pl-4 pr-3 text-purple-600">
                        <Sparkles className={cn("w-6 h-6", isAnalyzing ? "animate-spin" : "")} />
                    </div>

                    <input
                        type="text"
                        value={intent}
                        onChange={(e) => setIntent(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="Describe your needs (e.g., 'Best gaming laptop under 1.5L with good cooling')..."
                        className="flex-1 bg-transparent border-none outline-none text-lg text-gray-800 placeholder:text-gray-400 py-3"
                    />

                    <button
                        type="submit"
                        disabled={isAnalyzing}
                        className="bg-black text-white p-3 rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </form>
            </div>

            {/* Quick Suggestions */}
            {!intent && (
                <div className="mt-4 flex flex-wrap justify-center gap-2 animate-in fade-in slide-in-from-top-4 duration-500">
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
            onClick={() => setIntent(text)}
            className="px-4 py-1.5 bg-white/50 border border-gray-200 rounded-full text-sm text-gray-600 hover:bg-white hover:border-purple-300 hover:text-purple-600 transition-all shadow-xs"
        >
            {text}
        </button>
    );
}
