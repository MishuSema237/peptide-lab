import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';

export default function Home() {
  const partnerLogos = [
    { name: 'WebMD', src: '/images/partner-logos/WebMD_logo-150x35.png' },
    { name: 'Bachem', src: '/images/partner-logos/bachem_logo_blue-1-150x31.png' },
    { name: 'Bioxconomy', src: '/images/partner-logos/bioxconomy_logo.png' },
    { name: 'Hypebae', src: '/images/partner-logos/hypebae_logo.png' },
    { name: 'ScienceTime', src: '/images/partner-logos/thesciencetime_logo.png' },
  ];

  return (
    <div className="bg-white scroll-smooth overflow-x-hidden">
      {/* SECTION 1: Intro / Hero Section with Hero Alternating Columns */}
      <section className="relative pt-16 pb-12 md:pb-0 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">

          {/* Hero Row 1 */}
          <div className="flex flex-col md:flex-row items-center gap-12 mb-20 md:mb-32">
            {/* Left Image (Circle with Dashed Border) */}
            <div className="w-full md:w-1/2 flex justify-center md:justify-start">
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full border-4 rotate-[35deg] border-dashed border-gray-300 bg-gray-100 flex items-center justify-center p-2 transition-transform hover:scale-105 duration-500 shadow-sm group overflow-hidden">
                <Image
                  src="/images/transparent-peptide-bottle.png"
                  alt="Peptide Bottle"
                  fill
                  className="object-contain p-8 group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Right Content */}
            <div className="w-full md:w-1/2 text-left space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl text-dark leading-tight">
                Trusted Source for Research-Grade Peptides
              </h1>
              <p className="text-2xl md:text-3xl italic text-dark font-heading">
                Purity. Precision. Performance.
              </p>
              <p className="text-lg text-gray-600 max-w-xl leading-relaxed font-sans">
                High-purity, lab-tested peptides manufactured under strict quality standards to support professional and research-grade applications worldwide.
              </p>
              <Link href="/shop" className="inline-block">
                <Button size="lg" className="bg-secondary hover:bg-secondary-600 text-dark font-semibold px-10 py-4 shadow-md rounded-lg transition-all duration-300 active:scale-95">
                  Shop Now
                </Button>
              </Link>
            </div>
          </div>

          {/* Precision Peptides Row (Alternating/Reversed) */}
          <div className="flex flex-col md:flex-row items-center gap-12 pt-12 md:pt-24 mt-8 md:mt-24 relative">
            {/* Background Highlight that extends to edge on desktop */}
            <div className="absolute -right-[100vw] top-0 bottom-0 left-0 bg-[#E1F9F1] -z-10 hidden md:block" style={{ left: 'auto', width: '200vw', right: '-50vw' }}></div>

            {/* Left Content */}
            <div className="w-full md:w-1/2 text-left space-y-6 z-10 py-12 md:py-0">
              <h2 className="text-4xl md:text-5xl text-dark leading-tight">
                Meticulously Engineered for Scientific Rigor
              </h2>
              <div className="space-y-4 font-sans text-gray-700">
                <p className="text-lg">
                  At PeptideLab, we deliver pharmaceutical-grade research compounds subjected to rigorous multi-stage validation. Every batch is verified via high-performance liquid chromatography (HPLC) and mass spectrometry to ensure absolute molecular integrity.
                </p>
                <p className="text-lg">
                  Our commitment to scientific transparency means you receive consistent, high-purity formulations designed to eliminate variables and deliver reproducible results in the most demanding laboratory environments.
                </p>
              </div>
              <Link href="/shop" className="inline-block pt-4">
                <Button size="lg" className="bg-secondary hover:bg-secondary-600 text-dark font-semibold px-10 py-4 shadow-md rounded-lg transition-all duration-300 active:scale-95">
                  Shop Now
                </Button>
              </Link>
            </div>

            {/* Right Image (Circle with Dashed Border) */}
            <div className="w-full md:w-1/2 flex justify-center md:justify-end py-12 md:py-32 z-10">
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full border-4  border-dashed border-gray-300 bg-gray-100 flex items-center justify-center p-2 transition-transform hover:scale-105 duration-500 shadow-sm group overflow-hidden">
                <Image
                  src="/images/peptide-molecules.avif"
                  alt="Peptide Molecular Structure"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Mobile Background Filler */}
            <div className="md:hidden absolute inset-0 bg-[#E1F9F1] -z-10 -mx-6 px-6"></div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Product Carousel Section */}
      <section className="relative bg-white overflow-hidden">
        {/* Top Header with Gray Background Area */}
        <div className="relative h-[500px] w-full border-b border-gray-200 overflow-hidden">
          <Image
            src="/images/peptide-injections.webp"
            alt="Peptide Injections"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gray-100/40 flex flex-col items-center justify-center pt-12 px-6 text-center">
            <div className="container mx-auto">

              <h2 className="text-3xl md:text-5xl text-dark mb-4 drop-shadow-sm">Engineered for Clinical Insight</h2>
              <div className="w-64 h-1.5 bg-primary/10 rounded-full mx-auto"></div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 -mt-32 relative z-10">
          {/* The White Card overlapping the gray background */}
          <div className="max-w-7xl mx-auto bg-white p-6 md:p-16 rounded-[40px] shadow-2xl border border-gray-100 mb-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border border-gray-200 rounded-xl p-8 flex flex-col items-center transition-all hover:shadow-xl hover:-translate-y-1 group bg-white">
                  <h3 className="text-2xl font-heading font-medium mb-1 group-hover:text-primary transition-colors text-center">GHK-Cu 50mg</h3>
                  <p className="text-xs text-gray-500 uppercase tracking-[0.2em] mb-3 font-sans font-semibold">Recovery</p>
                  <p className="text-2xl font-bold mb-8 font-sans text-primary">$75.00</p>

                  <div className="w-full aspect-[4/3] bg-gray-50 rounded-xl mb-10 flex items-center justify-center border border-dashed border-gray-200 group-hover:bg-gray-100 transition-colors">
                    <div className="w-14 h-14 bg-gray-200 rounded-lg opacity-40"></div>
                  </div>

                  <Link href="/shop" className="w-full">
                    <Button variant="primary" className="w-full bg-secondary hover:bg-secondary-600 text-dark font-bold py-4 shadow-sm active:scale-95 transition-all text-lg">
                      Shop Now
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Partner Logos Section */}
          <div className="mt-12 text-center pb-20">
            <h3 className="text-2xl md:text-3xl font-heading mb-12">Partner in Research</h3>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:opacity-100 transition-all duration-500">
              {partnerLogos.map((logo, idx) => (
                <div key={idx} className="relative h-12 w-32 md:w-40">
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Partner Info & Feature Grid */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-16 mb-40 max-w-6xl mx-auto">
            {/* sophisticated lab image Placeholder */}
            <div className="w-full md:w-1/2 flex justify-center md:justify-start -mx-6 md:mx-0">
              <div className="aspect-square w-full md:max-w-md relative overflow-hidden md:rounded-3xl rounded-none group shadow-sm h-[300px] md:h-auto">
                <Image
                  src="/images/sophisticated-lab.jpg"
                  alt="Sophisticated Research Laboratory"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Content */}
            <div className="w-full md:w-1/2 space-y-8">
              <p className="text-gray-500 text-lg md:text-xl font-sans font-medium tracking-wide">Not Just a Supplier - A Partner in Research</p>
              <h2 className="text-4xl md:text-6xl text-dark leading-tight">
                Your Strategic Ally in Molecular Discovery
              </h2>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-sans max-w-lg">
                PeptideLab provides more than just compounds; we offer a foundation for breakthrough science through unwavering integrity and a robust, globally-optimized supply chain.
              </p>
              <Link href="/shop" className="inline-block pt-4">
                <Button className="bg-secondary hover:bg-secondary-600 text-dark font-bold px-12 py-5 shadow-xl rounded-xl transition-all active:scale-95 text-lg">
                  Shop Now
                </Button>
              </Link>
            </div>
          </div>

          <div className="text-center mb-24 space-y-6">
            <h2 className="text-4xl md:text-6xl text-dark max-w-5xl mx-auto leading-tight italic">Reliable Research Starts from Molecular Precision.</h2>
            <p className="text-2xl md:text-4xl font-heading italic text-dark font-light tracking-wide opacity-90">
              The Standard of Research Integrity
            </p>
          </div>

          {/* Critical Factors Grid */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-dark shadow-2xl">
              {[
                { title: 'Purity', desc: 'Peptide accuracy depends on synthesis quality, raw materials, and controlled production environments.' },
                { title: 'Stability', desc: 'Environmental exposure, temperature, and handling conditions directly affect molecular stability.' },
                { title: 'Testing', desc: 'Third-party laboratory testing confirms identity, purity percentage, and batch consistency.' },
                { title: 'Manufacturing', desc: 'Controlled synthesis methods reduce contamination and ensure reproducible molecular structures.' },
                { title: 'Storage & Handling', desc: 'Proper packaging and storage protocols preserve peptide integrity during transit and use.' },
                { title: 'Batch Consistency', desc: 'Advanced analytical methods ensure that every vial meets precise stoichiometric specifications.' }
              ].map((factor, i) => (
                <div key={i} className="p-10 md:p-14 border-r border-b border-dark space-y-8 min-h-[300px] transition-all hover:bg-primary hover:text-white group">
                  <h3 className="text-3xl font-bold font-sans tracking-tight group-hover:translate-x-2 transition-transform">{factor.title}</h3>
                  <p className="text-xl leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">{factor.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
