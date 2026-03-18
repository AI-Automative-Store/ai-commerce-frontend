'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services/auth.service';
import { useUserStore } from '@/store/user.store';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const setUser = useUserStore((s) => s.setUser);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginMutation = useMutation({
        mutationFn: authService.login,
        onSuccess: (response) => {
            const data = response.data as { user?: { id: string; email: string; name: string; role: string }; token?: string };
            if (data?.token && data?.user) {
                localStorage.setItem('auth_token', data.token);
                setUser(
                    {
                        id: data.user.id,
                        email: data.user.email,
                        name: data.user.name,
                        role: data.user.role as 'user' | 'admin',
                        createdAt: '',
                        updatedAt: '',
                    },
                    data.token
                );
            }
            const redirect = searchParams.get('redirect');
            if (redirect && redirect.startsWith('/')) {
                router.push(redirect);
            } else {
                router.push(data?.user?.role === 'admin' ? '/admin' : '/');
            }
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        loginMutation.mutate({ email, password });
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
                <div>
                    <h1 className="text-3xl font-extrabold text-center text-gray-900 tracking-tight">Welcome back</h1>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Sign in to your account
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4 rounded-md shadow-sm">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="appearance-none relative block w-full"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none relative block w-full"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    {loginMutation.isError && (
                        <div className="text-red-500 text-sm p-3 bg-red-50 rounded-lg border border-red-100">
                            Failed to login. Please check your credentials.
                        </div>
                    )}

                    <div>
                        <Button
                            type="submit"
                            className="w-full flex justify-center py-2.5"
                            disabled={loginMutation.isPending}
                        >
                            {loginMutation.isPending ? (
                                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                            ) : null}
                            Sign in
                        </Button>
                    </div>
                </form>

                <div className="text-center text-sm">
                    <span className="text-gray-600">Don't have an account? </span>
                    <Link href="/register" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                        Register here
                    </Link>
                </div>
            </div>
        </div>
    );
}
