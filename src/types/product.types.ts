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

export interface ProductFilters {
    category?: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    rating?: number;
    inStock?: boolean;
    tags?: string[];
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
