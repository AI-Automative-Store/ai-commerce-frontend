'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUserStore } from '@/store/user.store';
import { Button } from '@/components/ui/Button';
import { User, LogOut, ArrowLeft } from 'lucide-react';

export default function ProfilePage() {
    const router = useRouter();
    const user = useUserStore((s) => s.user);
    const logout = useUserStore((s) => s.logout);

    const handleLogout = () => {
        logout();
        if (typeof window !== 'undefined') {
            localStorage.removeItem('auth_token');
        }
        router.push('/');
    };

    if (!user) {
        router.replace('/login?redirect=/profile');
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <p className="text-gray-500">Redirecting to login...</p>
            </div>
        );
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <div className="flex items-center gap-4 mb-6">
                    <div className="rounded-full bg-indigo-100 p-3">
                        <User className="h-8 w-8 text-indigo-600" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">{user.name}</h1>
                        <p className="text-sm text-gray-500">{user.email}</p>
                        {user.role === 'admin' && (
                            <Link href="/admin" className="inline-block mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                Open Admin Panel →
                            </Link>
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
                    <Link href="/">
                        <Button variant="outline" className="w-full justify-center gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Back to store
                        </Button>
                    </Link>
                    <Button variant="ghost" className="w-full justify-center gap-2 text-red-600 hover:bg-red-50 hover:text-red-700" onClick={handleLogout}>
                        <LogOut className="h-4 w-4" />
                        Log out
                    </Button>
                </div>
            </div>
        </div>
    );
}
