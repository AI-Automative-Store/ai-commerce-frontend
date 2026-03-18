'use client';

import { useState, useId } from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import type { ProductCreatePayload, ProductUpdatePayload } from '@/types/product.types';

type FormPayload = ProductCreatePayload | (ProductUpdatePayload & { slug?: string });

interface AdminProductFormProps {
    defaultValues?: Partial<FormPayload & { in_stock?: boolean; review_count?: number }>;
    productId?: string;
    mode: 'create' | 'edit';
    onSubmit: (payload: ProductCreatePayload | ProductUpdatePayload) => Promise<unknown>;
    onCancel: () => void;
    isSubmitting?: boolean;
}

const defaultEmpty: FormPayload = {
    slug: '',
    name: '',
    description: '',
    price: 0,
    original_price: 0,
    discount: 0,
    category: '',
    brand: '',
    images: [],
    features: [],
    tags: [],
    specifications: {},
    rating: 0,
    review_count: 0,
    in_stock: true,
};

function parseLines(s: string): string[] {
    return s
        .split(/[\n,]+/)
        .map((x) => x.trim())
        .filter(Boolean);
}

function parseSpecs(s: string): Record<string, string> {
    const out: Record<string, string> = {};
    s.split('\n').forEach((line) => {
        const idx = line.indexOf(':');
        if (idx > 0) {
            const k = line.slice(0, idx).trim();
            const v = line.slice(idx + 1).trim();
            if (k) out[k] = v;
        }
    });
    return out;
}

function formatSpecs(m: Record<string, string>): string {
    return Object.entries(m)
        .map(([k, v]) => `${k}: ${v}`)
        .join('\n');
}

