/**
 * Application Constants
 */

export const APP_NAME = 'AI Commerce';
export const APP_DESCRIPTION = 'AI-Powered E-Commerce Platform';

export const API_ENDPOINTS = {
    PRODUCTS: '/products',
    AUTH: '/auth',
    SEARCH: '/search',
    CART: '/cart',
    WISHLIST: '/wishlist',
} as const;

export const CATEGORIES = [
    { id: 'mobiles', name: 'Mobiles', slug: 'mobiles' },
    { id: 'laptops', name: 'Laptops', slug: 'laptops' },
    { id: 'electronics', name: 'Electronics', slug: 'electronics' },
    { id: 'accessories', name: 'Accessories', slug: 'accessories' },
] as const;

export const SORT_OPTIONS = [
    { value: 'popularity', label: 'Popularity' },
    { value: 'price-low-high', label: 'Price: Low to High' },
    { value: 'price-high-low', label: 'Price: High to Low' },
    { value: 'rating', label: 'Customer Rating' },
    { value: 'newest', label: 'Newest First' },
] as const;

export const PRICE_RANGES = [
    { min: 0, max: 10000, label: 'Under ₹10,000' },
    { min: 10000, max: 25000, label: '₹10,000 - ₹25,000' },
    { min: 25000, max: 50000, label: '₹25,000 - ₹50,000' },
    { min: 50000, max: 100000, label: '₹50,000 - ₹1,00,000' },
    { min: 100000, max: Infinity, label: 'Above ₹1,00,000' },
] as const;
