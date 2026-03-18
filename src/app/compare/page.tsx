'use client';

import { CompareHero } from '@/components/compare/CompareHero';
import { AddProductsSection } from '@/components/compare/AddProductsSection';
import { CompareButton } from '@/components/compare/CompareButton';
import { CompareLoader } from '@/components/compare/CompareLoader';
import { SelectedProductsBar } from '@/components/compare/SelectedProductsBar';
import { AIVerdictCard } from '@/components/compare/AIVerdictCard';
import { ScoreRadar } from '@/components/compare/ScoreRadar';
import { SpecComparisonTable } from '@/components/compare/SpecComparisonTable';
import { ProsConsCards } from '@/components/compare/ProsConsCards';
import { BestForSection } from '@/components/compare/BestForSection';
import { AskAI } from '@/components/compare/AskAI';
import { FinalRecommendation } from '@/components/compare/FinalRecommendation';
import { useCompareStore } from '@/store/compare.store';

export default function ComparePage() {
    const isAnalyzing = useCompareStore((s) => s.isAnalyzing);
    const comparison = useCompareStore((s) => s.comparison);
    const compareError = useCompareStore((s) => s.compareError);

    return (
        <div className="min-h-screen bg-white">
            <CompareHero />
            <AddProductsSection />
            <CompareButton />
            {compareError && (
                <div className="max-w-4xl mx-auto px-4">
                    <p className="text-center text-sm text-red-600 py-2">{compareError}</p>
                </div>
            )}

            {isAnalyzing && <CompareLoader />}

            {comparison && (
                <div className="pb-16">
                    <SelectedProductsBar />
                    <AIVerdictCard />
                    <ScoreRadar />
                    <SpecComparisonTable />
                    <ProsConsCards />
                    <BestForSection />
                    <AskAI />
                    <FinalRecommendation />
                </div>
            )}
        </div>
    );
}
