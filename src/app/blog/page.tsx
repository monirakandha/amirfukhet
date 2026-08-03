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

      {/* Header Section — fully server-rendered for SEO */}
      <section className="pt-32 pb-14 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f4f6fa] border border-blue-100 font-desc-mona text-[16px] font-medium text-[#5870F7] leading-none shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#5870F7]" />
              Market Intelligence
            </div>

            <h1
              className="font-heading-bricolage text-[36px] sm:text-[48px] font-semibold text-[#020202] leading-[1.1] tracking-[-0.01em]"
              style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
            >
              Research the market<br className="hidden sm:inline" /> before you commit
            </h1>

            <p className="font-desc-mona text-[16px] font-normal text-[#6B7280] max-w-2xl mx-auto leading-[1.5]">
              Expert analysis on Phuket real estate trends, ownership structures, rental yields, and area guides — written for serious investors.
            </p>
          </div>
        </div>
      </section>

      {/* Client shell handles filtering & search — initial list is SSR'd */}
      <BlogPageClient initialBlogs={blogs} />

      <Footer />
    </div>
  );
}
