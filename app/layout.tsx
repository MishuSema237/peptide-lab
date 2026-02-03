import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ToasterProvider from "@/components/providers/ToasterProvider";


export const metadata: Metadata = {
  metadataBase: new URL("https://peptide-lab-six.vercel.app"),

  title: "PeptideLab — Premium Peptides for Sale",
  description:
    "Shop high-quality peptides for sale at PeptideLab. Trusted formulations, secure ordering, and fast delivery for performance, recovery, and wellness.",

  keywords:
    "peptides for sale, buy peptides, premium peptides, peptide shop, peptide supplements",

  openGraph: {
    title: "PeptideLab — Premium Peptides for Sale",
    description:
      "High-quality peptides for sale. Secure checkout, trusted formulations, and fast delivery.",
    url: "https://peptide-lab-six.vercel.app",
    siteName: "PeptideLab",
    images: [
      {
        url: "/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "PeptideLab — Premium Peptides for Sale",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "PeptideLab — Premium Peptides for Sale",
    description:
      "Buy premium peptides online. Trusted quality, fast delivery.",
    images: ["/thumbnail.png"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning={true}>
        <ToasterProvider />
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
