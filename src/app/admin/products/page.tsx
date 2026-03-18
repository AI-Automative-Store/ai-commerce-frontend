'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { productService } from '@/services/product.service';
import { Button } from '@/components/ui/Button';
import { Plus, Pencil, Trash2, Loader2, XCircle } from 'lucide-react';
import type { Product } from '@/types/product.types';

function formatPrice(n: number) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
}

export default function AdminProductsPage() {
    const queryClient = useQueryClient();
    const { data: response, isLoading, isError } = useQuery({
        queryKey: ['products'],
        queryFn: () => productService.getProducts(),
    });

    const deleteMutation = useMutation({
        mutationFn: (productId: string) => productService.deleteProduct(productId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
    });

    const products = (response?.data as { products?: Product[] })?.products ?? [];
    const productsList = Array.isArray(products) ? products : [];

    const getVal = (p: Product & Record<string, unknown>, key: string) => {
        const v = (p as Record<string, unknown>)[key];
        if (key === 'review_count') return (p as Record<string, unknown>).review_count ?? p.reviewCount ?? 0;
        if (key === 'in_stock') return (p as Record<string, unknown>).in_stock ?? p.inStock ?? true;
        return v;
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Products</h1>
                    <p className="mt-1 text-gray-600">Manage your product catalog.</p>
                </div>
                <Link href="/admin/products/new">
                    <Button className="inline-flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Add product
                    </Button>
                </Link>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-16">
                        <Loader2 className="h-10 w-10 animate-spin text-indigo-600 mb-4" />
                        <p className="text-gray-500">Loading products...</p>
                    </div>
                ) : isError ? (
                    <div className="flex flex-col items-center justify-center py-16">
                        <XCircle className="h-10 w-10 text-red-400 mb-4" />
                        <p className="text-gray-700 font-medium">Failed to load products</p>
                        <p className="text-sm text-gray-500 mt-1">Check your connection and try again.</p>
                    </div>
                ) : productsList.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <p className="text-gray-600">No products yet.</p>
                        <Link href="/admin/products/new" className="mt-4">
                            <Button>Add your first product</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Product</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Category</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Brand</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Price</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Stock</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {productsList.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">{product.name}</div>
                                            <div className="text-xs text-gray-500">{product.slug}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{product.category}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{product.brand}</td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{formatPrice(product.price)}</td>
                                        <td className="px-6 py-4">
                                            <span className={getVal(product as Product & Record<string, unknown>, 'in_stock') ? 'text-green-600' : 'text-red-600'}>
                                                {getVal(product as Product & Record<string, unknown>, 'in_stock') ? 'In stock' : 'Out of stock'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={`/admin/products/${encodeURIComponent(product.slug)}/edit`}>
                                                    <Button variant="ghost" size="sm" className="inline-flex items-center gap-1">
                                                        <Pencil className="h-4 w-4" />
                                                        Edit
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="inline-flex items-center gap-1 text-red-600 hover:bg-red-50 hover:text-red-700"
                                                    disabled={deleteMutation.isPending}
                                                    onClick={() => {
                                                        if (window.confirm('Delete this product?')) deleteMutation.mutate(product.id);
                                                    }}
                                                >
                                                    {deleteMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                                                    Delete
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
