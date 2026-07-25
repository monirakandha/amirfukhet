'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomeValuationModal from '@/components/HomeValuationModal';
import { BlogArticle } from '@/types';
import { fetchBlogBySlug } from '@/services/api';
import { ChevronRight, Calendar, Clock, Tag, ArrowLeft, Share2, FileText } from 'lucide-react';

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [blog, setBlog] = useState<BlogArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [isValuationOpen, setIsValuationOpen] = useState(false);

  useEffect(() => {
    async function load() {
      if (slug) {
        setLoading(true);
        const data = await fetchBlogBySlug(slug);
        setBlog(data);
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center p-8 text-center">
          <FileText className="w-16 h-16 text-slate-700 mb-4" />
          <h1 className="text-2xl font-bold">Article Not Found</h1>
          <Link href="/blog" className="mt-4 px-6 py-2.5 bg-amber-500 text-slate-950 font-bold rounded-xl text-sm">
            Return to Blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar onOpenValuationModal={() => setIsValuationOpen(true)} />

      {/* Header */}
      <section className="pt-32 pb-12 bg-slate-900 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Link href="/blog" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 text-xs font-bold mb-2">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Market Blog
          </Link>

          <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold rounded-full inline-block">
            {blog.category}
          </span>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            {blog.title}
          </h1>

          <div className="flex items-center gap-4 text-xs text-slate-400 pt-2 border-t border-slate-800">
            <div className="flex items-center gap-2">
              <img src={blog.author.avatar} alt={blog.author.name} className="w-8 h-8 rounded-full border border-amber-400" />
              <div>
                <span className="font-bold text-white block">{blog.author.name}</span>
                <span className="text-[11px] text-slate-400">{blog.author.role}</span>
              </div>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-amber-400" /> {blog.publishedAt}
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" /> {blog.readTimeMinutes} min read
            </div>
          </div>
        </div>
      </section>

      {/* Hero Cover Image */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 z-10 w-full">
        <div className="rounded-3xl overflow-hidden border border-slate-800 shadow-2xl h-80 sm:h-96 w-full">
          <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
        </div>
      </section>

      {/* Main Article Content */}
      <section className="py-12 flex-grow">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div
            className="prose prose-invert prose-amber max-w-none text-slate-300 leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Tags */}
          <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center gap-2">
            <Tag className="w-4 h-4 text-amber-400 shrink-0" />
            {blog.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <HomeValuationModal isOpen={isValuationOpen} onClose={() => setIsValuationOpen(false)} />
    </div>
  );
}
