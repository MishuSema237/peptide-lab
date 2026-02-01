export default function TermsPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <h1 className="text-4xl font-heading font-bold mb-4 text-dark">Terms & Conditions</h1>
            <p className="text-sm text-gray-500 mb-12">Last Updated: January 31, 2026</p>

            <div className="prose prose-blue max-w-none text-gray-600 space-y-10">
                <section>
                    <p className="text-lg leading-relaxed">
                        Welcome to <span className="font-bold text-dark">PeptideLab</span>. By accessing or using our website, you agree to comply with and be bound by the following Terms and Conditions. Please read them carefully before using our site.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-dark mb-4">1. General Information</h2>
                    <p>
                        PeptideLab operates as a supplier of high-quality research peptides intended strictly for laboratory and research purposes only. <span className="font-bold text-red-600 underline">All products sold are not for human consumption or medical use.</span> By purchasing from us, you confirm that you understand and agree to these restrictions.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-dark mb-4">2. Eligibility</h2>
                    <p>
                        By using this website, you affirm that you are at least 18 years of age and legally capable of entering into binding contracts under applicable laws. Purchases made on behalf of organizations are assumed to have proper authorization.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-dark mb-4">3. Product Use Disclaimer</h2>
                    <p className="mb-4">
                        All products available on PeptideLab are for research purposes only. They are not intended to diagnose, treat, cure, or prevent any disease. Any improper use, testing, or redistribution of our products violates our policies and applicable laws.
                    </p>
                    <p className="mb-4">
                        PeptideLab assumes no responsibility for misuse of any products sold. The buyer is solely responsible for ensuring proper handling, storage, and disposal according to scientific and safety standards.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-dark mb-4">4. Orders and Payments</h2>
                    <p>
                        We reserve the right to accept or refuse any order at our discretion. All orders are subject to availability and confirmation of payment. Prices are displayed in the currency selected at checkout.
                    </p>
                    <p className="mt-4">
                        Once an order is placed and confirmed, modifications or cancellations may not be possible. All transactions are processed securely through our authorized payment partners.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-dark mb-4">5. Shipping and Delivery</h2>
                    <p>
                        Orders are processed promptly and shipped to the address provided at checkout from our secure distribution hubs. Delivery times may vary based on destination and courier service. PeptideLab is not responsible for delays caused by customs, carrier issues, or incorrect address details.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-dark mb-4">6. Returns and Refunds</h2>
                    <p>
                        Due to the nature of our products, all sales are final. Returns are not accepted unless the product is defective or damaged upon arrival. Any claims for damaged goods must be made within 72 hours of delivery with photographic evidence.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-dark mb-4">7. Limitation of Liability</h2>
                    <p>
                        Under no circumstances shall PeptideLab, its employees, affiliates, or suppliers be liable for any direct, indirect, incidental, or consequential damages arising from the use of our website or products.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-dark mb-4">8. Intellectual Property</h2>
                    <p>
                        All website content, including text, images, logos, product descriptions, and designs, is the intellectual property of PeptideLab and may not be copied, modified, or distributed without written permission.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-dark mb-4">9. Governing Law</h2>
                    <p>
                        These Terms and Conditions are governed by and construed under international commerce guidelines and standard business laws. Any disputes arising from these terms will be handled exclusively in the jurisdiction of PeptideLab's administrative headquarters.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-dark mb-4">10. Changes to These Terms</h2>
                    <p>
                        PeptideLab reserves the right to update or modify these Terms & Conditions at any time without prior notice. Continued use of the website after such updates constitutes acceptance of the revised terms.
                    </p>
                </section>

                <section className="pt-8 border-t border-gray-100">
                    <h2 className="text-2xl font-bold text-dark mb-4">11. Contact Information</h2>
                    <p>
                        For questions or concerns regarding these Terms & Conditions, please contact us at:
                        <a href="mailto:support@peptidelab.com" className="ml-2 font-bold text-primary hover:underline">support@peptidelab.com</a>
                    </p>
                </section>
            </div>
        </div>
    );
}
