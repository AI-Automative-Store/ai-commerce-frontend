import { ProductGrid } from '@/components/product/ProductGrid';
import { mockProducts } from '@/lib/mockData';

export default function LaptopsPage() {
    const products = mockProducts.filter(p => p.category === 'laptops');

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Laptops</h1>
                <p className="text-gray-600">
                    Find the perfect laptop for work, gaming, or creativity
                </p>
            </div>
            <ProductGrid products={products} />
        </div>
    );
}
