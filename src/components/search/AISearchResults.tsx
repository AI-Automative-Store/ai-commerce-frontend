'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCompareStore } from '@/store/compare.store';
import { apiProductToProduct } from '@/lib/productMapper';
import type { AISearchResponse, AIRecommendationItem } from '@/types/product.types';
import { Sparkles, GitCompare, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

function productImageSrc(p: { images?: string[] }): string | null {
    const first = p.images?.[0];
    if (first && typeof first === 'string' && first.trim() !== '') return first;
    return null;
}

function Section1Understanding({ data }: { data: AISearchResponse }) {
    const f = data.filters;
    return (
        <div className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-6 mb-10">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                AI understood your needs
            </h2>
            <div className="flex flex-wrap gap-4 text-sm">
                {f.category && (
                    <div>
                        <span className="text-gray-500">Category</span>
                        <p className="font-semibold text-gray-900 capitalize">{f.category}</p>
                    </div>
                )}
                {(f.price_max != null || f.price_min != null) && (
                    <div>
                        <span className="text-gray-500">Budget</span>
                        <p className="font-semibold text-gray-900">
                            {f.price_min != null && f.price_max != null
                                ? `₹${Number(f.price_min).toLocaleString('en-IN')} – ₹${Number(f.price_max).toLocaleString('en-IN')}`
                                : f.price_max != null
                                  ? `Under ₹${Number(f.price_max).toLocaleString('en-IN')}`
                                  : `From ₹${Number(f.price_min).toLocaleString('en-IN')}`}
                        </p>
                    </div>
                )}
                {f.priority_features && f.priority_features.length > 0 && (
                    <div>
                        <span className="text-gray-500">Priority</span>
                        <p className="font-semibold text-gray-900 capitalize">
                            {f.priority_features.join(', ')}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

function RecommendationCard({
    item,
    index,
}: {
    item: AIRecommendationItem;
    index: number;
}) {
    const addProduct = useCompareStore((s) => s.addProduct);
    const product = item.product && typeof item.product === 'object'
        ? apiProductToProduct(item.product as unknown as Record<string, unknown>)
        : null;
    if (!product) return null;

    const src = productImageSrc(product);
    const isBest = index === 0;

    return (
        <div
            className={cn(
                'rounded-2xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-md',
                isBest ? 'border-amber-200 ring-2 ring-amber-100' : 'border-gray-200'
            )}
        >
            {isBest && (
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold mb-4">
                    ⭐ Best match
                </div>
            )}
            <div className="flex gap-4">
                <div className="relative w-24 h-24 rounded-xl bg-gray-100 shrink-0 overflow-hidden">
                    {src ? (
                        <Image src={src} alt={product.name} fill className="object-contain p-2" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 text-2xl">?</div>
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 text-lg">{product.name}</h3>
                    <p className="text-lg font-bold text-gray-900 mt-1">
                        ₹{Number(product.price).toLocaleString('en-IN')}
                    </p>
                    <div className="flex items-center gap-1 mt-1 text-sm text-gray-500">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span>{Number(product.rating).toFixed(1)}</span>
                    </div>
                    {product.specifications && Object.keys(product.specifications).length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2 text-xs">
                            {Object.entries(product.specifications)
                                .slice(0, 3)
                                .map(([k, v]) => (
                                    <span key={k} className="text-gray-600">
                                        {k}: <strong>{v}</strong>
                                    </span>
                                ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">AI insight</p>
                <p className="text-gray-700 text-sm italic">&quot;{item.ai_reason}&quot;</p>
            </div>
            <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Score: {item.score}/10</span>
                <Link
                    href="/compare"
                    onClick={() => addProduct(product)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
                >
                    <GitCompare className="w-4 h-4" />
                    Compare with others
                </Link>
            </div>
        </div>
    );
}

export function AISearchResults({ data }: { data: AISearchResponse }) {
    const recs = data.recommendations || [];

    return (
        <div className="max-w-3xl mx-auto">
            <Section1Understanding data={data} />

            <h2 className="text-xl font-bold text-gray-900 mb-4">Recommended for you</h2>
            <div className="space-y-6">
                {recs.map((item, i) => (
                    <RecommendationCard key={item.product?.id || i} item={item} index={i} />
                ))}
            </div>
            {recs.length === 0 && (
                <p className="text-center text-gray-500 py-8">No recommendations. Try a different query.</p>
            )}
        </div>
    );
}
