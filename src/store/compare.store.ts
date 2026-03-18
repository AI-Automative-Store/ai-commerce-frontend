import { create } from 'zustand';
import { Product } from '@/types/product.types';
import type { ComparisonResult } from '@/types/product.types';
import { productService } from '@/services/product.service';
import { apiProductToProduct } from '@/lib/productMapper';

export interface AIVerdictType {
    winnerId: string;
    reasoning: string;
    scores: {
        [productId: string]: {
            performance: number;
            display: number;
            battery: number;
            overall: number;
        };
    };
    prosCons: {
        [productId: string]: {
            pros: string[];
            cons: string[];
        };
    };
}

const LOADING_STEPS = [
    'AI analyzing 200+ data points…',
    'Comparing specifications…',
    'Calculating performance scores…',
    'Generating verdict…',
];

interface CompareState {
    selectedProducts: Product[];
    intent: string;
    priority: string | null;
    isAnalyzing: boolean;
    loadingStep: string;
    aiVerdict: AIVerdictType | null;
    comparison: ComparisonResult | null;
    compareError: string | null;

    addProduct: (product: Product) => void;
    removeProduct: (productId: string) => void;
    setIntent: (intent: string) => void;
    setPriority: (priority: string | null) => void;
    analyzeComparison: () => Promise<void>;
    clearComparison: () => void;
}

function mapComparisonToVerdict(comparison: ComparisonResult, productIds: string[]): AIVerdictType {
    const winnerId = comparison.winner_id || productIds[0];
    const scoreCard = comparison.score_card || {};
    const scores: AIVerdictType['scores'] = {};
    productIds.forEach((id) => {
        const perf = typeof scoreCard.performance?.[id] === 'number' ? scoreCard.performance[id] as number : 8;
        const disp = typeof scoreCard.display?.[id] === 'number' ? scoreCard.display[id] as number : 8;
        const bat = typeof scoreCard.battery?.[id] === 'number' ? scoreCard.battery[id] as number : 8;
        scores[id] = {
            performance: perf,
            display: disp,
            battery: bat,
            overall: Number((((perf + disp + bat) / 3)).toFixed(1)),
        };
    });
    return {
        winnerId,
        reasoning: comparison.final_verdict || comparison.summary || 'AI comparison complete.',
        scores,
        prosCons: comparison.pros_cons || {},
    };
}

export const useCompareStore = create<CompareState>((set, get) => ({
    selectedProducts: [],
    intent: '',
    priority: null,
    isAnalyzing: false,
    loadingStep: LOADING_STEPS[0],
    aiVerdict: null,
    comparison: null,
    compareError: null,

    addProduct: (product) => {
        const { selectedProducts } = get();
        if (selectedProducts.length < 4 && !selectedProducts.find((p) => p.id === product.id)) {
            set({ selectedProducts: [...selectedProducts, product] });
        }
    },

    removeProduct: (productId) => {
        set((state) => ({
            selectedProducts: state.selectedProducts.filter((p) => p.id !== productId),
            comparison: null,
            aiVerdict: null,
            compareError: null,
        }));
    },

    setIntent: (intent) => set({ intent }),

    setPriority: (priority) => set({ priority }),

    clearComparison: () => set({ comparison: null, aiVerdict: null, compareError: null }),

    analyzeComparison: async () => {
        const { selectedProducts, priority, intent } = get();
        set({ isAnalyzing: true, compareError: null, loadingStep: LOADING_STEPS[0] });

        if (selectedProducts.length < 2) {
            set({ isAnalyzing: false, compareError: 'Select at least 2 products to compare.' });
            return;
        }
        if (selectedProducts.length > 4) {
            set({ isAnalyzing: false, compareError: 'Select at most 4 products.' });
            return;
        }

        // Cycle loading steps every 800ms
        const stepInterval = setInterval(() => {
            const state = get();
            if (!state.isAnalyzing) return;
            const idx = LOADING_STEPS.indexOf(state.loadingStep);
            const next = (idx + 1) % LOADING_STEPS.length;
            set({ loadingStep: LOADING_STEPS[next] });
        }, 800);

        try {
            const res = await productService.compareProducts({
                productIds: selectedProducts.map((p) => p.id),
                priority: priority || undefined,
                intent: intent.trim() || undefined,
            });
            const data = (res as { data?: { products?: Record<string, unknown>[]; comparison?: ComparisonResult } }).data;
            if (!data?.products || !data?.comparison) {
                set({ isAnalyzing: false, compareError: 'Invalid response from server.' });
                return;
            }
            const products = data.products.map((p) => apiProductToProduct(p));
            const comparison = data.comparison;
            const productIds = products.map((p) => p.id);
            const aiVerdict = mapComparisonToVerdict(comparison, productIds);
            clearInterval(stepInterval);
            set({
                selectedProducts: products,
                comparison,
                aiVerdict,
                isAnalyzing: false,
                loadingStep: LOADING_STEPS[0],
                compareError: null,
            });
        } catch (e) {
            clearInterval(stepInterval);
            set({
                isAnalyzing: false,
                loadingStep: LOADING_STEPS[0],
                compareError: e instanceof Error ? e.message : 'Comparison failed. Try again.',
            });
        }
    },
}));
