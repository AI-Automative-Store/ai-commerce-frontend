/**
 * Product Service
 * API calls for product-related operations
 */

import { apiClient } from './api';
import type { Product, ProductFilters } from '@/types/product.types';

export const productService = {
    /**
     * Get all products with optional filters
     */
    async getProducts(filters?: ProductFilters) {
        const queryParams = new URLSearchParams();

        if (filters?.category) queryParams.append('category', filters.category);
        if (filters?.minPrice) queryParams.append('minPrice', filters.minPrice.toString());
        if (filters?.maxPrice) queryParams.append('maxPrice', filters.maxPrice.toString());
        if (filters?.brand) queryParams.append('brand', filters.brand);

        const endpoint = `/products${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
        return apiClient.get<Product[]>(endpoint);
    },

    /**
     * Get single product by slug
     */
    async getProductBySlug(slug: string) {
        return apiClient.get<Product>(`/products/${slug}`);
    },

    /**
     * Get product recommendations based on product ID
     */
    async getRecommendations(productId: string) {
        return apiClient.get<Product[]>(`/products/${productId}/recommendations`);
    },

    /**
     * Compare multiple products
     */
    async compareProducts(productIds: string[]) {
        return apiClient.post<Product[]>('/products/compare', { productIds });
    },
};
