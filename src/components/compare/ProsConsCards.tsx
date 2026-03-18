'use client';

import { useCompareStore } from '@/store/compare.store';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ProsConsCards() {
    const { selectedProducts, comparison } = useCompareStore();

    if (!comparison?.pros_cons || selectedProducts.length < 2) return null;

    const prosCons = comparison.pros_cons as Record<string, { pros: string[]; cons: string[] }>;

    return (
        <section className="py-10 px-4 bg-gray-50/50">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Pros & cons</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {selectedProducts.map((product) => {
                        const data = prosCons[product.id];
                        const isWinner = comparison.winner_id === product.id;
                        return (
                            <div
                                key={product.id}
                                className={cn(
                                    'rounded-2xl border bg-white p-6 shadow-sm',
                                    isWinner ? 'border-amber-300 ring-2 ring-amber-100' : 'border-gray-200'
                                )}
                            >
                                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    {product.name}
                                    {isWinner && (
                                        <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                                            Top choice
                                        </span>
                                    )}
                                </h3>

                                <div className="mb-4">
                                    <div className="flex items-center gap-2 mb-2 text-green-700 font-semibold text-sm">
                                        <ThumbsUp className="w-4 h-4" /> Pros
                                    </div>
                                    <ul className="space-y-1.5">
                                        {(data?.pros || []).map((item, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                        {(!data?.pros || data.pros.length === 0) && (
                                            <li className="text-sm text-gray-400">–</li>
                                        )}
                                    </ul>
                                </div>

                                <div>
                                    <div className="flex items-center gap-2 mb-2 text-red-600 font-semibold text-sm">
                                        <ThumbsDown className="w-4 h-4" /> Cons
                                    </div>
                                    <ul className="space-y-1.5">
                                        {(data?.cons || []).map((item, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                                <span className="w-1.5 h-1.5 rounded-full bg-red-300 mt-1.5 shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                        {(!data?.cons || data.cons.length === 0) && (
                                            <li className="text-sm text-gray-400">–</li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
