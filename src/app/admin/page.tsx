'use client';

import Link from 'next/link';
import { Package, Plus, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AdminDashboardPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="mt-1 text-gray-600">Manage your store and products.</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Link
                    href="/admin/products"
                    className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-indigo-200 hover:shadow-md"
                >
                    <div className="flex items-start justify-between">
                        <div className="rounded-xl bg-indigo-50 p-3">
                            <Package className="h-8 w-8 text-indigo-600" />
                        </div>
                        <ArrowRight className="h-5 w-5 text-gray-300 transition group-hover:text-indigo-600 group-hover:translate-x-1" />
                    </div>
                    <h2 className="mt-4 text-lg font-semibold text-gray-900">Products</h2>
                    <p className="mt-1 text-sm text-gray-500">Create, edit, and delete products.</p>
                </Link>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <h2 className="text-lg font-semibold text-gray-900">Quick actions</h2>
                <div className="mt-4 flex flex-wrap gap-3">
                    <Link href="/admin/products/new">
                        <Button className="inline-flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Add product
                        </Button>
                    </Link>
                    <Link href="/admin/products">
                        <Button variant="outline" className="inline-flex items-center gap-2">
                            View all products
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
