'use client';

const STEPS = [
    'Understanding your needs…',
    'Searching best products…',
    'AI ranking products…',
];

export function AISearchLoader({ stepIndex = 0 }: { stepIndex?: number }) {
    const step = STEPS[Math.min(stepIndex, STEPS.length - 1)];

    return (
        <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="relative mb-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center animate-pulse">
                    <span className="text-3xl">🔍</span>
                </div>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">AI Product Advisor</h2>
            <p className="text-gray-600 mb-6">{step}</p>
            <div className="flex gap-1.5">
                {STEPS.map((_, i) => (
                    <div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-colors ${
                            i <= stepIndex ? 'bg-indigo-600' : 'bg-gray-200'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}
