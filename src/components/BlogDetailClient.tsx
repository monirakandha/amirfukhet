'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import SidebarCTA from '@/components/SidebarCTA';
import TableOfContents from '@/components/TableOfContents';
import { useAdmin } from '@/context/AdminContext';
import { BlogArticle } from '@/types';

const QuoteBox = ({ text }: { text: string }) => (
  <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 sm:p-8 my-8 text-[#5870F7] font-medium text-lg leading-relaxed">
    "{text}"
  </div>
);

const SubscribeBox = () => (
  <div className="bg-[#1C2026] rounded-[32px] p-3 sm:p-4 my-10 shadow-2xl">
    <div className="bg-[#FFFFFF0D] border border-[#FFFFFF0D] rounded-[24px] p-6 sm:p-10 text-center">
      <h3 className="text-[24px] font-bold text-white mb-2 tracking-tight">Get insights like this by email</h3>
      <p className="text-[15px] text-gray-400 mb-6 font-medium">Amir's Phuket market updates &amp; investor insights. Free.</p>
      <form className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto" onSubmit={e => e.preventDefault()}>
        <input type="email" placeholder="Enter your Email" required className="w-full bg-transparent border border-[#44464A] rounded-full px-5 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#5870F7] transition-colors" />
        <button type="submit" className="w-full sm:w-auto shrink-0 bg-[#5870F7] hover:bg-blue-600 text-white px-8 py-3 rounded-full font-medium transition-colors">Subscribe</button>
      </form>
    </div>
  </div>
);

const FAQBox = ({ faqs }: { faqs: { question: string; answer: string }[] }) => {
  if (!faqs || faqs.length === 0) return null;
  return (
    <div className="space-y-4 mb-12 my-8">
      {faqs.map((faq, i) => (
        <details key={i} className="group bg-white border border-gray-100 rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer text-gray-900 font-bold text-[16px] select-none hover:bg-gray-50 transition-colors">
            {faq.question}
            <span className="text-[#5870F7] text-xl font-light group-open:hidden">+</span>
            <span className="text-[#A1A3A7] text-xl font-light hidden group-open:block">&ndash;</span>
          </summary>
          <div className="px-6 pb-6 text-[15px] text-gray-600 leading-relaxed border-t border-transparent group-open:border-gray-100 hidden group-open:block">
            {faq.answer}
          </div>
        </details>
      ))}
    </div>
  );
};


interface BlogDetailClientProps {
  slug: string;
  serverBlog: BlogArticle | null;
  serverRelatedBlogs: BlogArticle[];
}

export default function BlogDetailClient({ slug, serverBlog, serverRelatedBlogs }: BlogDetailClientProps) {
  const { blogs } = useAdmin();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Try to find the blog in context if not provided by server
  const blog = serverBlog || (blogs ? blogs.find(b => b.slug === slug) : null);

  // Avoid hydration mismatch by waiting to render local-storage only blogs
  if (!blog && !mounted) {
    return null; // Or a loading spinner
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center font-sans">
        <Navbar />
        <div className="text-center flex-grow flex flex-col items-center justify-center py-20">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog" className="px-6 py-3 bg-[#5870F7] text-white rounded-full font-medium hover:bg-blue-600">
            Back to Insights
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const categoryUrl = `/blog/category/${encodeURIComponent(blog.category.toLowerCase().replace(/ /g, '-'))}`;
  const relatedBlogs = serverRelatedBlogs; // We'll just use the server ones for simplicity

  const renderContent = () => {
    // Regex matches the shortcodes, accounting for being wrapped in <p> tags by ReactQuill
    const regex = /(<p>\s*\[quote\]\s*<\/p>|\[quote\]|<p>\s*\[subscribe\]\s*<\/p>|\[subscribe\]|<p>\s*\[faq\]\s*<\/p>|\[faq\])/g;
    const parts = blog.content.split(regex);
    
    let renderedQuote = false;
    let renderedSubscribe = false;
    let renderedFaq = false;

    const elements = parts.map((part, index) => {
      if (!part) return null;
      if (part.includes('[quote]')) {
        renderedQuote = true;
        return blog.quoteText ? <QuoteBox key={index} text={blog.quoteText} /> : null;
      }
      if (part.includes('[subscribe]')) {
        renderedSubscribe = true;
        return blog.showSubscribeBox ? <SubscribeBox key={index} /> : null;
      }
      if (part.includes('[faq]')) {
        renderedFaq = true;
        return (blog.postFaqs && blog.postFaqs.length > 0) ? (
          <div key={index}>
            <h2 id="faq" className="text-[24px] font-bold text-gray-900 mt-12 mb-6 tracking-tight">Frequently asked questions (FAQ)</h2>
            <FAQBox faqs={blog.postFaqs} />
          </div>
        ) : null;
      }
      
      // Filter out pure whitespace parts to prevent empty prose divs which might mess up spacing
      if (part.trim() === '') return null;

      return (
        <div 
          key={index} 
          className="prose prose-lg max-w-none text-gray-600 leading-relaxed prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-gray-900 prose-a:text-[#5870F7] prose-img:rounded-2xl prose-img:shadow-sm"
          dangerouslySetInnerHTML={{ __html: part }}
        />
      );
    });

    if (blog.quoteText && !renderedQuote) {
      elements.push(<QuoteBox key="append-quote" text={blog.quoteText} />);
    }

    if (blog.contentSections) {
      blog.contentSections.forEach((section, idx) => {
        elements.push(
          <div key={`section-${idx}`}>
            <h2 
              id={section.heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')} 
              className="text-[24px] font-bold text-gray-900 mt-12 mb-4 tracking-tight"
            >
              {section.heading}
            </h2>
            <div 
              className="prose prose-lg max-w-none text-gray-600 leading-relaxed prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-gray-900 prose-a:text-[#5870F7] prose-img:rounded-2xl prose-img:shadow-sm"
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          </div>
        );
      });
    }

    if (blog.showSubscribeBox && !renderedSubscribe) {
      elements.push(<SubscribeBox key="append-subscribe" />);
    }
    if (blog.postFaqs && blog.postFaqs.length > 0 && !renderedFaq) {
      elements.push(
        <div key="append-faq">
          <h2 id="faq" className="text-[24px] font-bold text-gray-900 mt-12 mb-6 tracking-tight">Frequently asked questions (FAQ)</h2>
          <FAQBox faqs={blog.postFaqs} />
        </div>
      );
    }

    return elements;
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans selection:bg-[#5870F7] selection:text-white">
      <Navbar />

      <main className="flex-grow pt-32 pb-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className={blog.template === 'centered' ? "max-w-4xl mx-auto w-full" : "grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"}>
            
            {/* Sidebar (Contents & PDF) */}
            {blog.template !== 'centered' && (
              <div className="hidden lg:block lg:col-span-4 sticky top-32 space-y-10">
              <div>
                <h4 className="font-bold text-gray-900 mb-4 text-[16px] px-4">Contents</h4>
                <div className="-mx-4">
                  <TableOfContents items={[
                    ...(blog.contentSections?.map(section => ({
                      id: section.heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
                      label: section.heading
                    })) || []),
                    ...(blog.postFaqs && blog.postFaqs.length > 0 ? [{ id: 'faq', label: 'FAQ' }] : [])
                  ]} />
                </div>
              </div>

              <SidebarCTA />
            </div>
            )}

            {/* Main Content Area */}
            <div className={blog.template === 'centered' ? "w-full" : "lg:col-span-8 max-w-[800px] w-full mx-auto"}>
              
              {/* Header */}
              <div className="mb-10">
                <Link href={categoryUrl} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#5870F7] text-[13px] font-semibold mb-6 hover:bg-blue-100 transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5870F7]" />
                  {blog.category}
                </Link>

                <h1 className="text-[36px] sm:text-[44px] font-bold text-gray-900 leading-[1.15] tracking-tight mb-8">
                  {blog.title}
                </h1>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-6 bg-[#F8FAFC] border border-gray-100 rounded-[20px]">
                  <div className="flex items-center gap-4">
                    <img src={blog.author?.avatar || '/images/amir.png'} alt={blog.author?.name || 'Amir'} className="w-12 h-12 rounded-full object-cover object-top shadow-sm" />
                    <div>
                      <h4 className="font-bold text-gray-900 text-[15px]">{blog.author?.name || 'Amir'}</h4>
                      <p className="text-gray-500 text-[13px]">{blog.author?.role || 'Property Advisor'}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-[13px] text-gray-500">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      Published {new Date(blog.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                      Updated {new Date(blog.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                    <div className="flex items-center gap-2 col-span-2 mt-1">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {blog.readTimeMinutes} min read
                    </div>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="w-full space-y-6">
                {renderContent()}
              </div>

              {/* Tags */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="mt-12 flex flex-wrap items-center gap-2">
                  <span className="text-[14px] font-semibold text-gray-900 mr-2">Tags:</span>
                  {blog.tags.map(tag => (
                    <Link key={tag} href={`/blog/tag/${encodeURIComponent(tag.toLowerCase().replace(/ /g, '-'))}`} className="px-3 py-1 bg-gray-50 border border-gray-200 rounded-lg text-[13px] font-medium text-gray-600 hover:bg-gray-100 transition-colors">
                      #{tag}
                    </Link>
                  ))}
                </div>
              )}

              {/* Share & Contact Banner */}
              <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <span className="text-[14px] font-bold text-gray-900">Share</span>
                  <a href="#" className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-[#5870F7] hover:bg-gray-50 transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg></a>
                  <a href="#" className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-[#5870F7] hover:bg-gray-50 transition-colors"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/></svg></a>
                  <a href="#" className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-[#5870F7] hover:bg-gray-50 transition-colors"><svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v6m3-3H9m12 0c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg></a>
                </div>
              </div>

              <div className="mt-8 bg-[#F8FAFC] rounded-[20px] p-6 flex flex-col sm:flex-row items-center justify-between gap-6 border border-gray-100">
                <div className="flex items-center gap-4">
                  <img src={blog.author?.avatar || '/images/amir.png'} alt={blog.author?.name || 'Amir'} className="w-12 h-12 rounded-full object-cover shadow-sm" />
                  <div>
                    <h4 className="font-bold text-gray-900 text-[15px]">Have a question about your situation?</h4>
                    <p className="text-gray-500 text-[13px]">Message Amir directly &mdash; honest advice, no pressure.</p>
                  </div>
                </div>
                <Link href="/contact" className="shrink-0 bg-[#5870F7] hover:bg-blue-600 text-white px-6 py-2.5 rounded-full text-[14px] font-medium transition-colors flex items-center gap-2">
                  Contact Amir <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
                </Link>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* Related Articles */}
      {relatedBlogs && relatedBlogs.length > 0 && (
        <section className="py-20 bg-gray-50 border-t border-gray-100">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-[32px] font-bold text-gray-900 tracking-tight">Related articles</h2>
              <Link href="/blog" className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#5870F7] hover:bg-blue-600 text-white border border-transparent shadow-md shadow-blue-500/20 text-[14px] font-medium transition-colors">
                View all insights <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedBlogs.map((b) => (
                <Link key={b.id} href={`/blog/${b.slug}`} className="group block">
                  <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all flex flex-col h-full">
                    <div className="relative h-56 w-full overflow-hidden">
                      <img src={b.coverImage} alt={b.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-[19px] font-bold text-gray-900 leading-snug mb-3 group-hover:text-blue-600 transition-colors tracking-tight line-clamp-3">
                        {b.title}
                      </h3>
                      <div className="mt-auto pt-4 flex items-center gap-3">
                        <img src={b.author?.avatar || '/images/amir.png'} alt={b.author?.name || 'Amir'} className="w-8 h-8 rounded-full object-cover" />
                        <div className="text-[13px] text-gray-500 font-medium">{b.author?.name || 'Amir'}</div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#5870F7] hover:bg-blue-600 text-white border border-transparent shadow-md shadow-blue-500/20 text-[15px] font-medium transition-colors">
                View all insights <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      <Footer hideCTA />
    </div>
  );
}
