import { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/Input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useFilterStore } from "@/store/filter.store";
import { mockProducts } from "@/lib/mockData";
import { Product } from "@/types/product.types";
export function AISearch() {
    const { searchQuery, setSearchQuery, setGlobalSearch } = useFilterStore();
    const router = useRouter();
    const [isFocused, setIsFocused] = useState(false);
    const [localQuery, setLocalQuery] = useState(searchQuery);

    // Sync local query with global query state
    useEffect(() => {
        setLocalQuery(searchQuery);
    }, [searchQuery]);

    // Simple mock data filtering for suggestions
    const suggestions = useMemo(() => {
        if (!localQuery || localQuery.length < 2) return [];

        const query = localQuery.toLowerCase();
        return mockProducts
            .filter((product: Product) =>
                product.name.toLowerCase().includes(query) ||
                product.category.toLowerCase().includes(query) ||
                product.brand.toLowerCase().includes(query)
            )
            .slice(0, 5) // Limit to 5 suggestions
            .map((product: Product) => product.name);
    }, [localQuery]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setGlobalSearch(localQuery); // Clear other filters on explicit search
        router.push('/');
        setIsFocused(false);
    };

    const handleSuggestionClick = (suggestion: string) => {
        setLocalQuery(suggestion);
        setGlobalSearch(suggestion); // Clear other filters on suggestion click
        router.push('/');
        setIsFocused(false);
    };

    return (
        <div className="relative w-full max-w-2xl group">
            <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 group-focus-within:text-primary transition-colors z-10" />
                <Input
                    value={localQuery}
                    onChange={(e) => {
                        setLocalQuery(e.target.value);
                        // Real-time search if desired, or just on submit. 
                        // Let's do real-time for "Antigravity" feel but maybe debounced?
                        // For now, let's just set it on change for instant feedback as requested.
                        setSearchQuery(e.target.value);
                    }}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                    placeholder="Search for mobiles, laptops..."
                    className="pl-12 bg-white"
                />
            </form>

            {/* Suggestions Dropdown */}
            {isFocused && (suggestions.length > 0) && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-2">
                        <div className="text-xs font-medium text-gray-400 px-3 py-2 uppercase tracking-wider">
                            Suggestions
                        </div>
                        {suggestions.map((suggestion: string, index: number) => (
                            <button
                                key={index}
                                className="w-full text-left px-3 py-2.5 hover:bg-gray-50 rounded-lg text-sm text-gray-700 flex items-center gap-2 transition-colors"
                                onMouseDown={(e) => {
                                    e.preventDefault(); // Prevent blur before click
                                    handleSuggestionClick(suggestion);
                                }}
                            >
                                <Search className="h-3.5 w-3.5 text-gray-400" />
                                {suggestion}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
