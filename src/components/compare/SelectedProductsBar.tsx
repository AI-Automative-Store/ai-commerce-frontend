'use client';

import { useCompareStore } from '@/store/compare.store';
import { Star, Trophy } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

function productImageSrc(p: { images?: string[] }): string | null {
    const first = p.images?.[0];
    if (first && typeof first === 'string' && first.trim() !== '') return first;
    return null;
}

export function SelectedProductsBar() {
    const { selectedProducts, comparison } = useCompareStore();

    if (selectedProducts.length < 2) return null;

    const winnerId = comparison?.winner_id;

    return (
        <section className="bg-white border-b border-gray-100 py-6 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-wrap items-stretch justify-center gap-4 md:gap-8">
                    {selectedProducts.map((product, index) => {
                        const isWinner = winnerId === product.id;
                        const src = productImageSrc(product);
                        return (
                            <div key={product.id} className="flex items-center gap-4">
                                {index > 0 && (
                                    <span className="text-2xl font-bold text-gray-300 hidden sm:inline">vs</span>
                                )}
                                <div
                                    className={cn(
                                        'relative flex flex-col md:flex-row items-center gap-4 rounded-2xl border-2 p-4 min-w-[200px] md:min-w-[280px]',
                                        isWinner ? 'border-amber-400 bg-amber-50/50' : 'border-gray-100 bg-gray-50/30'
                                    )}
                                >
                                    {isWinner && (
                                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400 text-amber-900 text-xs font-bold">
                                            <Trophy className="w-3 h-3" />
                                            Best Overall
                                        </div>
                                    )}
                                    <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-xl bg-white border border-gray-100 overflow-hidden flex items-center justify-center shrink-0">
                                        {src ? (
                                            <Image src={src} alt={product.name} fill className="object-contain p-1" />
                                        ) : (
                                            <span className="text-2xl text-gray-300">?</span>
                                        )}
                                    </div>
                                    <div className="text-center md:text-left">
                                        <h3 className="font-bold text-gray-900 line-clamp-2">{product.name}</h3>
                                        <p className="text-lg font-bold text-gray-900 mt-1">
                                            ₹{Number(product.price).toLocaleString('en-IN')}
                                        </p>
                                        <div className="flex items-center justify-center md:justify-start gap-1 mt-1">
                                            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                            <span className="text-sm font-semibold">{Number(product.rating).toFixed(1)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
