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

      {/* Interactive property grid with filters & dynamic hero */}
      <PropertiesClient />

      <Footer hideCTA />
    </div>
  );
}
