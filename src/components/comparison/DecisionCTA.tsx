'use client';

import { useCompareStore } from '@/store/compare.store';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import Image from 'next/image';

export function DecisionCTA() {
    const { aiVerdict, selectedProducts } = useCompareStore();

    if (!aiVerdict || selectedProducts.length < 2) return null;

    const winner = selectedProducts.find(p => p.id === aiVerdict.winnerId);

    if (!winner) return null;

    return (
        <div className="w-full max-w-3xl mx-auto mb-20 animate-in slide-in-from-bottom-8 duration-700 delay-300">
            <div className="relative overflow-hidden bg-black text-white rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 shadow-2xl">
                {/* Bg decorative */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-600 rounded-full blur-3xl opacity-50"></div>

                <div className="relative w-40 h-40 shrink-0 bg-white rounded-2xl p-4">
                    <Image
                        src={winner.images[0]}
                        alt={winner.name}
                        fill
                        className="object-contain p-2"
                    />
                </div>

                <div className="flex-1 text-center md:text-left relative z-10">
                    <h3 className="text-2xl font-bold mb-2">Ready to Upgrade?</h3>
                    <p className="text-gray-300 mb-6">
                        Get the best price on the <strong>{winner.name}</strong> today with our exclusive AI deal.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                        <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                            <ShoppingBag className="w-5 h-5" />
                            Buy Now for ₹{winner.price.toLocaleString('en-IN')}
                        </button>
                        <button className="px-8 py-3 rounded-full font-medium text-white border border-white/20 hover:bg-white/10 transition-colors">
                            Read Full Review
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
