'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useUserStore } from '@/store/user.store';
import { LayoutDashboard, Package, ArrowLeft, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const user = useUserStore((s) => s.user);
    const isAdmin = user?.role === 'admin';
    const isAuthenticated = !!useUserStore((s) => s.token);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (!isAuthenticated) {
            router.replace('/login?redirect=' + encodeURIComponent(pathname || '/admin'));
            return;
        }
        if (!isAdmin) {
            router.replace('/');
        }
    }, [isAuthenticated, isAdmin, router, pathname]);

    if (!isAuthenticated || !isAdmin) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="flex flex-col items-center gap-4">
                    <Shield className="w-12 h-12 text-gray-400" />
                    <p className="text-gray-600">Checking access...</p>
                </div>
            </div>
        );
    }

    const nav = [
        { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/admin/products', label: 'Products', icon: Package },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Admin header */}
            <header className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center gap-8">
                            <Link
                                href="/admin"
                                className="flex items-center gap-2 text-lg font-bold text-gray-900"
                            >
                                <Shield className="h-6 w-6 text-indigo-600" />
                                Admin
                            </Link>
                            <nav className="hidden md:flex items-center gap-1">
                                {nav.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                                            (pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href)))
                                                ? 'bg-indigo-50 text-indigo-700'
                                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                        )}
                                    >
                                        <item.icon className="h-4 w-4" />
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-500 hidden sm:block">{user?.email}</span>
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back to store
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
}
