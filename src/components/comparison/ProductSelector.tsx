'use client';

import { useCompareStore } from '@/store/compare.store';
import { X, Plus } from 'lucide-react';
import Image from 'next/image';

export function ProductSelector() {
    const { selectedProducts, removeProduct } = useCompareStore();

    return (
        <div className="flex flex-wrap items-center justify-center gap-6 mb-12 animate-in fade-in duration-700">
            {selectedProducts.map((product) => (
                <div key={product.id} className="relative group w-40 flex flex-col items-center">
                    <button
                        onClick={() => removeProduct(product.id)}
                        className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-red-50 hover:text-red-500"
                    >
                        <X className="w-4 h-4" />
                    </button>

                    <div className="w-24 h-24 relative mb-3 bg-white rounded-2xl p-2 shadow-sm border border-gray-100 group-hover:border-purple-100 transition-colors">
                        <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-contain p-2"
                        />
                    </div>

                    <div className="text-center">
                        <p className="font-semibold text-sm text-gray-900 line-clamp-1">{product.brand}</p>
                        <p className="text-xs text-gray-500 line-clamp-1">{product.name}</p>
                        <p className="text-xs font-medium text-black mt-1">
                            ₹{product.price.toLocaleString('en-IN')}
                        </p>
                    </div>
                </div>
            ))}

            {selectedProducts.length < 3 && (
                <button className="flex flex-col items-center justify-center w-24 h-24 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400 hover:border-purple-300 hover:text-purple-600 hover:bg-purple-50/50 transition-all group">
                    <Plus className="w-6 h-6 mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-medium">Add</span>
                </button>
            )}
        </div>
    );
}
