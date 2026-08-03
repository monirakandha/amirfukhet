'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { BlogArticle } from '@/types';
import { Search } from 'lucide-react';

interface BlogPageClientProps {
  initialBlogs: BlogArticle[];
}

const CATEGORIES = ['All', 'Market Trends', 'Home Buying', 'Seller Tips', 'Investment', 'Ownership & Legal', 'Area Guides', 'Rental Yields'];

const CATEGORY_COLORS: Record<string, { text: string; bg: string }> = {
  'Market Trends':    { text: '#5870F7', bg: 'rgba(88,112,247,0.08)' },
  'Home Buying':      { text: '#E05A4E', bg: 'rgba(224,90,78,0.08)' },
  'Seller Tips':      { text: '#16A34A', bg: 'rgba(22,163,74,0.08)' },
  'Investment':       { text: '#D97706', bg: 'rgba(217,119,6,0.08)' },
  'Ownership & Legal':{ text: '#E05A4E', bg: 'rgba(224,90,78,0.08)' },
  'Area Guides':      { text: '#16A34A', bg: 'rgba(22,163,74,0.08)' },
  'Rental Yields':    { text: '#E05A4E', bg: 'rgba(224,90,78,0.08)' },
};

function getCategoryColor(cat: string) {
  return CATEGORY_COLORS[cat] || { text: '#5870F7', bg: 'rgba(88,112,247,0.08)' };
}

import { useAdmin } from '@/context/AdminContext';

export default function BlogPageClient({ initialBlogs }: BlogPageClientProps) {
  const { blogs } = useAdmin();
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filteredBlogs = useMemo(() => {
    let list = blogs && blogs.length > 0 ? blogs : initialBlogs;
    if (category !== 'All') {
      list = list.filter((b) => b.category.toLowerCase() === category.toLowerCase());
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (b) => b.title.toLowerCase().includes(q) || (b.summary || '').toLowerCase().includes(q)
      );
    }
    return list;
  }, [blogs, initialBlogs, category, search]);

  return (
    <>
      {/* Controls Bar */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Categories */}
            <div className="flex flex-wrap items-center gap-2">
              {CATEGORIES.map((cat) => (
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

      {/* Blog Cards Grid */}
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
                    {/* DEFAULT STATE */}
                    <div className="flex flex-col w-full">
                      <div className="relative w-full aspect-[4/5] rounded-[24px] overflow-hidden bg-gray-100 border-2 border-white shadow-xs mb-4 sm:mb-5">
                        <img
                          src={blog.coverImage}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
                        />
                      </div>
                      <h3
                        className="font-heading-bricolage text-[20px] sm:text-[22px] font-medium text-[#020202] leading-[1.25] tracking-[-0.01em] group-hover:text-[#5870F7] transition-colors duration-200 pr-4"
                        style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
                      >
                        {blog.title}
                      </h3>
                    </div>

                    {/* HOVER OVERLAY CARD */}
                    <div className="absolute -inset-2 bg-white rounded-[24px] border border-gray-200/80 shadow-2xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 ease-out z-30 flex flex-col overflow-hidden pb-5">
                      <div className="relative w-full aspect-[4/5] bg-gray-100 shrink-0">
                        <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-x-0 bottom-0 h-[80%] bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none" />
                        <div
                          className="absolute top-4 left-4 px-3.5 py-1.5 rounded-xl bg-white/95 backdrop-blur-sm border border-white/50 font-desc-mona text-[14px] font-medium leading-none shadow-sm z-20"
                          style={{ color: catColor.text }}
                        >
                          {blog.category}
                        </div>
                      </div>

                      <div className="px-5 pt-0 -mt-48 relative z-10 flex flex-col flex-grow justify-between">
                        <div>
                          <h3
                            className="font-heading-bricolage text-[20px] sm:text-[22px] font-semibold text-[#020202] leading-[1.2] tracking-[-0.01em]"
                            style={{ fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif" }}
                          >
                            {blog.title}
                          </h3>
                          <p className="font-desc-mona text-[15px] font-normal text-[#6B7280] leading-[1.5] mt-2.5 line-clamp-3">
                            {cleanSummary}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-5 font-desc-mona text-[13.5px] font-medium text-[#6B7280]">
                          <div className="flex items-center gap-1.5">
                            <svg className="w-[18px] h-[18px] text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="1.5" />
                              <line x1="16" y1="2" x2="16" y2="6" strokeWidth="1.5" />
                              <line x1="8" y1="2" x2="8" y2="6" strokeWidth="1.5" />
                              <line x1="3" y1="10" x2="21" y2="10" strokeWidth="1.5" />
                              <path d="M16 20l2 2 4-4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>Updated {new Date(blog.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <svg className="w-[18px] h-[18px] text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <circle cx="12" cy="12" r="7" strokeWidth="1.5" />
                              <circle cx="12" cy="12" r="2.5" strokeWidth="1.5" fill="currentColor" />
                            </svg>
                            <span>{blog.readTimeMinutes} min read</span>
                          </div>
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
    </>
  );
}
