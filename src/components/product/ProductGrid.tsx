import type { Product } from '@/types/product.types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
    products: Product[];
    title?: string;
}

export function ProductGrid({ products, title }: ProductGridProps) {
    if (products.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">No products found.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {title && (
                <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
