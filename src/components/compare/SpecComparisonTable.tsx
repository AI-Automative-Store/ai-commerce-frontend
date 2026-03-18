'use client';

import { useCompareStore } from '@/store/compare.store';
import { Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SpecComparisonTable() {
    const { selectedProducts, comparison } = useCompareStore();

    if (selectedProducts.length < 2) return null;

    const specs = comparison?.specifications_comparison || {};
    const specEntries = Object.entries(specs).filter(([k]) => k !== 'winner');

    // Fallback: build from product specs if no AI comparison
    const getRows = () => {
        if (specEntries.length > 0) return specEntries;
        const keys = new Set<string>();
        selectedProducts.forEach((p) => {
            const s = p.specifications || {};
            Object.keys(s).forEach((k) => keys.add(k));
        });
        return Array.from(keys).map((k) => [k, {} as Record<string, string>]);
    };

    const rows = getRows();

    const getCell = (productId: string, specKey: string): { value: string; isWinner: boolean } => {
        const row = specs[specKey] as Record<string, string> | undefined;
        if (row) {
            const value = row[productId] ?? '–';
            const winner = row.winner;
            const product = selectedProducts.find((p) => p.id === productId);
            const isWinner = !!winner && winner !== 'tie' && (winner === product?.name || winner === productId);
            return { value, isWinner };
        }
        const p = selectedProducts.find((x) => x.id === productId);
        const v = p?.specifications?.[specKey] ?? '–';
        return { value: v, isWinner: false };
    };

    return (
        <section className="py-10 px-4">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Specification comparison</h2>
                <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="text-left py-4 px-6 font-semibold text-gray-600 w-1/4">Feature</th>
                                    {selectedProducts.map((p) => (
                                        <th key={p.id} className="text-left py-4 px-6 font-bold text-gray-900">
                                            {p.name}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {rows.map(([specKey]) => (
                                    <tr key={specKey} className="hover:bg-gray-50/50">
                                        <td className="py-4 px-6 font-medium text-gray-700 capitalize">
                                            {specKey.replace(/_/g, ' ')}
                                        </td>
                                        {selectedProducts.map((product) => {
                                            const { value, isWinner } = getCell(product.id, specKey);
                                            return (
                                                <td
                                                    key={product.id}
                                                    className={cn(
                                                        'py-4 px-6 text-sm',
                                                        isWinner && 'bg-amber-50 font-semibold text-gray-900'
                                                    )}
                                                >
                                                    {value}
                                                    {isWinner && (
                                                        <span className="inline-flex items-center gap-1 ml-1 text-amber-600">
                                                            <Trophy className="w-3.5 h-3.5" />
                                                        </span>
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
}
