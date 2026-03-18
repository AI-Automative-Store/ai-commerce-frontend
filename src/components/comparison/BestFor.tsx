'use client';

import { useCompareStore } from '@/store/compare.store';
import { User } from 'lucide-react';

export function BestFor() {
    const { selectedProducts, comparison } = useCompareStore();

    if (!comparison?.best_for || selectedProducts.length < 2) return null;

    const bestFor = comparison.best_for as Record<string, string[]>;
    const entries = Object.entries(bestFor).filter(([id]) => selectedProducts.some((p) => p.id === id));

    if (entries.length === 0) return null;

    return (
        <div className="w-full max-w-5xl mx-auto mb-16">
            <h3 className="text-xl font-bold text-gray-900 mb-6 px-4 flex items-center gap-2">
                <User className="w-5 h-5 text-indigo-500" />
                Best for
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {entries.map(([productId, list]) => {
                    const product = selectedProducts.find((p) => p.id === productId);
                    if (!product || !Array.isArray(list) || list.length === 0) return null;
                    return (
                        <div
                            key={productId}
                            className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <h4 className="font-bold text-gray-900 mb-3">{product.name}</h4>
                            <ul className="space-y-1.5">
                                {list.map((item, i) => (
                                    <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
