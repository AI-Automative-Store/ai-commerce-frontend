'use client';

import Link from "next/link";
import { AISearch } from "@/components/search/AISearch";
import { CartBadge } from "@/components/cart/CartBadge";
import { Heart, User, ChevronDown, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header
                className={cn(
                    "sticky top-0 z-50 w-full transition-all duration-300 border-b border-gray-200",
                    isScrolled
                        ? "bg-white/80 backdrop-blur-xl shadow-sm py-3"
                        : "bg-white/90 backdrop-blur-md py-4"
                )}
            >
                <div className="mx-auto max-w-7xl px-6 flex items-center gap-8">

                    {/* Logo */}
                    <Link href="/" className="text-2xl font-bold tracking-tight text-gray-900 shrink-0">
                        AIStore
                    </Link>

                    {/* Search - Desktop */}
                    <div className="flex-1 hidden md:flex justify-center">
                        <AISearch />
                    </div>

                    {/* Compare Link */}
                    <Link href="/compare" className="hidden md:flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                        Compare
                    </Link>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-6 shrink-0 text-gray-700">

                        {/* Wishlist */}
                        <Link href="/wishlist" className="hover:text-primary transition-colors hidden sm:block group">
                            <Heart className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
                        </Link>

                        {/* Cart */}
                        <div className="hover:scale-105 transition-transform duration-200">
                            <CartBadge />
                        </div>

                        {/* Profile */}
                        <Link href="/account" className="hover:text-primary transition-colors hidden sm:block">
                            <User className="h-6 w-6 hover:scale-110 transition-transform duration-200" />
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden text-gray-700 hover:text-primary transition-colors"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Search Bar (Below header on mobile) */}
                <div className="md:hidden px-4 pb-3 pt-2">
                    <AISearch />
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden animate-in slide-in-from-top-10">
                    <nav className="flex flex-col gap-6 text-lg font-medium">
                        <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between border-b pb-4">
                            Home <ChevronDown className="-rotate-90 w-5 h-5" />
                        </Link>
                        <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between border-b pb-4">
                            Categories <ChevronDown className="-rotate-90 w-5 h-5" />
                        </Link>
                        <Link href="/compare" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between border-b pb-4">
                            AI Compare
                        </Link>
                        <Link href="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3">
                            <Heart className="w-5 h-5" /> Wishlist
                        </Link>
                        <Link href="/account" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3">
                            <User className="w-5 h-5" /> Account
                        </Link>
                    </nav>
                </div>
            )}
        </>
    );
}
