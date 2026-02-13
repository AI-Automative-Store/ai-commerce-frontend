'use client';

import { Search } from 'lucide-react';
import { useFilterStore } from '@/store/filter.store';

export function ShopHero() {
    const { searchQuery, setSearchQuery } = useFilterStore();

    return (
        <div className="relative w-full h-[300px] md:h-[400px] bg-gray-100 rounded-3xl overflow-hidden mb-10">
            {/* Background Image Placeholder - using a room/interior shot to match reference */}
            <div
                className="absolute inset-0 bg-[url('https://i.pinimg.com/1200x/9c/4d/71/9c4d711dd8998d7b9cafbdda616a9267.jpg')] bg-cover bg-center"
            >
                <div className="absolute inset-0 bg-black/10"></div>
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-8xl md:text-9xl font-bold text-white tracking-tighter drop-shadow-sm">
                    Shop
                </h1>

                <div className="absolute bottom-8 left-0 right-0 px-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-left">
                        <h2 className="text-2xl font-bold text-white drop-shadow-md">Give All You Need</h2>
                        <p className="text-white/90 text-sm">Explore our best collections</p>
                    </div>

                    <div className="bg-white rounded-full px-4 py-2 flex items-center gap-2 w-full max-w-md shadow-lg">
                        <Search className="w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search in Shop..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex-1 w-full bg-transparent border-none outline-none text-sm placeholder:text-gray-400 min-w-0"
                        />
                        <button className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
