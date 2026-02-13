import { Product } from '@/types/product.types';
import { mockProducts } from './mockData';

export interface Recommendation {
    product: Product;
    reason: string;
    type: 'accessory' | 'bundle' | 'upgrade';
}

// Rules for "Contextual Intelligence"
// Mapping: Product ID (in cart) -> List of suggested Product IDs with reasons
const RECOMMENDATION_RULES: Record<string, { id: string; reason: string; type: Recommendation['type'] }[]> = {
    // iPhone 15 Pro Max -> AirPods, MacBook
    '1': [
        { id: '12', reason: 'Best seamless pairing with iPhone', type: 'accessory' }, // AirPods Pro
        { id: '6', reason: 'Perfect productivity companion', type: 'bundle' }, // MacBook Pro
    ],
    // Samsung S24 Ultra -> Galaxy Buds
    '2': [
        { id: '13', reason: 'Unlock 360 Audio with Galaxy phone', type: 'accessory' }, // Galaxy Buds
    ],
    // MacBook Pro -> AirPods
    '6': [
        { id: '12', reason: 'Spatial Audio for your movies', type: 'accessory' },
    ],
    // Gaming Laptop (Zephyrus) -> Gaming Mouse (Mocking a mouse or headphones)
    '8': [
        { id: '11', reason: 'Immersive gaming audio', type: 'accessory' }, // Sony Headphones
    ]
};

// Fallback logic for categories
const CATEGORY_RULES: Record<string, { id: string; reason: string; type: Recommendation['type'] }[]> = {
    'mobiles': [
        { id: '12', reason: 'Most popular accessory', type: 'accessory' },
    ],
    'laptops': [
        { id: '11', reason: 'Focus better with noise cancellation', type: 'accessory' },
    ],
    'earphones': [
        { id: '1', reason: 'Upgrade your source device', type: 'upgrade' },
    ]
};

export function getSmartRecommendations(cartItems: Product[]): Recommendation[] {
    const recommendations = new Map<string, Recommendation>();

    // 1. Specific Product Rules
    cartItems.forEach(item => {
        const rules = RECOMMENDATION_RULES[item.id];
        if (rules) {
            rules.forEach(rule => {
                const product = mockProducts.find(p => p.id === rule.id);
                if (product && !recommendations.has(product.id)) {
                    recommendations.set(product.id, { product, reason: rule.reason, type: rule.type });
                }
            });
        }
    });

    // 2. Category Fallbacks (if few recommendations)
    if (recommendations.size < 2) {
        cartItems.forEach(item => {
            const rules = CATEGORY_RULES[item.category];
            if (rules) {
                rules.forEach(rule => {
                    const product = mockProducts.find(p => p.id === rule.id);
                    if (product && !recommendations.has(product.id)) {
                        recommendations.set(product.id, { product, reason: rule.reason, type: rule.type });
                    }
                });
            }
        });
    }

    // Filter out items already in cart
    const cartIds = new Set(cartItems.map(i => i.id));
    const finalRecs: Recommendation[] = [];

    recommendations.forEach(rec => {
        if (!cartIds.has(rec.product.id)) {
            finalRecs.push(rec);
        }
    });

    return finalRecs.slice(0, 4); // Max 4 suggestions
}
