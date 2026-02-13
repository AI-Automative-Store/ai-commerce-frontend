'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatPrice } from '@/lib/format';
import type { Product } from '@/types/product.types';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const { addItem } = useCart();

    return (
        <Card className="h-full flex flex-col group hover:shadow-lg transition-shadow duration-200">
            <div className="relative pt-[75%] bg-gray-100 overflow-hidden">
                {/* Placeholder for Next.js Image - using simple img for now if external generic */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
                {product.discount && product.discount > 0 && (
                    <Badge
                        variant="error"
                        className="absolute top-2 right-2 text-xs font-bold"
                    >
                        {product.discount}% OFF
                    </Badge>
                )}
            </div>

            <CardContent className="grow flex flex-col p-4">
                <div className="mb-2">
                    <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                        {product.brand}
                    </span>
                </div>
                <Link href={`/product/${product.slug}`} className="group-hover:text-blue-600 transition-colors">
                    <h3 className="text-lg font-medium text-gray-900 line-clamp-2 mb-2">
                        {product.name}
                    </h3>
                </Link>
                <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400 text-sm">
                        {'★'.repeat(Math.round(product.rating))}
                        <span className="text-gray-300">
                            {'★'.repeat(5 - Math.round(product.rating))}
                        </span>
                    </div>
                    <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
                </div>
                <div className="mt-auto">
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-gray-900">
                            {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && product.price < product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                                {formatPrice(product.originalPrice)}
                            </span>
                        )}
                    </div>
                </div>
            </CardContent>

            <CardFooter className="p-4 pt-0 border-t-0 bg-transparent">
                <Button
                    className="w-full"
                    onClick={() => addItem(product)}
                >
                    Add to Cart
                </Button>
            </CardFooter>
        </Card>
    );
}
