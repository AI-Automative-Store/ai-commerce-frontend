'use client';

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils";

import { useState, useEffect } from "react";

export function CartBadge() {
    const { getTotalItems } = useCart();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <Link href="/cart" className="relative cursor-pointer group p-2 hover:bg-gray-100 rounded-full transition-colors">
                <ShoppingCart className="h-6 w-6 text-gray-700 group-hover:text-primary transition-colors" />
            </Link>
        );
    }

    const cartCount = getTotalItems();

    return (
        <Link href="/cart" className="relative cursor-pointer group p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ShoppingCart className="h-6 w-6 text-gray-700 group-hover:text-primary transition-colors" />
            {cartCount > 0 && (
                <Badge count={cartCount} className="group-hover:scale-110 transition-transform" />
            )}
        </Link>
    );
}
