'use client';

import { useCompareStore } from '@/store/compare.store';
import { User } from 'lucide-react';

export function BestForSection() {
    const { selectedProducts, comparison } = useCompareStore();

    if (!comparison?.best_for || selectedProducts.length < 2) return null;

    const bestFor = comparison.best_for as Record<string, string[]>;
    const entries = selectedProducts
        .map((p) => [p.id, p.name, bestFor[p.id] as string[] | undefined] as const)
        .filter(([, , list]) => Array.isArray(list) && list.length > 0);

    if (entries.length === 0) return null;

    return (
        <section className="py-10 px-4">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <User className="w-5 h-5 text-indigo-600" />
                    Best for
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {entries.map(([productId, productName, list]) => (
                        <div
                            key={productId}
                            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <h3 className="font-bold text-gray-900 mb-3">{productName}</h3>
                            <ul className="space-y-2">
                                {list.map((item, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
