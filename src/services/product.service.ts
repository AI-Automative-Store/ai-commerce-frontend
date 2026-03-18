/**
 * Product Service
 * API calls for product-related operations
 */

import { apiClient } from './api';
import type {
    Product,
    ProductFilters,
    PaginatedProducts,
    ProductCreatePayload,
    ProductUpdatePayload,
    CompareResponse,
    AISearchResponse,
} from '@/types/product.types';

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
        if (filters?.search?.trim()) queryParams.append('search', filters.search.trim());

        const endpoint = `/products${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
        return apiClient.get<PaginatedProducts>(endpoint);
    },

    /**
     * Search products by text (name, description, brand, category). Use for compare search bar.
     */
    async searchProducts(query: string, limit = 10) {
        if (!query?.trim()) return apiClient.get<PaginatedProducts>('/products?limit=10');
        return apiClient.get<PaginatedProducts>(`/products?search=${encodeURIComponent(query.trim())}&limit=${limit}`);
    },

    /**
     * AI Product Advisor: natural language query → intent extraction → DB query → LLM ranking.
     */
    async aiSearch(query: string) {
        return apiClient.post<AISearchResponse>('/products/ai-search', { query: query.trim() });
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
     * AI compare 2–4 products. Returns products + comparison (summary, score card, pros/cons, verdict).
     */
    async compareProducts(params: {
        productIds: string[];
        priority?: string;
        intent?: string;
    }) {
        return apiClient.post<CompareResponse>('/products/compare', {
            productIds: params.productIds,
            priority: params.priority,
            intent: params.intent,
        });
    },

    // ─── Admin (requires auth token) ─────────────────────────────────────────

    async createProduct(body: ProductCreatePayload) {
        return apiClient.post<Product>('/products', body);
    },

    async updateProduct(productId: string, body: ProductUpdatePayload) {
        return apiClient.put<Product>(`/products/${productId}`, body);
    },

    async deleteProduct(productId: string) {
        return apiClient.delete<null>(`/products/${productId}`);
    },
};
