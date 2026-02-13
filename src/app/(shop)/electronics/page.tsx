import { ProductGrid } from '@/components/product/ProductGrid';
import { mockProducts } from '@/lib/mockData';

export default function ElectronicsPage() {
    // Show all electronics including mobiles and laptops for now, or strict 'electronics'
    // Let's show everything for the general electronics page
    const products = mockProducts;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Electronics</h1>
                <p className="text-gray-600">
                    Explore our wide range of electronic devices and accessories
                </p>
            </div>
            <ProductGrid products={products} />
        </div>
    );
}
