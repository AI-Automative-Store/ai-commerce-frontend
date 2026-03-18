'use client';

import { useCompareStore } from '@/store/compare.store';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useMemo } from 'react';

const CATEGORIES = ['performance', 'battery', 'camera', 'display', 'value_for_money'] as const;

function formatLabel(key: string): string {
    return key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export function ScoreRadar() {
    const { selectedProducts, comparison } = useCompareStore();

    const chartData = useMemo(() => {
        if (!comparison?.score_card || selectedProducts.length < 2) return [];

        const scoreCard = comparison.score_card as Record<string, Record<string, number | string>>;
        return CATEGORIES.map((cat) => {
            const row = scoreCard[cat];
            if (!row || typeof row !== 'object') return null;
            const point: Record<string, string | number> = { category: formatLabel(cat), fullMark: 10 };
            selectedProducts.forEach((p) => {
                const v = row[p.id];
                point[p.name] = typeof v === 'number' ? v : 0;
            });
            return point;
        }).filter(Boolean) as Record<string, string | number>[];
    }, [comparison, selectedProducts]);

    if (chartData.length === 0) return null;

    const colors = ['#4f46e5', '#059669', '#d97706', '#dc2626'];

    return (
        <section className="py-10 px-4 bg-gray-50/50">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <span className="text-2xl">📊</span>
                    Score card
                </h2>
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="h-[380px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                                <PolarGrid stroke="#e5e7eb" />
                                <PolarAngleAxis
                                    dataKey="category"
                                    tick={{ fill: '#374151', fontSize: 12 }}
                                    tickLine={false}
                                />
                                <PolarRadiusAxis angle={90} domain={[0, 10]} tick={{ fill: '#9ca3af', fontSize: 10 }} />
                                {selectedProducts.map((p, i) => (
                                    <Radar
                                        key={p.id}
                                        name={p.name}
                                        dataKey={p.name}
                                        stroke={colors[i % colors.length]}
                                        fill={colors[i % colors.length]}
                                        fillOpacity={0.2}
                                        strokeWidth={2}
                                    />
                                ))}
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }}
                                    formatter={(value: number) => [`${value}/10`, 'Score']}
                                />
                                <Legend />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </section>
    );
}
