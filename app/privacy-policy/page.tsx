export default function PrivacyPolicyPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <h1 className="text-4xl font-heading font-bold mb-4 text-dark">Privacy Policy</h1>
            <p className="text-sm text-gray-500 mb-12">Last Updated: January 31, 2026</p>

            <div className="prose prose-blue max-w-none text-gray-600 space-y-10">
                <section>
                    <p className="text-lg leading-relaxed">
                        At <span className="font-bold text-dark">PeptideLab</span>, we are committed to protecting your privacy and ensuring a secure experience for all our users. This Global Privacy Policy explains how we collect, use, and safeguard your personal information.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-dark mb-4">1. Information We Collect</h2>
                    <p className="mb-4">We collect information that allows us to provide a seamless research supply service, including:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><span className="font-bold text-dark">Personal Identifiers</span>: Name, email address, physical shipping address, and phone number.</li>
                        <li><span className="font-bold text-dark">Transaction Data</span>: Payment details (processed securely via encrypted third-party providers) and order history.</li>
                        <li><span className="font-bold text-dark">Technical Information</span>: IP address, browser type, and usage data collected through cookies to improve site performance.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-dark mb-4">2. How We Use Your Information</h2>
                    <p className="mb-4">Your data is used strictly for operational and service-related purposes:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Processing and delivering your research orders.</li>
                        <li>Verifying identity for secure transactions and fraud prevention.</li>
                        <li>Communicating updates regarding order status or scientific advisories.</li>
                        <li>Improving our website interface and product selection.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-dark mb-4">3. Data Security & Storage</h2>
                    <p>
                        We implement industry-standard security protocols, including SSL encryption and secure server architecture, to protect your data. Your personal information is stored on secure databases and is only accessible by authorized personnel with strict confidentiality obligations.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-dark mb-4">4. Sharing of Information</h2>
                    <p>
                        PeptideLab does <span className="font-bold text-dark italic">not</span> sell, trade, or rent your personal information to third parties. We only share necessary data with trusted service providers who assist us in operating our website, conducting our business, or servicing you (e.g., shipping carriers and payment processors), provided those parties agree to keep this information confidential.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-dark mb-4">5. Your Rights</h2>
                    <p>
                        Depending on your location, you may have rights regarding the access, correction, or deletion of your personal data. You may contact us at any time to request a summary of the data we hold or to request its removal from our active marketing systems.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-dark mb-4">6. Cookies</h2>
                    <p>
                        We use cookies to enhance your browsing experience and analyze site traffic. You can choose to disable cookies through your browser settings, though this may impact some functionalities of our storefront.
                    </p>
                </section>

                <section className="pt-8 border-t border-gray-100">
                    <h2 className="text-2xl font-bold text-dark mb-4">7. Contact Our Privacy Team</h2>
                    <p>
                        If you have any questions about this Privacy Policy or how your data is handled, please reach out to us:
                        <a href="mailto:support@peptidelab.com" className="ml-2 font-bold text-primary hover:underline">support@peptidelab.com</a>
                    </p>
                </section>
            </div>
        </div>
    );
}
