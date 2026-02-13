'use client';
// Ensure this is a client component because we use useState and useCart

import { notFound } from 'next/navigation';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatPrice } from '@/lib/format';
import { mockProducts } from '@/lib/mockData';
import { useState, use } from 'react';

// Next.js 15: params is a Promise
interface ProductPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default function ProductPage({ params }: ProductPageProps) {
    // Unwrap params using React.use()
    const resolvedParams = use(params);
    const slug = resolvedParams.slug;

    const { addItem } = useCart();
    const [selectedImage, setSelectedImage] = useState(0);

    const product = mockProducts.find((p) => p.slug === slug);

    if (!product) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
                {/* Product Image Gallery */}
                <div className="mb-8 lg:mb-0">
                    <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden mb-4 relative h-[400px] flex items-center justify-center">
                        {/* Placeholder for Next.js Image */}
                        <img
                            src={product.images[selectedImage]}
                            alt={product.name}
                            className="w-full h-full object-contain"
                        />
                        {product.discount && product.discount > 0 && (
                            <Badge
                                variant="error"
                                className="absolute top-4 right-4 text-sm font-bold px-3 py-1"
                            >
                                {product.discount}% OFF
                            </Badge>
                        )}
                    </div>
                    {product.images.length > 1 && (
                        <div className="grid grid-cols-4 gap-4">
                            {product.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImage(idx)}
                                    className={`relative aspect-w-1 aspect-h-1 rounded-md overflow-hidden bg-gray-100 border-2 ${selectedImage === idx ? 'border-blue-500' : 'border-transparent'
                                        }`}
                                >
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="flex flex-col">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                        <div className="flex items-center mb-4">
                            <div className="flex text-yellow-400">
                                {'★'.repeat(Math.round(product.rating))}
                                <span className="text-gray-300">
                                    {'★'.repeat(5 - Math.round(product.rating))}
                                </span>
                            </div>
                            <span className="text-gray-500 ml-2">({product.reviewCount} reviews)</span>
                        </div>
                        <div className="flex items-baseline gap-4 mb-6">
                            <span className="text-3xl font-bold text-gray-900">
                                {formatPrice(product.price)}
                            </span>
                            {product.originalPrice && product.price < product.originalPrice && (
                                <span className="text-xl text-gray-500 line-through">
                                    {formatPrice(product.originalPrice)}
                                </span>
                            )}
                        </div>

                        <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                            {product.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-8">
                            {product.tags.map((tag) => (
                                <Badge key={tag} variant="default" className="text-sm px-3 py-1">
                                    #{tag}
                                </Badge>
                            ))}
                        </div>

                        <div className="flex gap-4">
                            <Button size="lg" className="flex-1" onClick={() => addItem(product)}>
                                Add to Cart
                            </Button>
                            <Button size="lg" variant="secondary" className="flex-1">
                                Buy Now
                            </Button>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Key Features</h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-600">
                            {product.features.map((feature, idx) => (
                                <li key={idx}>{feature}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
