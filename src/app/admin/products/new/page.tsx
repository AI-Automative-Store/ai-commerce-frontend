'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { productService } from '@/services/product.service';
import { AdminProductForm } from '@/components/admin/AdminProductForm';
import type { ProductCreatePayload } from '@/types/product.types';
import { ArrowLeft } from 'lucide-react';

export default function NewProductPage() {
    const router = useRouter();
    const createMutation = useMutation({
        mutationFn: (body: ProductCreatePayload) => productService.createProduct(body),
        onSuccess: () => {
            router.push('/admin/products');
        },
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link
                    href="/admin/products"
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to products
                </Link>
            </div>
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Add product</h1>
                <p className="mt-1 text-gray-600">Create a new product in your catalog.</p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <AdminProductForm
                    mode="create"
                    onSubmit={async (payload) => {
                        await createMutation.mutateAsync(payload as ProductCreatePayload);
                    }}
                    onCancel={() => router.push('/admin/products')}
                    isSubmitting={createMutation.isPending}
                />
            </div>
        </div>
    );
}
