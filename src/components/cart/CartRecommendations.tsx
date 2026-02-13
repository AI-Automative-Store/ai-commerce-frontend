'use client';

import { useEffect, useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { getSmartRecommendations, Recommendation } from '@/lib/recommendations';
import { SuggestionCard } from './SuggestionCard';
import { Sparkles } from 'lucide-react';

export function CartRecommendations() {
    const { items } = useCart();
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

    useEffect(() => {
        if (items.length > 0) {
            const recs = getSmartRecommendations(items);
            setRecommendations(recs);
        } else {
            setRecommendations([]);
        }
    }, [items]);

    if (recommendations.length === 0) return null;

    return (
        <div className="mt-16 animate-in slide-in-from-bottom-8 duration-700">
            <div className="flex items-center justify-between mb-6 px-1">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-purple-600 fill-purple-100" />
                        Complete Your Ecosystem
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Most customers pair these with your current cart.
                    </p>
                </div>
            </div>

            <div className="relative">
                {/* Horizontal Scroll Container */}
                <div className="flex gap-4 overflow-x-auto pb-8 pt-2 px-1 scrollbar-hide snap-x">
                    {recommendations.map((rec) => (
                        <SuggestionCard key={rec.product.id} recommendation={rec} />
                    ))}
                </div>

                {/* Fade effect on right */}
                <div className="absolute right-0 top-0 bottom-8 w-24 bg-gradient-to-l from-white to-transparent pointer-events-none md:hidden" />
            </div>
        </div>
    );
}
