import { ProductGrid } from '@/components/product/ProductGrid';
import { mockProducts } from '@/lib/mockData';

export default function MobilesPage() {
    const products = mockProducts.filter(p => p.category === 'mobiles');

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Mobile Phones</h1>
                <p className="text-gray-600">
                    Discover the latest smartphones with AI-powered recommendations
                </p>
            </div>
            <ProductGrid products={products} />
        </div>
    );
}
