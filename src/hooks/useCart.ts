/**
 * useCart Hook
 * Custom hook for cart operations
 */

'use client';

import { useCartStore } from '@/store/cart.store';
import type { Product } from '@/types/product.types';

export function useCart() {
    const {
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
    } = useCartStore();

    const isInCart = (productId: string) => {
        return items.some((item) => item.id === productId);
    };

    const getItemQuantity = (productId: string) => {
        const item = items.find((item) => item.id === productId);
        return item?.quantity || 0;
    };

    return {
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
        isInCart,
        getItemQuantity,
    };
}
