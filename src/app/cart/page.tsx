'use client';

import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { formatPrice } from '@/lib/format';
import { CartRecommendations } from '@/components/cart/CartRecommendations';

export default function CartPage() {
    const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCart();
    const total = getTotalPrice();

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
                <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
                <Link href="/">
                    <Button size="lg">Start Shopping</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                <div className="lg:col-span-8">
                    <Card className="divide-y divide-gray-200">
                        {items.map((item) => (
                            <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-4">
                                <div className="w-full sm:w-24 h-24 shrink-0 bg-gray-100 rounded-md overflow-hidden relative">
                                    {/* Placeholder for Next.js Image */}
                                    <img
                                        src={item.images[0]}
                                        alt={item.name}
                                        className="w-full h-full object-cover object-center"
                                    />
                                </div>

                                <div className="flex-1 flex flex-col justify-between">
                                    <div className="flex justify-between">
                                        <div>
                                            <h3 className="text-base font-medium text-gray-900">
                                                <Link href={`/product/${item.slug}`} className="hover:text-blue-600">
                                                    {item.name}
                                                </Link>
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-500">{item.brand}</p>
                                        </div>
                                        <p className="text-base font-medium text-gray-900">
                                            {formatPrice(item.price * item.quantity)}
                                        </p>
                                    </div>

                                    <div className="mt-4 flex items-center justify-between">
                                        <div className="flex items-center border border-gray-300 rounded-md">
                                            <button
                                                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                disabled={item.quantity <= 1}
                                            >
                                                -
                                            </button>
                                            <span className="px-3 py-1 text-gray-900 border-x border-gray-300">
                                                {item.quantity}
                                            </span>
                                            <button
                                                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            >
                                                +
                                            </button>
                                        </div>

                                        <button
                                            type="button"
                                            className="text-sm font-medium text-red-600 hover:text-red-500"
                                            onClick={() => removeItem(item.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Card>
                </div>

                <div className="lg:col-span-4 mt-8 lg:mt-0">
                    <Card className="p-6 bg-gray-50 h-fit sticky top-24">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Subtotal</span>
                                <span className="text-sm font-medium text-gray-900">{formatPrice(total)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Shipping</span>
                                <span className="text-sm font-medium text-gray-900">Free</span>
                            </div>
                            <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                                <span className="text-base font-bold text-gray-900">Total</span>
                                <span className="text-base font-bold text-gray-900">{formatPrice(total)}</span>
                            </div>
                        </div>

                        <div className="mt-6 space-y-3">
                            <Button className="w-full" size="lg">
                                Proceed to Checkout
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={clearCart}
                            >
                                Clear Cart
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Smart Recommendations Section */}
            <CartRecommendations />
        </div>
    );
}
