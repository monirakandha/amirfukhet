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

  // Category badge color mapping
  const getCategoryColor = (cat: string) => {
    const colors: Record<string, { text: string; bg: string }> = {
      'Market Trends': { text: '#5870F7', bg: 'rgba(88,112,247,0.08)' },
      'Home Buying': { text: '#E05A4E', bg: 'rgba(224,90,78,0.08)' },
      'Seller Tips': { text: '#16A34A', bg: 'rgba(22,163,74,0.08)' },
      'Investment': { text: '#D97706', bg: 'rgba(217,119,6,0.08)' },
      'Ownership & Legal': { text: '#E05A4E', bg: 'rgba(224,90,78,0.08)' },
      'Area Guides': { text: '#16A34A', bg: 'rgba(22,163,74,0.08)' },
      'Rental Yields': { text: '#E05A4E', bg: 'rgba(224,90,78,0.08)' },
    };
    return colors[cat] || { text: '#5870F7', bg: 'rgba(88,112,247,0.08)' };
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans">
      <Navbar onOpenValuationModal={() => setIsValuationOpen(true)} />

      {/* Header Section */}
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

      {/* Controls Bar */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Categories */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-[14px] font-medium transition-all duration-200 leading-none ${
                    category === cat
                      ? 'bg-[#5870F7] text-white shadow-md shadow-blue-500/20'
                      : 'bg-[#f4f6fa] text-[#6B7280] hover:text-[#020202] border border-gray-200/80 hover:border-gray-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-3" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles..."
                className="w-full bg-[#f4f6fa] border border-gray-200 rounded-full py-2.5 pl-10 pr-4 text-[#020202] text-[14px] focus:border-[#5870F7] focus:outline-none placeholder-gray-400 transition-colors"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Cards Grid — Figma dual-state design */}
      <section className="py-14 sm:py-20 flex-grow bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredBlogs.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-desc-mona text-[18px] text-[#6B7280]">No articles found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
              {filteredBlogs.map((blog) => {
                const cleanSummary = (blog.summary || '')
                  .replace(/<[^>]*>/g, '')
                  .replace(/&nbsp;/g, ' ')
                  .replace(/&amp;/g, '&')
                  .replace(/&lt;/g, '<')
                  .replace(/&gt;/g, '>')
                  .replace(/&quot;/g, '"')
                  .replace(/&#39;/g, "'")
                  .trim();

                const catColor = getCategoryColor(blog.category);

                return (
                  <Link
                    key={blog.id}
                    href={`/blog/${blog.slug}`}
                    className="group relative flex flex-col cursor-pointer"
                  >
                    {/* DEFAULT STATE — Tall image + title below (Figma second image) */}
                    <div className="flex flex-col w-full">
                      {/* Cover Image */}
                      <div className="relative w-full aspect-[4/5] rounded-[24px] overflow-hidden bg-gray-100 border-2 border-white shadow-xs mb-4 sm:mb-5">
                        <img
                          src={blog.coverImage}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
                        />
                      </div>

                      {/* Title */}
                      <h3
                        className="font-heading-bricolage text-[20px] sm:text-[22px] font-medium text-[#020202] leading-[1.25] tracking-[-0.01em] group-hover:text-[#5870F7] transition-colors duration-200 pr-4"
                        style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
                      >
                        {blog.title}
                      </h3>
                    </div>

                    {/* HOVER OVERLAY CARD — Detailed view (Figma first image) */}
                    <div className="absolute -inset-2 bg-white rounded-[24px] p-4 border border-gray-200/80 shadow-2xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 ease-out z-30 flex flex-col justify-between">
                      <div>
                        {/* Image Container with Category Badge */}
                        <div className="relative w-full aspect-[4/3] rounded-[16px] overflow-hidden bg-gray-100 border-2 border-white shadow-xs mb-3">
                          <img
                            src={blog.coverImage}
                            alt={blog.title}
                            className="w-full h-full object-cover"
                          />
                          {/* Category Badge */}
                          <div
                            className="absolute top-3 left-3 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-xs font-desc-mona text-[13px] font-medium leading-none shadow-2xs"
                            style={{ color: catColor.text }}
                          >
                            {blog.category}
                          </div>
                        </div>

                        {/* Title */}
                        <h3
                          className="font-heading-bricolage text-[19px] sm:text-[20px] font-semibold text-[#020202] leading-[1.25] tracking-[-0.01em]"
                          style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
                        >
                          {blog.title}
                        </h3>

                        {/* Description */}
                        <p className="font-desc-mona text-[14px] font-normal text-[#6B7280] leading-[1.6] mt-2 line-clamp-4">
                          {cleanSummary}
                        </p>
                      </div>

                      {/* Footer: Date & Read Time */}
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 font-desc-mona text-[12.5px] font-normal text-[#9CA3AF] leading-none">
                        <div className="flex items-center gap-1.5">
                          <svg className="w-4 h-4 text-[#9CA3AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>Updated {new Date(blog.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <svg className="w-4 h-4 text-[#9CA3AF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <span>{blog.readTimeMinutes} min read</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
      <HomeValuationModal isOpen={isValuationOpen} onClose={() => setIsValuationOpen(false)} />
    </div>
  );
}
