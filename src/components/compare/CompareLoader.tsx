'use client';

import { useCompareStore } from '@/store/compare.store';
import { Loader2, Sparkles } from 'lucide-react';

export function CompareLoader() {
    const { loadingStep } = useCompareStore();

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm">
            <div className="flex flex-col items-center max-w-md px-8 text-center">
                <div className="relative mb-8">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center animate-pulse">
                        <Sparkles className="w-12 h-12 text-white" />
                    </div>
                    <Loader2 className="absolute -bottom-1 -right-1 w-8 h-8 text-indigo-600 animate-spin" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">AI Decision Engine</h2>
                <p className="text-gray-600 mb-6">{loadingStep}</p>
                <div className="flex gap-1">
                    {[0, 1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"
                            style={{ animationDelay: `${i * 0.15}s` }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
