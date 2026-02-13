'use client';

import { clsx } from 'clsx';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/format';
import type { Product } from '@/types/product.types';

interface ComparisonTableProps {
    products: Product[];
}

export function ComparisonTable({ products }: ComparisonTableProps) {
    const { addItem } = useCart();

    if (products.length === 0) {
        return <div>No products to compare</div>;
    }

    // Extract all unique feature keys (this would be more dynamic in a real app)
    // For now, we'll use a fixed list based on our mock data structure
    const features = [
        { label: 'Price', key: 'price', render: (p: Product) => formatPrice(p.price) },
        { label: 'Rating', key: 'rating', render: (p: Product) => `${p.rating} / 5` },
        { label: 'Brand', key: 'brand', render: (p: Product) => p.brand },
        { label: 'Category', key: 'category', render: (p: Product) => p.category },
        { label: 'In Stock', key: 'inStock', render: (p: Product) => p.inStock ? 'Yes' : 'No' },
    ];

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        <th className="px-6 py-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                            Feature
                        </th>
                        {products.map((product) => (
                            <th key={product.id} className="px-6 py-4 bg-white text-left text-sm font-bold text-gray-900 w-1/4 min-w-[200px]">
                                <div className="flex flex-col gap-2">
                                    <div className="h-32 w-full bg-gray-100 rounded-md overflow-hidden relative">
                                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain" />
                                    </div>
                                    <span>{product.name}</span>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {features.map((feature) => (
                        <tr key={feature.label}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
                                {feature.label}
                            </td>
                            {products.map((product) => (
                                <td key={product.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {feature.render(product)}
                                </td>
                            ))}
                        </tr>
                    ))}

                    {/* Mock AI Analysis Row */}
                    <tr>
                        <td className="px-6 py-4 text-sm font-medium text-blue-900 bg-blue-50">
                            AI Analysis
                        </td>
                        {products.map((product) => (
                            <td key={product.id} className="px-6 py-4 text-sm text-gray-600 bg-blue-50/30 align-top">
                                <p>
                                    {product.rating > 4.7 ? '✨ Top Rated choice.' : '👍 Good value option.'}
                                    {' ' + product.features[0]}
                                </p>
                            </td>
                        ))}
                    </tr>

                    <tr>
                        <td className="px-6 py-4 bg-gray-50"></td>
                        {products.map((product) => (
                            <td key={product.id} className="px-6 py-4">
                                <Button className="w-full" onClick={() => addItem(product)}>
                                    Add to Cart
                                </Button>
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
