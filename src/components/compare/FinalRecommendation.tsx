'use client';

import { useCompareStore } from '@/store/compare.store';
import { Trophy, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

function winnerImageSrc(p: { images?: string[] }): string | null {
    const first = p.images?.[0];
    if (first && typeof first === 'string' && first.trim() !== '') return first;
    return null;
}

export function FinalRecommendation() {
    const { selectedProducts, comparison } = useCompareStore();

    if (!comparison?.final_verdict || selectedProducts.length < 2) return null;

    const winner = selectedProducts.find((p) => p.id === comparison.winner_id);
    const imgSrc = winner ? winnerImageSrc(winner) : null;

    return (
        <section className="py-12 px-4 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Trophy className="w-7 h-7 text-amber-500" />
                    AI recommendation
                </h2>

                <div className="rounded-3xl border-2 border-amber-200 bg-white shadow-xl overflow-hidden">
                    <div className="p-8 md:p-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
                        {winner && (
                            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-gray-100 border border-gray-200 overflow-hidden shrink-0">
                                {imgSrc ? (
                                    <Image src={imgSrc} alt={winner.name} fill className="object-contain p-2" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-4xl text-gray-300">
                                        ?
                                    </div>
                                )}
                            </div>
                        )}
                        <div className="flex-1 text-center md:text-left">
                            {winner && (
                                <p className="text-lg font-bold text-amber-700 mb-2">Best overall: {winner.name}</p>
                            )}
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                {comparison.final_verdict}
                            </p>
                            {winner && (
                                <Link
                                    href={`/product/${winner.slug}`}
                                    className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full bg-black text-white font-semibold hover:bg-gray-800 transition-colors"
                                >
                                    <ShoppingBag className="w-5 h-5" />
                                    View {winner.name}
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
