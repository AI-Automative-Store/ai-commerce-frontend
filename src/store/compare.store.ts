import { create } from 'zustand';
import { Product } from '@/types/product.types';
import { mockProducts } from '@/lib/mockData';

export interface AIVerdictType {
    winnerId: string;
    reasoning: string;
    scores: {
        [productId: string]: {
            performance: number;
            display: number;
            battery: number;
            overall: number;
        }
    };
    prosCons: {
        [productId: string]: {
            pros: string[];
            cons: string[];
        }
    };
}

interface CompareState {
    selectedProducts: Product[];
    intent: string;
    isAnalyzing: boolean;
    aiVerdict: AIVerdictType | null;

    // Actions
    addProduct: (product: Product) => void;
    removeProduct: (productId: string) => void;
    setIntent: (intent: string) => void;
    analyzeComparison: () => void; // Mock analysis
}

export const useCompareStore = create<CompareState>((set, get) => ({
    selectedProducts: mockProducts.slice(0, 2), // Default with first 2 products for demo
    intent: '',
    isAnalyzing: false,
    aiVerdict: null,

    addProduct: (product) => {
        const { selectedProducts } = get();
        if (selectedProducts.length < 4 && !selectedProducts.find(p => p.id === product.id)) {
            set({ selectedProducts: [...selectedProducts, product] });
        }
    },

    removeProduct: (productId) => {
        set((state) => ({
            selectedProducts: state.selectedProducts.filter(p => p.id !== productId)
        }));
    },

    setIntent: (intent) => set({ intent }),

    analyzeComparison: () => {
        set({ isAnalyzing: true });

        // Mock AI Delay
        setTimeout(() => {
            const { selectedProducts } = get();
            if (selectedProducts.length === 0) {
                set({ isAnalyzing: false });
                return;
            }

            // Mock Intelligent Verdict
            // In a real app, this would come from an LLM analysis of the products + intent
            const winner = selectedProducts[0]; // Simple default winner for mock

            const mockVerdict: AIVerdictType = {
                winnerId: winner.id,
                reasoning: `Based on your needs, the ${winner.name} stands out due to its superior performance-to-price ratio and modern features.`,
                scores: {},
                prosCons: {}
            };

            selectedProducts.forEach(p => {
                mockVerdict.scores[p.id] = {
                    performance: Math.floor(Math.random() * 2) + 8, // 8-10
                    display: Math.floor(Math.random() * 2) + 8,
                    battery: Math.floor(Math.random() * 3) + 7,
                    overall: 0
                };
                // Calc average
                const s = mockVerdict.scores[p.id];
                s.overall = Number(((s.performance + s.display + s.battery) / 3).toFixed(1));

                mockVerdict.prosCons[p.id] = {
                    pros: p.features.slice(0, 3),
                    cons: ['Higher price point', 'Limited availability'] // Generic cons
                };
            });

            set({
                aiVerdict: mockVerdict,
                isAnalyzing: false
            });
        }, 2000);
    }
}));
