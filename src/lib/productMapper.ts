import type { Product } from '@/types/product.types';

/** Normalize API product (snake_case) to frontend Product (camelCase) */
export function apiProductToProduct(p: Record<string, unknown>): Product {
    return {
        id: p.id as string,
        slug: p.slug as string,
        name: p.name as string,
        description: p.description as string,
        price: Number(p.price),
        originalPrice: p.original_price != null ? Number(p.original_price) : undefined,
        discount: p.discount != null ? Number(p.discount) : undefined,
        category: p.category as string,
        brand: p.brand as string,
        images: Array.isArray(p.images) ? (p.images as string[]) : [],
        rating: Number(p.rating ?? 0),
        reviewCount: Number(p.review_count ?? 0),
        inStock: p.in_stock !== false,
        specifications: (p.specifications as Record<string, string>) || {},
        features: Array.isArray(p.features) ? (p.features as string[]) : [],
        tags: Array.isArray(p.tags) ? (p.tags as string[]) : [],
        createdAt: (p.created_at as string) || '',
        updatedAt: (p.updated_at as string) || '',
    };
}
