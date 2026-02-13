'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface SearchBarProps {
    onSearch: (query: string) => void;
    initialQuery?: string;
    className?: string;
}

export function SearchBar({ onSearch, initialQuery = '', className }: SearchBarProps) {
    const [query, setQuery] = useState(initialQuery);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
            <div className="relative grow">
                <Input
                    type="text"
                    placeholder="Try 'best gaming laptop under 80000'"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pr-10"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                    ✨
                </div>
            </div>
            <Button type="submit">Search</Button>
        </form>
    );
}
