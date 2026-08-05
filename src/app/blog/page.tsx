import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogPageClient from '@/components/BlogPageClient';
import { serverFetchBlogs } from '@/lib/server-api';

export const metadata: Metadata = {
  title: 'Market Insights & Phuket Property Guide | AMIR KNOWS PHUKET',
  description:
    'Expert analysis on Phuket real estate trends, ownership structures, rental yields, and area guides — written for serious foreign investors.',
  keywords:
    'Phuket property blog, Phuket real estate insights, buy property Thailand, freehold leasehold guide, Bang Tao area guide, rental yields Phuket',
  openGraph: {
    title: 'Phuket Property Market Insights | AMIR KNOWS PHUKET',
    description:
      'In-depth articles on Phuket real estate: ownership laws, area guides, rental yields, and the complete foreign buyer process.',
    type: 'website',
  },
};

export default async function BlogPage() {
  // Fetch all blogs server-side — Google sees every article title and description
  const blogs = await serverFetchBlogs();

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans">
      <Navbar />

      {/* Client shell handles filtering, search & dynamic hero */}
      <BlogPageClient initialBlogs={blogs} />

      <Footer />
    </div>
  );
}
