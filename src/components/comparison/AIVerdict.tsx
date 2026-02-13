'use client';

import { useCompareStore } from '@/store/compare.store';
import { Trophy, Sparkles, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AIVerdict() {
    const { aiVerdict, isAnalyzing, selectedProducts } = useCompareStore();

    if (isAnalyzing) {
        return (
            <div className="w-full max-w-4xl mx-auto mb-10 p-8 rounded-3xl bg-white border border-gray-100 shadow-xl flex flex-col items-center justify-center text-center">
                <Loader2 className="w-10 h-10 text-purple-600 animate-spin mb-4" />
                <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    AI Analysis in Progress...
                </h3>
                <p className="text-gray-500 mt-2 text-sm">Comparing specs, reviews, and value propositions.</p>
            </div>
        );
    }

    if (!aiVerdict || selectedProducts.length < 2) return null;

    const winner = selectedProducts.find(p => p.id === aiVerdict.winnerId);

    return (
        <div className="w-full max-w-4xl mx-auto mb-16 animate-in zoom-in duration-500">
            <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white shadow-2xl">
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>

                <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
                    {/* Content */}
                    <div className="flex-1 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-bold uppercase tracking-wider mb-4">
                            <Trophy className="w-3 h-3" />
                            AI Recommendation
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            {winner?.name}
                        </h2>

                        <p className="text-lg text-slate-300 leading-relaxed mb-6">
                            {aiVerdict.reasoning}
                        </p>

                        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                            <div className="px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/10">
                                <span className="text-xs text-gray-400 uppercase block mb-1">Performance</span>
                                <span className="font-bold text-green-400">{aiVerdict.scores[winner!.id]?.performance}/10</span>
                            </div>
                            <div className="px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/10">
                                <span className="text-xs text-gray-400 uppercase block mb-1">Value</span>
                                <span className="font-bold text-blue-400">9.2/10</span>
                            </div>
                        </div>
                    </div>

                    {/* Visual Score Circle */}
                    <div className="shrink-0 relative">
                        <div className="w-32 h-32 rounded-full border-4 border-white/10 flex items-center justify-center relative">
                            <Sparkles className="absolute top-0 right-0 w-6 h-6 text-yellow-400 animate-pulse" />
                            <div className="text-center">
                                <span className="block text-3xl font-bold">{aiVerdict.scores[winner!.id]?.overall}</span>
                                <span className="text-xs text-gray-400 uppercase">Match Score</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
