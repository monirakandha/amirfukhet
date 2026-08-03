import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertiesClient from '@/components/PropertiesClient';

export const metadata: Metadata = {
  title: 'Curated Phuket Property Listings | AMIR KNOWS PHUKET',
  description:
    'A small, hand-picked selection of Phuket villas and condos. Freehold and leasehold properties in Bang Tao, Kamala, Surin, Layan, and Rawai.',
  keywords:
    'Phuket villas for sale, Phuket condos for sale, Bang Tao villa, Kamala freehold condo, Rawai family villa, buy property Phuket',
  openGraph: {
    title: 'Curated Phuket Property Listings | AMIR KNOWS PHUKET',
    description: 'Hand-picked villas and condos in Phuket. Not a portal — a curated selection Amir would personally recommend.',
    type: 'website',
  },
};

export default function PropertiesPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans">
      <Navbar />

      {/* Hero Area — server-rendered for SEO */}
      <section className="relative w-full pt-36 pb-20 sm:pt-40 sm:pb-24 overflow-hidden bg-[#f8fafc] border-b border-gray-200/60">
        <div className="absolute inset-0 pointer-events-none hero-grid-overlay" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white border border-blue-100 text-xs font-semibold text-[#4c70ff] shadow-2xs">
            Selected Listings
          </div>

          <h1
            className="font-heading-bricolage text-[36px] sm:text-[48px] font-semibold text-[#020202] leading-[1.1] tracking-[-0.01em] max-w-4xl mx-auto"
            style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
          >
            A few hand-picked properties
          </h1>

          <p className="font-desc-mona text-[16px] font-normal text-[#6B7280] max-w-2xl mx-auto leading-[1.5] pt-1">
            Not a portal – a small, curated selection. Every property here is one Amir would be comfortable recommending.
          </p>
        </div>
      </section>

      {/* Interactive property grid with filters */}
      <PropertiesClient />

      <Footer />
    </div>
  );
}
