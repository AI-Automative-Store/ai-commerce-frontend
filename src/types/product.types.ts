/**
 * Product Type Definitions
 */

export interface Product {
    id: string;
    slug: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    category: string;
    brand: string;
    images: string[];
    rating: number;
    reviewCount: number;
    inStock: boolean;
    specifications: Record<string, string>;
    features: string[];
    tags: string[];
    createdAt: string;
    updatedAt: string;
}

export interface PaginatedProducts {
    products: Product[];
    total: number;
    page: number;
    limit: number;
    total_pages: number;
}

export interface ProductFilters {
    category?: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    rating?: number;
    inStock?: boolean;
    tags?: string[];
    /** Text search (name, description, brand, category) */
    search?: string;
}

export interface SearchFilters extends ProductFilters {
    sortBy?: 'price' | 'rating' | 'popularity' | 'newest';
    sortOrder?: 'asc' | 'desc';
}

export interface ProductComparison {
    products: Product[];
    differences: {
        [key: string]: {
            values: any[];
            isDifferent: boolean;
        };
    };
}

/** Admin API: create product payload (snake_case for backend) */
export interface ProductCreatePayload {
    slug: string;
    name: string;
    description: string;
    price: number;
    original_price?: number;
    discount?: number;
    category: string;
    brand: string;
    images: string[];
    features: string[];
    tags: string[];
    specifications: Record<string, string>;
    rating?: number;
    review_count?: number;
    in_stock?: boolean;
}

/** Admin API: update product payload (partial, snake_case) */
export interface ProductUpdatePayload {
    name?: string;
    description?: string;
    price?: number;
    original_price?: number;
    discount?: number;
    category?: string;
    brand?: string;
    images?: string[];
    features?: string[];
    tags?: string[];
    specifications?: Record<string, string>;
    rating?: number;
    review_count?: number;
    in_stock?: boolean;
}

/** AI Compare API response */
export interface ComparisonResult {
    summary?: string | null;
    specifications_comparison?: Record<string, Record<string, string>>;
    score_card?: Record<string, Record<string, number | string>>;
    pros_cons?: Record<string, { pros: string[]; cons: string[] }>;
    best_for?: Record<string, string[]>;
    final_verdict?: string | null;
    winner_id?: string | null;
}

export interface CompareResponse {
    products: Product[];
    comparison: ComparisonResult;
}

/** AI Search (Product Advisor) */
export interface AISearchFilters {
    category?: string | null;
    price_max?: number | null;
    price_min?: number | null;
    priority_features?: string[];
    keywords?: string[];
}

export interface AIRecommendationItem {
    product: Product;
    ai_reason: string;
    score: number;
}

export interface AISearchResponse {
    query: string;
    filters: AISearchFilters;
    recommendations: AIRecommendationItem[];
}
