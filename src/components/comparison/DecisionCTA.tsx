'use client';

import { useCompareStore } from '@/store/compare.store';
import { ShoppingBag, ImageOff } from 'lucide-react';
import Image from 'next/image';

function winnerImageSrc(product: { images?: string[] }): string | null {
    const first = product.images?.[0];
    if (first && typeof first === 'string' && first.trim() !== '') return first;
    return null;
}

export function DecisionCTA() {
    const { aiVerdict, selectedProducts } = useCompareStore();

    if (!aiVerdict || selectedProducts.length < 2) return null;

    const winner = selectedProducts.find((p) => p.id === aiVerdict.winnerId);

    if (!winner) return null;

    const imgSrc = winnerImageSrc(winner);

    return (
        <div className="w-full max-w-3xl mx-auto mb-20">
            <div className="relative overflow-hidden bg-black text-white rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 shadow-2xl">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-600 rounded-full blur-3xl opacity-50" />

                <div className="relative w-40 h-40 shrink-0 bg-white rounded-2xl p-4 flex items-center justify-center">
                    {imgSrc ? (
                        <Image src={imgSrc} alt={winner.name} fill className="object-contain p-2" />
                    ) : (
                        <ImageOff className="w-16 h-16 text-gray-400" />
                    )}
                </div>

                <div className="flex-1 text-center md:text-left relative z-10">
                    <h3 className="text-2xl font-bold mb-2">Ready to Upgrade?</h3>
                    <p className="text-gray-300 mb-6">
                        Get the best price on the <strong>{winner.name}</strong> today with our exclusive AI deal.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                        <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                            <ShoppingBag className="w-5 h-5" />
                            Buy Now for ₹{Number(winner.price).toLocaleString('en-IN')}
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
