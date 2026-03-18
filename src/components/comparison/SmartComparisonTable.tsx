'use client';

import { useCompareStore } from '@/store/compare.store';
import { Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SmartComparisonTable() {
    const { selectedProducts, comparison } = useCompareStore();

    if (selectedProducts.length === 0) return null;

    const specComparison = comparison?.specifications_comparison || {};
    const specKeys = Object.keys(specComparison).filter((k) => k !== 'winner');
    const hasSpecComparison = specKeys.length > 0;

    // Fallback: build from product specs if no AI spec comparison
    const getSpecKeys = () => {
        if (hasSpecComparison) return specKeys;
        const keys = new Set<string>();
        selectedProducts.forEach((p) => {
            const specs = p.specifications || (p as Record<string, unknown>).specifications as Record<string, string> | undefined;
            if (specs) Object.keys(specs).forEach((k) => keys.add(k));
        });
        return Array.from(keys);
    };

    const rowKeys = hasSpecComparison ? specKeys : getSpecKeys();

    const getCellValue = (productId: string, specKey: string): { value: string; isWinner: boolean } => {
        if (hasSpecComparison && specComparison[specKey]) {
            const row = specComparison[specKey] as Record<string, string>;
            const value = row[productId] ?? '-';
            const winner = row.winner;
            const product = selectedProducts.find((p) => p.id === productId);
            const isWinner = !!winner && winner !== 'tie' && (winner === product?.name || winner === productId);
            return { value, isWinner };
        }
        const p = selectedProducts.find((x) => x.id === productId);
        const specs = (p?.specifications || (p as Record<string, unknown>)?.specifications) as Record<string, string> | undefined;
        return { value: specs?.[specKey] ?? '-', isWinner: false };
    };

    return (
        <div className="w-full max-w-5xl mx-auto mb-16">
            <h3 className="text-xl font-bold text-gray-900 mb-6 px-4">Technical breakdown</h3>

            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50/80">
                                <th className="text-left py-5 px-6 font-semibold text-gray-500 w-1/4">Specification</th>
                                {selectedProducts.map((product) => (
                                    <th key={product.id} className="text-left py-5 px-6">
                                        <div className="font-bold text-gray-900">{product.name}</div>
                                        {comparison?.winner_id === product.id && (
                                            <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded text-xs font-bold bg-green-100 text-green-700">
                                                <Trophy className="w-3 h-3" /> Winner
                                            </span>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            <tr className="hover:bg-gray-50/50">
                                <td className="py-4 px-6 font-medium text-gray-900">Price</td>
                                {selectedProducts.map((p) => (
                                    <td key={p.id} className="py-4 px-6 font-bold text-lg">
                                        ₹{Number(p.price).toLocaleString('en-IN')}
                                    </td>
                                ))}
                            </tr>
                            {rowKeys.map((key) => (
                                <tr key={key} className="hover:bg-gray-50/50">
                                    <td className="py-4 px-6 font-medium text-gray-600 capitalize">{key.replace(/_/g, ' ')}</td>
                                    {selectedProducts.map((product) => {
                                        const { value, isWinner } = getCellValue(product.id, key);
                                        return (
                                            <td
                                                key={product.id}
                                                className={cn(
                                                    'py-4 px-6 text-sm',
                                                    isWinner ? 'font-semibold text-gray-900 bg-green-50/50' : 'text-gray-600'
                                                )}
                                            >
                                                {value}
                                                {isWinner && <span className="ml-1 text-green-600 text-xs">🏆</span>}
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
    );
}
