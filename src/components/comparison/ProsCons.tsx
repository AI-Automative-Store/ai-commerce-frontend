'use client';

import { useCompareStore } from '@/store/compare.store';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

export function ProsCons() {
    const { selectedProducts, aiVerdict } = useCompareStore();

    if (!aiVerdict || selectedProducts.length < 2) return null;

    return (
        <div className="w-full max-w-5xl mx-auto mb-16 animate-in slide-in-from-bottom-8 duration-700 delay-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6 px-4">Why AI Chose This</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {selectedProducts.map(product => {
                    const data = aiVerdict.prosCons[product.id];
                    const isWinner = aiVerdict.winnerId === product.id;

                    return (
                        <div key={product.id} className={`rounded-3xl p-6 ${isWinner ? 'bg-green-50/50 border-2 border-green-100' : 'bg-white border border-gray-100'}`}>
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="font-bold text-gray-900">{product.name}</h4>
                                {isWinner && <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">Top Choice</span>}
                            </div>

                            {/* Pros */}
                            <div className="mb-4">
                                <div className="flex items-center gap-2 mb-2 text-green-700 font-semibold text-sm">
                                    <ThumbsUp className="w-4 h-4" /> Pros
                                </div>
                                <ul className="space-y-2">
                                    {data?.pros.map((pro, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 shrink-0" />
                                            {pro}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Cons */}
                            <div>
                                <div className="flex items-center gap-2 mb-2 text-red-600 font-semibold text-sm">
                                    <ThumbsDown className="w-4 h-4" /> Cons
                                </div>
                                <ul className="space-y-2">
                                    {data?.cons.map((con, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                            <span className="w-1.5 h-1.5 rounded-full bg-red-300 mt-1.5 shrink-0" />
                                            {con}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
