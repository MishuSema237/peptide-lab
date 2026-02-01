import Image from 'next/image';
import Button from '@/components/ui/Button';

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    // Mock product data
    const product = {
        id: id,
        name: 'BPC-157 10mg',
        price: 45.99,
        description: `BPC-157 (Body Protection Compound-157) is a pentadecapeptide made up of 15 amino acids. It is a partial sequence of body protection compound (BPC) that is discovered in and isolated from human gastric juice. Experimentally it has been demonstrated to accelerate the healing of many different wounds, including tendon-to-bone healing and superior healing of damaged ligaments.`,
        image: '/images/placeholder-product.jpg',
        category: 'Recovery',
        inStock: true,
        sku: 'PEP-BPC-010',
        purity: '≥99.0%',
        sequence: 'Gly-Glu-Pro-Pro-Pro-Gly-Kp-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val',
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Product Image */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex items-center justify-center">
                    <div className="relative w-full aspect-square max-w-md">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>

                {/* Product Info */}
                <div>
                    <span className="text-secondary font-medium tracking-wide text-sm uppercase">
                        {product.category}
                    </span>
                    <h1 className="text-4xl font-heading font-bold text-dark mt-2 mb-4">
                        {product.name}
                    </h1>
                    <div className="text-3xl font-bold text-primary mb-6">
                        ${product.price.toFixed(2)}
                    </div>

                    <p className="text-gray-600 leading-relaxed mb-8">
                        {product.description}
                    </p>

                    <div className="space-y-4 mb-8">
                        <div className="flex justify-between py-3 border-b">
                            <span className="font-semibold text-gray-700">SKU</span>
                            <span className="text-gray-600">{product.sku}</span>
                        </div>
                        <div className="flex justify-between py-3 border-b">
                            <span className="font-semibold text-gray-700">Purity</span>
                            <span className="text-gray-600">{product.purity}</span>
                        </div>
                    </div>

                    <div className="flex gap-4 mb-8">
                        <div className="w-24">
                            <label className="sr-only">Quantity</label>
                            <input
                                type="number"
                                defaultValue={1}
                                min={1}
                                className="w-full px-4 py-3 border rounded-lg text-center"
                            />
                        </div>
                        <Button size="lg" className="flex-1">
                            Add to Cart
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
