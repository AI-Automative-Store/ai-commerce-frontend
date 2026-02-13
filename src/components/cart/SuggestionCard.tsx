'use client';

import Image from 'next/image';
import { Plus } from 'lucide-react';
import { Product } from '@/types/product.types';
import { useCart } from '@/hooks/useCart';
import { cn } from '@/lib/utils';
import { Recommendation } from '@/lib/recommendations';

interface SuggestionCardProps {
    recommendation: Recommendation;
}

export function SuggestionCard({ recommendation }: SuggestionCardProps) {
    const { product, reason, type } = recommendation;
    const { addItem } = useCart();

    return (
        <div className="w-[280px] shrink-0 bg-white rounded-2xl p-4 border border-gray-100 hover:border-purple-100 hover:shadow-lg transition-all duration-300 group snap-center relative overflow-hidden">

            {/* Visual Type Badge */}
            {type === 'bundle' && (
                <div className="absolute top-0 right-0 bg-gradient-to-bl from-purple-100 to-transparent p-2 text-[10px] font-bold text-purple-700 rounded-bl-xl">
                    PERFECT PAIR
                </div>
            )}

            <div className="relative w-full h-32 mb-4 bg-gray-50 rounded-xl overflow-hidden p-2">
                <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-500"
                />
            </div>

            <div className="space-y-2">
                <div>
                    <h4 className="font-semibold text-gray-900 line-clamp-1">{product.name}</h4>
                    <p className="text-xs text-gray-400 line-clamp-1">{product.brand}</p>
                </div>

                {/* AI Reason */}
                <div className="bg-purple-50/50 rounded-lg px-2.5 py-1.5 border border-purple-100/50">
                    <p className="text-xs text-purple-800 font-medium line-clamp-2 leading-relaxed">
                        ✨ {reason}
                    </p>
                </div>

                <div className="flex items-center justify-between pt-2">
                    <span className="font-bold text-sm">₹{product.price.toLocaleString('en-IN')}</span>
                    <button
                        onClick={() => addItem(product)}
                        className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 hover:scale-110 transition-all shadow-md active:scale-95"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
