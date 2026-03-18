'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services/auth.service';
import { useUserStore } from '@/store/user.store';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

export default function RegisterPage() {
    const router = useRouter();
    const setUser = useUserStore((s) => s.setUser);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const registerMutation = useMutation({
        mutationFn: authService.register,
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
            router.push('/');
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        registerMutation.mutate({ name, email, password });
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
                <div>
                    <h1 className="text-3xl font-extrabold text-center text-gray-900 tracking-tight">Create an account</h1>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Join us to start shopping
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4 rounded-md shadow-sm">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="appearance-none relative block w-full"
                                placeholder="John Doe"
                            />
                        </div>
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
                                autoComplete="new-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none relative block w-full"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    {registerMutation.isError && (
                        <div className="text-red-500 text-sm p-3 bg-red-50 rounded-lg border border-red-100">
                            Failed to construct account. {registerMutation.error?.message}
                        </div>
                    )}

                    <div>
                        <Button
                            type="submit"
                            className="w-full flex justify-center py-2.5"
                            disabled={registerMutation.isPending}
                        >
                            {registerMutation.isPending ? (
                                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                            ) : null}
                            Create Account
                        </Button>
                    </div>
                </form>

                <div className="text-center text-sm">
                    <span className="text-gray-600">Already have an account? </span>
                    <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                        Sign in instead
                    </Link>
                </div>
            </div>
        </div>
    );
}
