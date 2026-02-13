'use client';

import { PromoBanner } from './PromoBanner';

export function HeroSection() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <div className="flex flex-col md:flex-row">
                <div className="flex-1">
                    <PromoBanner />
                </div>
            </div>
        </div>
    );
}
