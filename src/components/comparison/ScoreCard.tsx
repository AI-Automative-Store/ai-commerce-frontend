'use client';

import { useCompareStore } from '@/store/compare.store';
import { Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ScoreCard() {
    const { selectedProducts, comparison } = useCompareStore();

    if (!comparison?.score_card || selectedProducts.length < 2) return null;

    const scoreCard = comparison.score_card as Record<string, Record<string, number | string>>;
    const categories = Object.keys(scoreCard).filter((k) => k !== 'winner' && typeof scoreCard[k] === 'object');

    if (categories.length === 0) return null;

    return (
        <div className="w-full max-w-5xl mx-auto mb-16">
            <h3 className="text-xl font-bold text-gray-900 mb-6 px-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                Decision score
            </h3>
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50/80">
                                <th className="text-left py-4 px-6 font-semibold text-gray-500">Category</th>
                                {selectedProducts.map((p) => (
                                    <th key={p.id} className="text-left py-4 px-6 font-bold text-gray-900">
                                        {p.name}
                                    </th>
                                ))}
                                <th className="text-left py-4 px-6 font-semibold text-gray-500">Winner</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {categories.map((cat) => {
                                const row = scoreCard[cat] as Record<string, number | string>;
                                const winner = row.winner as string | undefined;
                                return (
                                    <tr key={cat} className="hover:bg-gray-50/50">
                                        <td className="py-4 px-6 font-medium text-gray-700 capitalize">
                                            {cat.replace(/_/g, ' ')}
                                        </td>
                                        {selectedProducts.map((p) => {
                                            const val = row[p.id];
                                            const num = typeof val === 'number' ? val : '-';
                                            const isWinner = winner === p.name || winner === p.id;
                                            return (
                                                <td
                                                    key={p.id}
                                                    className={cn(
                                                        'py-4 px-6 font-semibold',
                                                        isWinner ? 'text-green-600 bg-green-50/50' : 'text-gray-700'
                                                    )}
                                                >
                                                    {num}
                                                    {isWinner && <span className="ml-1 text-green-600">🏆</span>}
                                                </td>
                                            );
                                        })}
                                        <td className="py-4 px-6 text-sm font-medium text-gray-600">
                                            {winner || '–'}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
