export default function SupportPage() {
    return (
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <h1 className="text-2xl font-bold mb-4">Support & Documentation</h1>
            <p className="text-gray-600 mb-6">
                Need help managing the store? Check out the documentation below or contact technical support.
            </p>

            <div className="space-y-4">
                <a href="#" className="block p-4 border rounded-lg hover:bg-gray-50">
                    <h3 className="font-bold text-dark">Admin Guide</h3>
                    <p className="text-sm text-gray-500">How to manage products, orders, and users.</p>
                </a>
                <a href="#" className="block p-4 border rounded-lg hover:bg-gray-50">
                    <h3 className="font-bold text-dark">Technical Docs</h3>
                    <p className="text-sm text-gray-500">API references and deployment troubleshooting.</p>
                </a>
            </div>
        </div>
    );
}
