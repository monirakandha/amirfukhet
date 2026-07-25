'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import HeroSearch from '@/components/HeroSearch';
import HomeValuationModal from '@/components/HomeValuationModal';
import ScheduleViewingModal from '@/components/ScheduleViewingModal';
import { Property, BlogArticle, SuccessStory } from '@/types';
import { fetchProperties, fetchBlogs, fetchSuccessStories } from '@/services/api';
import { primaryAgent } from '@/data/mockData';
import {
  Award,
  TrendingUp,
  ShieldCheck,
  Users,
  Building2,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Phone,
  Mail,
  Calendar,
  Quote,
} from 'lucide-react';

export default function HomePage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [blogs, setBlogs] = useState<BlogArticle[]>([]);
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [isValuationOpen, setIsValuationOpen] = useState(false);
  const [selectedViewingProperty, setSelectedViewingProperty] = useState<Property | null>(null);

  useEffect(() => {
    async function loadData() {
      const propData = await fetchProperties();
      const blogData = await fetchBlogs();
      const storyData = await fetchSuccessStories();
      setProperties(propData);
      setBlogs(blogData);
      setStories(storyData);
    }
    loadData();
  }, []);

  const featuredProperties = properties.filter((p) => p.featured || p.status === 'for-sale').slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar onOpenValuationModal={() => setIsValuationOpen(true)} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-44 md:pb-36 overflow-hidden">
        {/* Background Image & Gradient overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2000"
            alt="Luxury Estate"
            className="w-full h-full object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6 mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" /> Premier Luxury Real Estate
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              Elevating Your Real Estate Experience with <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">Unmatched Distinction</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
              Representing prime residential villas, waterfront penthouses, and high-value investment portfolios. Guided by market authority, privacy, and proven execution.
            </p>

            {/* Quick Metrics */}
            <div className="pt-2 flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="font-bold text-white">$185M+</span> Total Volume Closed
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="font-bold text-white">99.4%</span> Asking Price Ratio
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="font-bold text-white">14 Days</span> Avg. Days on Market
              </div>
            </div>
          </div>

          {/* Interactive Search Component */}
          <HeroSearch />
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-20 bg-slate-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block mb-1">
                Handpicked Collections
              </span>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                Featured Luxury Properties
              </h2>
            </div>

            <Link
              href="/properties"
              className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-bold text-sm group"
            >
              Explore All Listings <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onQuickInquire={(p) => setSelectedViewingProperty(p)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Realtor Personal Bio & Proof Section */}
      <section className="py-20 bg-slate-900/60 border-y border-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Agent Photo */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
                <img
                  src={primaryAgent.avatar}
                  alt={primaryAgent.name}
                  className="w-full h-[480px] object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 p-4 bg-slate-950/80 backdrop-blur-md rounded-2xl border border-slate-800">
                  <div className="text-lg font-bold text-white">{primaryAgent.name}</div>
                  <div className="text-xs text-amber-400">{primaryAgent.title}</div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-amber-500 text-slate-950 p-4 rounded-2xl shadow-xl font-black text-center hidden sm:block">
                <div className="text-2xl">15+</div>
                <div className="text-[10px] uppercase tracking-wider font-bold">Years Experience</div>
              </div>
            </div>

            {/* Agent Content */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block">
                Meet Your Lead Realtor
              </span>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                "Real estate isn't just about square footage — it's about crafting wealth, comfort, and legacy."
              </h2>

              <p className="text-slate-300 text-base leading-relaxed">
                Over the past 15 years, Eleanor Vance has represented hundreds of elite clients across high-end luxury acquisitions, strategic property listings, and portfolio expansions. Known for discreet service, razor-sharp negotiation, and bespoke marketing campaigns.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-start gap-3">
                  <Award className="w-6 h-6 text-amber-400 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-white text-sm">Top 1% Producer</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Ranked in the top nationwide tier for luxury sales volume.</p>
                  </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-start gap-3">
                  <ShieldCheck className="w-6 h-6 text-amber-400 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-white text-sm">Discreet Representation</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Confidential off-market transactions for high-profile clients.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setIsValuationOpen(true)}
                  className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-2xl text-sm uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2"
                >
                  <Award className="w-4 h-4" /> Request Free Home Valuation
                </button>

                <Link
                  href="/contact"
                  className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl text-sm border border-slate-800 transition-all flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-amber-400" /> Direct Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Preview */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block mb-1">
              Proven Track Record
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Client Success Stories & Sold Case Studies
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              See how our strategic staging and international buyer reach unlocked record prices for home sellers.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {stories.slice(0, 2).map((story) => (
              <div key={story.id} className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-amber-400 mb-3">
                    <Quote className="w-6 h-6" />
                    <span className="text-xs font-bold uppercase tracking-wider">Verified Sale Case Study</span>
                  </div>

                  <p className="text-slate-200 text-base italic leading-relaxed mb-6">
                    {story.testimonial}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs">
                    <div>
                      <span className="text-slate-500 block">Sold Price</span>
                      <span className="font-bold text-amber-400 text-sm">${story.soldPrice.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Days on Market</span>
                      <span className="font-bold text-white text-sm">{story.daysOnMarket} Days</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Location</span>
                      <span className="font-bold text-white text-sm truncate block">{story.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-slate-800/80">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-amber-400 shrink-0">
                    <img src={story.image} alt={story.clientName} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{story.clientName}</h4>
                    <p className="text-xs text-slate-400">{story.clientRole} • {story.propertyTitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/success-stories"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-2xl text-amber-400 font-bold text-sm transition-all"
            >
              View Full Success Stories Portfolio <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Market Blog Preview */}
      <section className="py-20 bg-slate-900/40 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block mb-1">
                Real Estate Intelligence
              </span>
              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                Latest Market Insights & Blog
              </h2>
            </div>
            <Link href="/blog" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-bold text-sm">
              Read All Articles <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.slice(0, 3).map((blog) => (
              <Link
                key={blog.id}
                href={`/blog/${blog.slug}`}
                className="group bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-amber-500/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 bg-slate-950/80 backdrop-blur-md text-amber-400 text-xs font-bold rounded-full border border-amber-500/30">
                      {blog.category}
                    </span>
                  </div>

                  <div className="p-5">
                    <div className="text-xs text-slate-500 mb-2">{blog.publishedAt} • {blog.readTimeMinutes} min read</div>
                    <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                      {blog.summary}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 text-amber-400 font-bold text-xs flex items-center gap-1">
                  Read Full Story <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Free Valuation Lead Capture CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Curious About Your Property's Current Market Value?
          </h2>
          <p className="text-slate-950 font-medium max-w-2xl mx-auto text-base">
            Get a complimentary, data-driven Comparative Market Analysis (CMA) prepared by our luxury real estate team within 24 hours.
          </p>
          <div>
            <button
              onClick={() => setIsValuationOpen(true)}
              className="px-8 py-4 bg-slate-950 text-white font-extrabold rounded-2xl text-sm uppercase tracking-wider hover:bg-slate-900 transition-colors shadow-2xl"
            >
              Get Free Instant Valuation
            </button>
          </div>
        </div>
      </section>

      <Footer />

      {/* Modals */}
      <HomeValuationModal isOpen={isValuationOpen} onClose={() => setIsValuationOpen(false)} />
      <ScheduleViewingModal
        property={selectedViewingProperty}
        isOpen={!!selectedViewingProperty}
        onClose={() => setSelectedViewingProperty(null)}
      />
    </div>
  );
}