export function AdminProductForm({
    defaultValues,
    productId,
    mode,
    onSubmit,
    onCancel,
    isSubmitting = false,
}: AdminProductFormProps) {
    const initialForm = (() => {
        const base = { ...defaultEmpty, ...defaultValues };
        const images = Array.isArray(base.images) ? base.images : [];
        const features = Array.isArray(base.features) ? base.features : [];
        const tags = Array.isArray(base.tags) ? base.tags : [];
        return {
            ...base,
            images,
            features,
            tags,
            specifications: base.specifications && typeof base.specifications === 'object' ? base.specifications : {},
        };
    })();

    const [form, setForm] = useState<FormPayload>(initialForm);

    const [imagesText, setImagesText] = useState(
        initialForm.images?.length ? initialForm.images.join('\n') : ''
    );
    const [featuresText, setFeaturesText] = useState(
        initialForm.features?.length ? initialForm.features.join('\n') : ''
    );
    const [tagsText, setTagsText] = useState(
        initialForm.tags?.length ? initialForm.tags.join('\n') : ''
    );
    const [specsText, setSpecsText] = useState(
        formatSpecs(initialForm.specifications || {})
    );
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        const payload = {
            ...form,
            images: parseLines(imagesText),
            features: parseLines(featuresText),
            tags: parseLines(tagsText),
            specifications: parseSpecs(specsText),
            price: Number(form.price) || 0,
            original_price: form.original_price != null ? Number(form.original_price) : undefined,
            discount: form.discount != null ? Number(form.discount) : 0,
            rating: form.rating != null ? Number(form.rating) : 0,
            review_count: form.review_count != null ? Number(form.review_count) : 0,
            in_stock: form.in_stock !== false,
        };
        if (mode === 'create') {
            if (!(payload as ProductCreatePayload).slug?.trim()) {
                setError('Slug is required');
                return;
            }
            if (!(payload as ProductCreatePayload).name?.trim()) {
                setError('Name is required');
                return;
            }
            await onSubmit(payload as ProductCreatePayload);
        } else {
            const { slug: _s, ...rest } = payload;
            await onSubmit(rest as ProductUpdatePayload);
        }
    };

    const id = useId();
    const inputClass = 'rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 w-full';

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                    {error}
                </div>
            )}

            <div className="grid gap-6 sm:grid-cols-2">
                {mode === 'create' && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL-friendly)</label>
                        <input
                            className={inputClass}
                            value={form.slug ?? ''}
                            onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                            placeholder="e.g. my-product-name"
                            required={mode === 'create'}
                        />
                    </div>
                )}
                <div className={mode === 'edit' ? 'sm:col-span-2' : ''}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                        className={inputClass}
                        value={form.name ?? ''}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        placeholder="Product name"
                        required
                    />
                </div>
                <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        className={cn(inputClass, 'min-h-[100px] resize-y')}
                        value={form.description ?? ''}
                        onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                        placeholder="Product description"
                        rows={4}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <input
                        type="number"
                        step="0.01"
                        min="0"
                        className={inputClass}
                        value={form.price ?? ''}
                        onChange={(e) => setForm((f) => ({ ...f, price: e.target.value as unknown as number }))}
                        placeholder="0"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Original price (optional)</label>
                    <input
                        type="number"
                        step="0.01"
                        min="0"
                        className={inputClass}
                        value={form.original_price ?? ''}
                        onChange={(e) => setForm((f) => ({ ...f, original_price: e.target.value as unknown as number }))}
                        placeholder="0"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Discount %</label>
                    <input
                        type="number"
                        min="0"
                        max="100"
                        className={inputClass}
                        value={form.discount ?? 0}
                        onChange={(e) => setForm((f) => ({ ...f, discount: e.target.value as unknown as number }))}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <input
                        className={inputClass}
                        value={form.category ?? ''}
                        onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                        placeholder="e.g. mobiles, laptops"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                    <input
                        className={inputClass}
                        value={form.brand ?? ''}
                        onChange={(e) => setForm((f) => ({ ...f, brand: e.target.value }))}
                        placeholder="Brand name"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rating (0–5)</label>
                    <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        className={inputClass}
                        value={form.rating ?? 0}
                        onChange={(e) => setForm((f) => ({ ...f, rating: e.target.value as unknown as number }))}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Review count</label>
                    <input
                        type="number"
                        min="0"
                        className={inputClass}
                        value={form.review_count ?? 0}
                        onChange={(e) => setForm((f) => ({ ...f, review_count: e.target.value as unknown as number }))}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <input
                        id={`${id}-stock`}
                        type="checkbox"
                        checked={form.in_stock !== false}
                        onChange={(e) => setForm((f) => ({ ...f, in_stock: e.target.checked }))}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor={`${id}-stock`} className="text-sm font-medium text-gray-700">In stock</label>
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URLs (one per line)</label>
                    <textarea
                        className={cn(inputClass, 'min-h-[80px] font-mono text-xs')}
                        value={imagesText}
                        onChange={(e) => setImagesText(e.target.value)}
                        placeholder="https://example.com/image1.jpg"
                        rows={3}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Features (one per line)</label>
                    <textarea
                        className={cn(inputClass, 'min-h-[80px]')}
                        value={featuresText}
                        onChange={(e) => setFeaturesText(e.target.value)}
                        placeholder="Feature one"
                        rows={3}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tags (one per line or comma-separated)</label>
                    <textarea
                        className={cn(inputClass, 'min-h-[60px]')}
                        value={tagsText}
                        onChange={(e) => setTagsText(e.target.value)}
                        placeholder="tag1, tag2"
                        rows={2}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Specifications (key: value per line)</label>
                    <textarea
                        className={cn(inputClass, 'min-h-[80px] font-mono text-xs')}
                        value={specsText}
                        onChange={(e) => setSpecsText(e.target.value)}
                        placeholder="Processor: M3&#10;RAM: 8GB"
                        rows={4}
                    />
                </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 bg-indigo-600 text-white hover:bg-indigo-700 px-5 py-2.5 rounded-xl font-medium"
                >
                    {isSubmitting ? 'Saving...' : mode === 'create' ? 'Create product' : 'Save changes'}
                </Button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}
