'use client';

import { useCompareStore } from '@/store/compare.store';
import { Check, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SmartComparisonTable() {
    const { selectedProducts, aiVerdict } = useCompareStore();

    if (selectedProducts.length === 0) return null;

    // Get all unique spec keys from all products
    const getSpecKeys = () => {
        const keys = new Set<string>();
        selectedProducts.forEach(p => {
            if (p.specifications) {
                Object.keys(p.specifications).forEach(k => keys.add(k));
            }
        });
        return Array.from(keys);
    };

    const specKeys = getSpecKeys();

    return (
        <div className="w-full max-w-5xl mx-auto mb-16 animate-in slide-in-from-bottom-8 duration-700 delay-100">
            <div className="flex items-center justify-between mb-6 px-4">
                <h3 className="text-xl font-bold text-gray-900">Technical Breakdown</h3>
                <div className="flex border border-gray-200 rounded-lg p-1 bg-white">
                    <button className="px-3 py-1 text-xs font-semibold bg-black text-white rounded-md shadow-sm">All Specs</button>
                    <button className="px-3 py-1 text-xs font-medium text-gray-500 hover:text-black">Differences Only</button>
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="text-left py-5 px-6 font-semibold text-gray-500 w-1/4">Specification</th>
                                {selectedProducts.map(product => (
                                    <th key={product.id} className="text-left py-5 px-6">
                                        <div className="font-bold text-gray-900">{product.name}</div>
                                        {aiVerdict?.winnerId === product.id && (
                                            <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700">WINNER</span>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {/* Price Row */}
                            <tr className="group hover:bg-gray-50/50 transition-colors">
                                <td className="py-4 px-6 font-medium text-gray-900">Price</td>
                                {selectedProducts.map(product => (
                                    <td key={product.id} className="py-4 px-6 font-bold text-lg">
                                        ₹{product.price.toLocaleString('en-IN')}
                                    </td>
                                ))}
                            </tr>

                            {/* Dynamic Specs */}
                            {specKeys.map((key) => (
                                <tr key={key} className="group hover:bg-gray-50/50 transition-colors">
                                    <td className="py-4 px-6 font-medium text-gray-600">{key}</td>
                                    {selectedProducts.map(product => {
                                        const val = product.specifications?.[key] || '-';

                                        // Highlight logic (mocked - normally AI driven)
                                        // For now, simpler: if it's the winner, slight bold?
                                        const isWinner = aiVerdict?.winnerId === product.id;

                                        return (
                                            <td key={product.id} className={cn(
                                                "py-4 px-6 text-sm",
                                                isWinner ? "font-semibold text-gray-900" : "text-gray-600"
                                            )}>
                                                {val}
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
