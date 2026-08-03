import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogPageClient from '@/components/BlogPageClient';
import { serverFetchBlogs } from '@/lib/server-api';

export const metadata: Metadata = {
  title: 'Category Archive | AMIR KNOWS PHUKET',
  description: 'Browse articles by category on Phuket real estate.',
};

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  const decodedCategory = decodeURIComponent(resolvedParams.category).replace(/-/g, ' ');
  
  const blogs = await serverFetchBlogs(decodedCategory);

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans">
      <Navbar />

      <section className="pt-32 pb-14 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f4f6fa] border border-blue-100 font-desc-mona text-[16px] font-medium text-[#5870F7] leading-none shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#5870F7]" />
              Category Archive
            </div>

            <h1
              className="font-heading-bricolage text-[36px] sm:text-[48px] font-semibold text-[#020202] leading-[1.1] tracking-[-0.01em] capitalize"
              style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
            >
              {decodedCategory}
            </h1>

            <p className="font-desc-mona text-[16px] font-normal text-[#6B7280] max-w-2xl mx-auto leading-[1.5]">
              Articles and insights filed under the "{decodedCategory}" category.
            </p>
          </div>
        </div>
      </section>

      <main className="flex-grow">
        <BlogPageClient initialBlogs={blogs} />
      </main>

      <Footer />
    </div>
  );
}
