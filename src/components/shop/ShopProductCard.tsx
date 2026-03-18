'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, Minus, Plus, ImageOff, GitCompare } from 'lucide-react';
import { Product } from '@/types/product.types';
import { useCart } from '@/hooks/useCart';
import { useCompareStore } from '@/store/compare.store';
import { formatPrice } from '@/lib/format';

const PLACEHOLDER_IMAGE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"%3E%3Crect fill="%23f3f4f6" width="400" height="400"/%3E%3C/svg%3E';

interface ShopProductCardProps {
    product: Product;
}

function getProductImageSrc(product: Product): string {
    const first = product.images?.[0];
    if (first && typeof first === 'string' && first.trim() !== '') return first;
    return PLACEHOLDER_IMAGE;
}

export function ShopProductCard({ product }: ShopProductCardProps) {
    const { addItem, getItemQuantity, updateQuantity } = useCart();
    const addToCompare = useCompareStore((s) => s.addProduct);
    const selectedProducts = useCompareStore((s) => s.selectedProducts);
    const quantity = getItemQuantity(product.id);
    const imageSrc = getProductImageSrc(product);
    const inCompare = selectedProducts.some((p) => p.id === product.id);

    return (
        <div className="bg-white rounded-3xl p-4 transition-all duration-300 hover:shadow-lg group border border-transparent hover:border-gray-100">

            {/* Image Container */}
            <div className="relative w-full aspect-square bg-gray-50 rounded-2xl mb-4 overflow-hidden flex items-center justify-center">
                {/* Tag */}
                <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-gray-600">
                    {product.category}
                </div>

                <div className="relative w-3/4 h-3/4 transition-transform duration-500 group-hover:scale-110">
                    {imageSrc === PLACEHOLDER_IMAGE ? (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg" aria-hidden>
                            <ImageOff className="w-12 h-12 text-gray-300" />
                        </div>
                    ) : (
                        <Image
                            src={imageSrc}
                            alt={product.name}
                            fill
                            className="object-contain"
                        />
                    )}
                </div>
            </div>

            {/* Details */}
            <div className="space-y-3">
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-900 line-clamp-1 text-lg">{product.name}</h3>
                    <span className="font-bold text-lg">{formatPrice(product.price)}</span>
                </div>

                <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-900">{product.rating}</span>
                    <span className="text-xs text-gray-400">({product.reviewCount} Reviews)</span>
                </div>

                {/* Buttons - Dual Action */}
                <div className="flex gap-3 pt-2">
                    {quantity > 0 ? (
                        <div className="flex-1 py-1.5 rounded-full border border-black bg-black text-white flex items-center justify-between px-4">
                            <button
                                onClick={() => updateQuantity(product.id, quantity - 1)}
                                className="p-1 hover:bg-white/20 rounded-full transition-colors"
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-bold text-sm">{quantity}</span>
                            <button
                                onClick={() => updateQuantity(product.id, quantity + 1)}
                                className="p-1 hover:bg-white/20 rounded-full transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => addItem(product)}
                            className="flex-1 py-2.5 rounded-full border border-gray-200 text-sm font-semibold hover:bg-black hover:text-white transition-all duration-300"
                        >
                            Add to Cart
                        </button>
                    )}
                    <button className="flex-1 py-2.5 rounded-full bg-black text-white text-sm font-semibold hover:bg-gray-800 transition-colors shadow-lg shadow-black/20">
                        Buy Now
                    </button>
                </div>
                {selectedProducts.length < 4 && (
                    <Link
                        href="/compare"
                        onClick={() => !inCompare && addToCompare(product)}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-purple-600 mt-2"
                    >
                        <GitCompare className="w-3.5 h-3.5" />
                        {inCompare ? 'In compare' : 'Add to compare'}
                    </Link>
                )}
            </div>
        </div>
    );
}
