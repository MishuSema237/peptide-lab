export default function RefundPolicyPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <h1 className="text-4xl font-heading font-bold mb-8 text-dark">Refund Policy</h1>

            <div className="prose prose-blue max-w-none text-gray-600 space-y-8">
                <section>
                    <p className="text-lg leading-relaxed">
                        At <span className="font-bold text-dark">PeptideLab</span>, we take pride in providing only the highest-quality research peptides. Due to the sensitive nature of our products, all payments made to us are non-refundable.
                    </p>
                    <p className="mt-4">
                        However, we understand that exceptional situations may occur, and we strive to handle each case with fairness and transparency.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-dark mb-4">1. Refunds</h2>
                    <p>
                        Payments made to PeptideLab are non-refundable under normal circumstances.
                        If a refund is approved at our discretion, a non-refundable, non-negotiable 10% restocking fee will be applied to the total order amount.
                    </p>
                    <div className="mt-4 bg-gray-50 p-6 rounded-xl border border-gray-100">
                        <p className="font-bold mb-2">We reserve the right to:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Limit the order quantity of any product.</li>
                            <li>Extend delivery timelines for operational or supply reasons.</li>
                            <li>Refuse shipment to any customer for any reason, at our sole discretion.</li>
                        </ul>
                    </div>
                    <p className="mt-4 italic">
                        If you have concerns or disputes regarding charges, you agree to contact PeptideLab directly before initiating any chargeback or cancellation request. Attempting to dispute charges without first contacting us may result in suspension of future purchasing privileges.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-dark mb-4">2. Order Cancellations</h2>
                    <p className="mb-4">PeptideLab reserves the right to cancel or decline any order if:</p>
                    <ul className="list-disc pl-5 space-y-2 mb-4">
                        <li>Your payment method is declined or flagged for potential fraud.</li>
                        <li>We suspect the order is fraudulent or violates our Terms of Service.</li>
                        <li>We cannot verify your identity or shipping information.</li>
                    </ul>
                    <p>
                        In such cases, any payment authorization will be voided, and no charges will be processed. If funds were captured, a full refund will be issued for cancelled orders that were not shipped.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-dark mb-4">3. Risk of Loss & Shipping</h2>
                    <p>
                        All products are shipped directly from our secure processing facilities.
                        Ownership and risk of loss transfer to the customer once the shipment leaves our warehouse.
                    </p>
                    <p className="mt-4">
                        Please note that shipping times are estimated only and may vary due to courier delays, customs clearance, or other unforeseen factors.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-dark mb-4">4. Returns & Replacements</h2>
                    <p>
                        Due to the research-grade nature of our products, returns cannot be accepted once an order has shipped to ensure product chain-of-custody and integrity.
                    </p>
                    <p className="mt-4">
                        However, if you receive a damaged or defective item, we may approve a replacement after proper review.
                    </p>
                    <div className="mt-6 bg-blue-50/50 p-6 rounded-xl border border-blue-100">
                        <p className="font-bold mb-3">To request a replacement, please email <a href="mailto:support@peptidelab.com" className="text-primary hover:underline">support@peptidelab.com</a> within 3 days of receiving your order, including:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Your Order Number</li>
                            <li>The Lot Number (printed on the product)</li>
                            <li>A clear image of the damaged or defective item</li>
                        </ul>
                    </div>
                    <p className="mt-4">
                        All replacement requests are subject to verification and product availability.
                        If a replacement cannot be authorized, a store credit of equal value may be issued at our discretion.
                    </p>
                </section>

                <section className="pt-8 border-t border-gray-100">
                    <h2 className="text-2xl font-bold text-dark mb-4">5. Contact Us</h2>
                    <p>
                        If you have questions or concerns regarding this Refund & Return Policy, please contact us at:
                        <a href="mailto:support@peptidelab.com" className="ml-2 font-bold text-primary hover:underline">support@peptidelab.com</a>
                    </p>
                </section>
            </div>
        </div>
    );
}
