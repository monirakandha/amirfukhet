'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomeValuationModal from '@/components/HomeValuationModal';
import { BlogArticle } from '@/types';
import { fetchBlogs } from '@/services/api';
import { Search } from 'lucide-react';

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogArticle[]>([]);
  const [category, setCategory] = useState<string>('All');
  const [search, setSearch] = useState<string>('');
  const [isValuationOpen, setIsValuationOpen] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await fetchBlogs(category !== 'All' ? category : undefined);
      setBlogs(data);
    }
    load();
  }, [category]);

  const categories = ['All', 'Market Trends', 'Home Buying', 'Seller Tips', 'Investment'];

  const filteredBlogs = blogs.filter((b) =>
    search ? b.title.toLowerCase().includes(search.toLowerCase()) || b.summary.toLowerCase().includes(search.toLowerCase()) : true
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-900 flex flex-col font-sans">
      <Navbar onOpenValuationModal={() => setIsValuationOpen(true)} />

      {/* Header */}
      <section className="pt-32 pb-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f4f6fa] border border-blue-100 font-desc-mona text-[16px] font-medium text-[#5870F7] leading-none shadow-2xs mb-4">
            <span className="w-2 h-2 rounded-full bg-[#5870F7]" />
            Market Intelligence
          </div>
          <h1
            className="font-heading-bricolage text-[36px] sm:text-[48px] font-semibold text-[#020202] leading-[1.1] tracking-[-0.01em]"
            style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
          >
            Real Estate Blog &amp; Insights
          </h1>
          <p className="font-desc-mona text-[16px] font-normal text-[#6B7280] mt-3 max-w-2xl leading-[1.5]">
            Expert analysis on Phuket real estate trends, ownership structures, rental yields, and area guides.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs">
            {/* Categories */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-[13px] font-semibold transition-all ${
                    category === cat
                      ? 'bg-[#5870F7] text-white shadow-md shadow-blue-500/20'
                      : 'bg-[#f4f6fa] text-[#6B7280] hover:text-[#020202] border border-gray-200/80'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles..."
                className="w-full bg-[#f4f6fa] border border-gray-200 rounded-xl py-2 pl-9 pr-3 text-[#020202] text-[13px] focus:border-[#5870F7] focus:outline-none placeholder-gray-400 transition-colors"
              />
            </div>
          </div>

          {/* Blog Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/blog/${blog.slug}`}
                className="group bg-white rounded-[24px] overflow-hidden border border-gray-200/80 shadow-xs hover:shadow-2xl hover:-translate-y-1.5 hover:border-[#5870F7]/30 transition-all duration-300 ease-out flex flex-col"
              >
                {/* Cover Image */}
                <div className="relative h-56 w-full overflow-hidden bg-gray-100 rounded-t-[24px]">
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
                  />
                  {/* Category pill — top-left overlay */}
                  <span className="absolute top-3 left-3 px-3 py-1.5 bg-white text-[#E53935] text-[11px] font-semibold rounded-xl border border-red-100 shadow-xs leading-none">
                    {blog.category}
                  </span>
                </div>

                {/* Card Body */}
                <div className="flex flex-col flex-1 p-6 gap-3">
                  {/* Title */}
                  <h3 className="font-heading-bricolage text-[20px] font-semibold text-[#020202] leading-[1.25] tracking-[-0.01em] line-clamp-2 group-hover:text-[#5870F7] transition-colors duration-200"
                    style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
                  >
                    {blog.title}
                  </h3>

                  {/* Summary */}
                  <p className="font-desc-mona text-[15px] font-normal text-[#6B7280] leading-[1.6] line-clamp-3 mb-6">
                    {(blog.summary || '')
                      .replace(/<[^>]*>/g, '')
                      .replace(/&nbsp;/g, ' ')
                      .replace(/&amp;/g, '&')
                      .replace(/&lt;/g, '<')
                      .replace(/&gt;/g, '>')
                      .replace(/&quot;/g, '"')
                      .replace(/&#39;/g, "'")
                      .trim()}
                  </p>

                  {/* Divider */}
                  <div className="border-t border-gray-100 pt-4 mt-1 flex items-center justify-between gap-2">
                    {/* Updated date */}
                    <div className="flex items-center gap-1.5 text-[13px] text-[#6B7280] font-medium">
                      <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        <line x1="16" y1="2" x2="16" y2="6" strokeWidth="1.8" strokeLinecap="round"/>
                        <line x1="8" y1="2" x2="8" y2="6" strokeWidth="1.8" strokeLinecap="round"/>
                        <line x1="3" y1="10" x2="21" y2="10" strokeWidth="1.8" strokeLinecap="round"/>
                      </svg>
                      <span>Updated {blog.publishedAt}</span>
                    </div>

                    {/* Read time */}
                    <div className="flex items-center gap-1.5 text-[13px] text-[#6B7280] font-medium">
                      <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="9" strokeWidth="1.8"/>
                        <circle cx="12" cy="12" r="3" strokeWidth="1.8"/>
                      </svg>
                      <span>{blog.readTimeMinutes} min read</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <HomeValuationModal isOpen={isValuationOpen} onClose={() => setIsValuationOpen(false)} />
    </div>
  );
}
