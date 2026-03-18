'use client';

import { useState } from 'react';
import { useCompareStore } from '@/store/compare.store';
import { MessageCircle, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const SUGGESTED_QUESTIONS = [
    'Is the battery difference noticeable?',
    'Which one is better for gaming?',
    'Is the more expensive one worth the extra price?',
    'Which has the better camera in low light?',
];

export function AskAI() {
    const { comparison, selectedProducts, setIntent, intent } = useCompareStore();
    const [open, setOpen] = useState(false);

    if (!comparison || selectedProducts.length < 2) return null;

    return (
        <section className="py-6 px-4">
            <div className="max-w-2xl mx-auto">
                <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className="flex items-center justify-between w-full rounded-xl border border-indigo-200 bg-indigo-50/50 px-4 py-3 text-left font-medium text-indigo-800 hover:bg-indigo-100 transition-colors"
                >
                    <span className="flex items-center gap-2">
                        <MessageCircle className="w-5 h-5" />
                        Ask AI
                    </span>
                    <ChevronDown className={cn('w-5 h-5 transition-transform', open && 'rotate-180')} />
                </button>
                {open && (
                    <div className="mt-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                        <p className="text-sm text-gray-600 mb-3">
                            Choose a question and click Compare again for a personalized answer.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {SUGGESTED_QUESTIONS.map((q) => (
                                <button
                                    key={q}
                                    type="button"
                                    onClick={() => {
                                        setIntent(q);
                                        setOpen(false);
                                    }}
                                    className={cn(
                                        'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                                        intent === q
                                            ? 'bg-indigo-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    )}
                                >
                                    {q}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
