'use client';

import { AIIntentInput } from '@/components/comparison/AIIntentInput';
import { ProductSelector } from '@/components/comparison/ProductSelector';
import { AIVerdict } from '@/components/comparison/AIVerdict';
import { SmartComparisonTable } from '@/components/comparison/SmartComparisonTable';
import { ProsCons } from '@/components/comparison/ProsCons';
import { DecisionCTA } from '@/components/comparison/DecisionCTA';
import { useEffect } from 'react';
import { useCompareStore } from '@/store/compare.store';

export default function ComparePage() {
    // Initial analysis trigger (optional, or just wait for user input)
    // For demo purposes, we can let user interact first

    return (
        <div className="min-h-screen bg-white">
            {/* Header Section */}
            <div className="bg-gray-50 pt-16 pb-24 px-4 border-b border-gray-100">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full mb-4 tracking-wider uppercase">
                        AI Decision Engine
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                        Don't just compare.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                            Decide with AI.
                        </span>
                    </h1>
                    <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
                        Our AI analyzes thousands of data points to find the perfect product for
                        <span className="italic font-serif text-black mx-1">your specific needs.</span>
                    </p>

                    <AIIntentInput />
                    <ProductSelector />
                </div>
            </div>

            {/* Main Content Area - overlaps the header slightly? No, clean separation is better for this layout. */}
            <div className="px-4 py-12">
                <AIVerdict />
                <SmartComparisonTable />
                <ProsCons />
                <DecisionCTA />
            </div>
        </div>
    );
}

