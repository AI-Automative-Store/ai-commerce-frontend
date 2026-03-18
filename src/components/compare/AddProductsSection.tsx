'use client';

import { useState, useEffect } from 'react';
import { useCompareStore } from '@/store/compare.store';
import { productService } from '@/services/product.service';
import { apiProductToProduct } from '@/lib/productMapper';
import type { Product } from '@/types/product.types';
import { Plus, X, Search, Loader2 } from 'lucide-react';
import Image from 'next/image';

const MAX_PRODUCTS = 4;

function productImageSrc(p: { images?: string[] }): string | null {
    const first = p.images?.[0];
    if (first && typeof first === 'string' && first.trim() !== '') return first;
    return null;
}

export function AddProductsSection() {
    const { selectedProducts, addProduct, removeProduct } = useCompareStore();
    const [modalOpen, setModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!modalOpen) return;
        setLoading(true);
        const fetchProducts = searchQuery.trim()
            ? productService.searchProducts(searchQuery.trim(), 20)
            : productService.getProducts({ search: undefined });
        fetchProducts
            .then((res) => {
                const data = (res as { data?: { products?: Record<string, unknown>[] } }).data;
                const list = data?.products ?? [];
                setProducts(list.map((p) => apiProductToProduct(p)));
            })
            .catch(() => setProducts([]))
            .finally(() => setLoading(false));
    }, [modalOpen, searchQuery]);

    const handleAdd = (product: Product) => {
        addProduct(product);
        if (selectedProducts.length >= MAX_PRODUCTS - 1) setModalOpen(false);
    };

    const slots = MAX_PRODUCTS - selectedProducts.length;

    return (
        <>
            <section className="py-8 px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Add products</h2>
                    <p className="text-sm text-gray-500 mb-6">Select 2–4 products to compare. Click + Add product to choose from the catalog.</p>

                    <div className="flex flex-wrap items-center gap-4">
                        {selectedProducts.map((product) => {
                            const src = productImageSrc(product);
                            return (
                                <div
                                    key={product.id}
                                    className="flex items-center gap-3 rounded-2xl border-2 border-gray-200 bg-white p-3 pr-2 min-w-[180px]"
                                >
                                    <div className="relative w-12 h-12 rounded-xl bg-gray-100 overflow-hidden shrink-0">
                                        {src ? (
                                            <Image src={src} alt={product.name} fill className="object-contain p-1" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-300 text-lg">?</div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-gray-900 text-sm truncate">{product.name}</p>
                                        <p className="text-xs text-gray-500">₹{Number(product.price).toLocaleString('en-IN')}</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeProduct(product.id)}
                                        className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                                        aria-label="Remove"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            );
                        })}
                        {Array.from({ length: slots }).map((_, i) => (
                            <button
                                key={`slot-${i}`}
                                type="button"
                                onClick={() => setModalOpen(true)}
                                className="flex flex-col items-center justify-center w-[180px] h-24 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/50 transition-colors"
                            >
                                <Plus className="w-8 h-8 mb-1" />
                                <span className="text-sm font-medium">Add product</span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Product selector modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setModalOpen(false)}>
                    <div
                        className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-gray-900">Choose a product</h3>
                            <button
                                type="button"
                                onClick={() => setModalOpen(false)}
                                className="p-2 rounded-lg text-gray-500 hover:bg-gray-100"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-4 border-b border-gray-100">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search products..."
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                        </div>
                        <div className="overflow-y-auto flex-1 p-4">
                            {loading ? (
                                <div className="flex justify-center py-12">
                                    <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                                </div>
                            ) : (
                                <ul className="space-y-2">
                                    {products
                                        .filter((p) => !selectedProducts.some((s) => s.id === p.id))
                                        .slice(0, 15)
                                        .map((product) => {
                                            const src = productImageSrc(product);
                                            return (
                                                <li key={product.id}>
                                                    <div className="flex items-center gap-4 rounded-xl border border-gray-100 p-3 hover:bg-gray-50">
                                                        <div className="relative w-14 h-14 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                                                            {src ? (
                                                                <Image src={src} alt={product.name} fill className="object-contain p-1" />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center text-gray-300">?</div>
                                                            )}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="font-semibold text-gray-900 truncate">{product.name}</p>
                                                            <p className="text-sm text-gray-500">{product.brand} · ₹{Number(product.price).toLocaleString('en-IN')}</p>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleAdd(product)}
                                                            className="shrink-0 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700"
                                                        >
                                                            Add
                                                        </button>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                </ul>
                            )}
                            {!loading && products.length === 0 && (
                                <p className="text-center text-gray-500 py-8">No products found.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
