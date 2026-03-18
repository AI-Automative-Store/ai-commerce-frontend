'use client';

import Link from "next/link";
import { CartBadge } from "@/components/cart/CartBadge";
import { useUserStore } from "@/store/user.store";
import { Heart, User, ChevronDown, Menu, X, Shield, ShoppingBag, Search, Scale } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const user = useUserStore((s) => s.user);
    const isAdmin = user?.role === 'admin';

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
                <div className="mx-auto max-w-7xl px-6 flex items-center gap-6">

                    {/* Logo */}
                    <Link href="/" className="text-2xl font-bold tracking-tight text-gray-900 shrink-0">
                        AIStore
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex flex-1 items-center gap-1">
                        <Link href="/" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 rounded-lg transition-colors">Home</Link>
                        <Link href="/shop" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 rounded-lg transition-colors">Shop</Link>
                        <Link href="/ai-search" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 rounded-lg transition-colors">AI Search</Link>
                        <Link href="/compare" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 rounded-lg transition-colors">Compare</Link>
                        <Link href="/wishlist" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 rounded-lg transition-colors">Wishlist</Link>
                        <Link href="/cart" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 rounded-lg transition-colors">Cart</Link>
                    </nav>

                    {/* Right: Admin + Profile */}
                    <div className="flex items-center gap-4 shrink-0 text-gray-700">
                        {isAdmin && (
                            <Link href="/admin" className="hidden sm:flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-100 transition-colors">
                                <Shield className="h-4 w-4" />
                                Admin
                            </Link>
                        )}
                        <Link href={user ? "/profile" : "/login"} className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors" title={user?.email}>
                            <User className="h-5 w-5" />
                            Profile
                        </Link>
                        <div className="hidden sm:block">
                            <CartBadge />
                        </div>

                        <button
                            className="md:hidden text-gray-700 hover:text-primary transition-colors p-2"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden animate-in slide-in-from-top-10">
                    <nav className="flex flex-col gap-1 text-lg font-medium">
                        <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 py-4 border-b border-gray-100">Home</Link>
                        <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 py-4 border-b border-gray-100">
                            <ShoppingBag className="w-5 h-5" /> Shop
                        </Link>
                        <Link href="/ai-search" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 py-4 border-b border-gray-100">
                            <Search className="w-5 h-5" /> AI Search
                        </Link>
                        <Link href="/compare" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 py-4 border-b border-gray-100">
                            <Scale className="w-5 h-5" /> Compare
                        </Link>
                        <Link href="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 py-4 border-b border-gray-100">
                            <Heart className="w-5 h-5" /> Wishlist
                        </Link>
                        <Link href="/cart" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 py-4 border-b border-gray-100">Cart</Link>
                        {isAdmin && (
                            <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 py-4 border-b border-gray-100">
                                <Shield className="w-5 h-5" /> Admin
                            </Link>
                        )}
                        <Link href={user ? "/profile" : "/login"} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 py-4">
                            <User className="w-5 h-5" /> {user ? 'Profile' : 'Login'}
                        </Link>
                    </nav>
                    <div className="pt-6">
                        <CartBadge />
                    </div>
                </div>
            )}
        </>
    );
}
