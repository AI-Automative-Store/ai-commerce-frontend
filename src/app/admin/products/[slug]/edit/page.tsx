'use client';

import { useRouter, useParams } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { productService } from '@/services/product.service';
import { AdminProductForm } from '@/components/admin/AdminProductForm';
import type { ProductUpdatePayload } from '@/types/product.types';
import { ArrowLeft, Loader2, XCircle } from 'lucide-react';

function toFormValues(p: Record<string, unknown>): Partial<ProductUpdatePayload & { slug?: string }> {
    return {
        slug: p.slug as string,
        name: p.name as string,
        description: p.description as string,
        price: p.price as number,
        original_price: p.original_price as number | undefined,
        discount: p.discount as number | undefined,
        category: p.category as string,
        brand: p.brand as string,
        images: Array.isArray(p.images) ? (p.images as string[]) : [],
        features: Array.isArray(p.features) ? (p.features as string[]) : [],
        tags: Array.isArray(p.tags) ? (p.tags as string[]) : [],
        specifications: (p.specifications as Record<string, string>) || {},
        rating: p.rating as number | undefined,
        review_count: p.review_count as number | undefined,
        in_stock: p.in_stock as boolean | undefined,
    };
}

export default function EditProductPage() {
    const router = useRouter();
    const params = useParams();
    const slug = typeof params.slug === 'string' ? decodeURIComponent(params.slug) : '';
    const queryClient = useQueryClient();

    const { data: response, isLoading, isError } = useQuery({
        queryKey: ['product', slug],
        queryFn: () => productService.getProductBySlug(slug),
        enabled: !!slug,
    });

    const product = (response?.data as Record<string, unknown>) ?? null;
    const productId = product?.id as string | undefined;

    const updateMutation = useMutation({
        mutationFn: ({ id, body }: { id: string; body: ProductUpdatePayload }) =>
            productService.updateProduct(id, body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            queryClient.invalidateQueries({ queryKey: ['product', slug] });
            router.push('/admin/products');
        },
    });

    if (!slug) {
        return (
            <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
                <p className="text-gray-600">Invalid product.</p>
                <Link href="/admin/products" className="mt-4 inline-block text-indigo-600 hover:underline">Back to products</Link>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-16">
                <Loader2 className="h-10 w-10 animate-spin text-indigo-600 mb-4" />
                <p className="text-gray-500">Loading product...</p>
            </div>
        );
    }

    if (isError || !product || !productId) {
        return (
            <div className="flex flex-col items-center justify-center py-16">
                <XCircle className="h-10 w-10 text-red-400 mb-4" />
                <p className="text-gray-700 font-medium">Product not found</p>
                <Link href="/admin/products" className="mt-4 text-indigo-600 hover:underline">Back to products</Link>
            </div>
        );
    }

    const defaultValues = toFormValues(product);

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
                <h1 className="text-2xl font-bold text-gray-900">Edit product</h1>
                <p className="mt-1 text-gray-600">{defaultValues.name}</p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <AdminProductForm
                    defaultValues={defaultValues}
                    productId={productId}
                    mode="edit"
                    onSubmit={async (payload) => {
                        await updateMutation.mutateAsync({ id: productId, body: payload as ProductUpdatePayload });
                    }}
                    onCancel={() => router.push('/admin/products')}
                    isSubmitting={updateMutation.isPending}
                />
            </div>
        </div>
    );
}
