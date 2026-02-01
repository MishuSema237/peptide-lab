import Link from 'next/link';
import Button from '@/components/ui/Button';
import Image from 'next/image';

export default function AboutPage() {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="bg-primary text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">About Us</h1>
                    <p className="text-xl max-w-2xl mx-auto text-blue-100">
                        Science-Driven. Results-Focused. Global Excellence.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-heading font-bold text-dark mb-6">
                            Our Mission
                        </h2>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            At PeptideLab, we believe that achieving your best self starts with science you can trust.
                            Our mission is to deliver premium-grade peptide formulations
                            that help you unlock your body's full potential from performance and recovery to weight management and anti-aging.
                        </p>
                    </div>
                </div>
            </section>

            {/* Why Purity? Section */}
            <section className="bg-gray-50 py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-heading font-bold text-dark mb-4">Why PeptideLab?</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Peptides are taking the world by storm – redefining what's possible in longevity, performance, and vitality science.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
                        <div>
                            <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-primary mb-6">
                                <h3 className="text-xl font-bold text-dark mb-2">Research-Grade Quality</h3>
                                <p className="text-gray-600">
                                    We supply only the highest purity peptides, synthesized in GMP-compliant facilities and rigorously tested for identity and purity.
                                </p>
                            </div>
                            <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-secondary mb-6">
                                <h3 className="text-xl font-bold text-dark mb-2">Transparency First</h3>
                                <p className="text-gray-600">
                                    Every batch comes with a Certificate of Analysis (CoA) so you know exactly what you're researching with. No fillers, no secrets.
                                </p>
                            </div>
                            <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-accent">
                                <h3 className="text-xl font-bold text-dark mb-2">Secure & Specialized</h3>
                                <p className="text-gray-600">
                                    We understand the unique needs of researchers. Our packaging is distinct, professional, and designed to preserve peptide integrity.
                                </p>
                            </div>
                        </div>
                        <div className="relative h-96 md:rounded-lg overflow-hidden shadow-xl border border-gray-100">
                            <Image
                                src="/images/about-peptidelab.png"
                                alt="PeptideLab Scientific Excellence"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-heading font-bold text-dark mb-6">Join Our Mission</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                        Whether you're an athlete optimizing recovery, someone focused on sustainable weight loss,
                        or simply looking to feel like yourself again, we're here to support your journey.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link href="/shop">
                            <Button variant="primary" size="lg">Shop Now</Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outline" size="lg">Contact Us</Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
