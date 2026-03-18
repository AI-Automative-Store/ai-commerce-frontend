'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function SearchPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const q = searchParams.get('q');

    useEffect(() => {
        const url = q ? `/ai-search?q=${encodeURIComponent(q)}` : '/ai-search';
        router.replace(url);
    }, [router, q]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-gray-500">Redirecting to AI Search…</p>
        </div>
    );
}
