import Link from 'next/link';

export function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 mt-auto">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-900">AI Commerce</h3>
                        <p className="text-gray-500 text-sm">
                            Experience the future of shopping with our AI-powered recommendations and semantic search.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Shop</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/mobiles" className="text-base text-gray-500 hover:text-gray-900">
                                    Mobiles
                                </Link>
                            </li>
                            <li>
                                <Link href="/laptops" className="text-base text-gray-500 hover:text-gray-900">
                                    Laptops
                                </Link>
                            </li>
                            <li>
                                <Link href="/electronics" className="text-base text-gray-500 hover:text-gray-900">
                                    Electronics
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Features</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/search" className="text-base text-gray-500 hover:text-gray-900">
                                    AI Search
                                </Link>
                            </li>
                            <li>
                                <Link href="/compare" className="text-base text-gray-500 hover:text-gray-900">
                                    Product Comparison
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-base text-gray-500 hover:text-gray-900">
                                    Recommendations
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Legal</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="#" className="text-base text-gray-500 hover:text-gray-900">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-base text-gray-500 hover:text-gray-900">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-200 pt-8">
                    <p className="text-base text-gray-400 text-center">
                        &copy; {new Date().getFullYear()} AI Commerce. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
